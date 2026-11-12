import { test } from "node:test";
import assert from "node:assert/strict";
import { MailboxGuard, type Attempt } from "./guard";

/** Serial transactional storage double. No network, credentials or customer details. */
function storageFixture() {
  const values = new Map<string, unknown>();
  let alarm: number | null = null;
  let queue = Promise.resolve();
  const storage = {
    async get<T>(key: string) { return structuredClone(values.get(key)) as T | undefined; },
    async put(key: string, value: unknown) { values.set(key, structuredClone(value)); },
    async delete(keys: string[]) { keys.forEach((key) => values.delete(key)); },
    async list<T>({ prefix }: { prefix: string }) {
      return new Map([...values].filter(([key]) => key.startsWith(prefix))) as Map<string, T>;
    },
    async getAlarm() { return alarm; },
    async setAlarm(value: number) { alarm = value; },
    async transaction<T>(callback: (tx: typeof storage) => Promise<T>): Promise<T> {
      const result = queue.then(() => callback(storage));
      queue = result.then(() => {}, () => {});
      return result;
    },
  };
  return { storage: storage as unknown as DurableObjectStorage, values };
}

test("concurrent duplicate reservations permit only one send attempt", async () => {
  const { storage } = storageFixture();
  const guard = new MailboxGuard(storage);
  const outcomes = await Promise.all(Array.from({ length: 10 }, () => guard.reserve("same", "hash", 1_000_000)));
  assert.equal(outcomes.filter((value) => value === "reserved").length, 1);
  assert.equal(outcomes.filter((value) => value === "pending").length, 9);
  await guard.finish("same", "sent");
  assert.equal(await guard.reserve("same", "hash", 1_000_001), "sent");
  assert.equal(await guard.reserve("same", "different", 1_000_001), "conflict");
});

test("the distributed mailbox cap survives new guard instances and resets after 15 minutes", async () => {
  const { storage } = storageFixture();
  const now = 1_000_000;
  for (let i = 0; i < 30; i++) {
    assert.equal(await new MailboxGuard(storage).reserve(`id-${i}`, "hash", now), "reserved");
  }
  assert.equal(await new MailboxGuard(storage).reserve("over-limit", "hash", now), "limited");
  assert.equal(await new MailboxGuard(storage).reserve("next-window", "hash", now + 900_001), "reserved");
});

test("only confirmed pre-send failures can be retried with the same identifier", async () => {
  const { storage } = storageFixture();
  const guard = new MailboxGuard(storage);
  await guard.reserve("safe", "hash", 1_000_000);
  await guard.finish("safe", "retryable");
  assert.equal(await guard.reserve("safe", "hash", 1_000_001), "reserved");
  await guard.finish("safe", "uncertain");
  assert.equal(await guard.reserve("safe", "hash", 1_000_002), "uncertain");
});

test("alarms prune old submission metadata without removing current attempts", async () => {
  const { storage, values } = storageFixture();
  const guard = new MailboxGuard(storage);
  const now = Date.now();
  values.set("attempt:old", { digest: "hash", created: now - 86_400_001, state: "sent" } satisfies Attempt);
  values.set("attempt:new", { digest: "hash", created: now, state: "pending" } satisfies Attempt);
  await guard.cleanup(now);
  assert.ok(!values.has("attempt:old"));
  assert.ok(values.has("attempt:new"));
});
