export interface Attempt {
  digest: string;
  state: "pending" | "sent" | "retryable" | "uncertain";
  created: number;
}

export type Reservation = "reserved" | "sent" | "pending" | "uncertain" | "conflict" | "limited";
const WINDOW = 15 * 60_000;
const RETENTION = 24 * 60 * 60_000;

/** Uses a single mailbox Durable Object; no message bodies or email addresses are saved. */
export class MailboxGuard {
  constructor(private storage: DurableObjectStorage) {}

  async reserve(id: string, digest: string, now = Date.now()): Promise<Reservation> {
    return this.storage.transaction(async (tx) => {
      const key = `attempt:${id}`;
      const previous = await tx.get<Attempt>(key);
      if (previous && previous.created > now - RETENTION) {
        if (previous.digest !== digest) return "conflict";
        if (previous.state !== "retryable") return previous.state;
      }
      const previousWindow = await tx.get<{ start: number; count: number }>("window");
      const window = previousWindow && now - previousWindow.start < WINDOW
        ? previousWindow : { start: now, count: 0 };
      if (window.count >= 30) return "limited";
      await tx.put("window", { start: window.start, count: window.count + 1 });
      await tx.put(key, { digest, state: "pending", created: now } satisfies Attempt);
      if (await tx.getAlarm() === null) await tx.setAlarm(now + 60 * 60_000);
      return "reserved";
    });
  }

  async finish(id: string, state: Attempt["state"]): Promise<void> {
    await this.storage.transaction(async (tx) => {
      const key = `attempt:${id}`;
      const attempt = await tx.get<Attempt>(key);
      if (attempt) await tx.put(key, { ...attempt, state });
    });
  }

  async cleanup(now = Date.now()): Promise<void> {
    const attempts = await this.storage.list<Attempt>({ prefix: "attempt:" });
    const expired = [...attempts].filter(([, value]) => value.created <= now - RETENTION);
    for (let i = 0; i < expired.length; i += 128) {
      await this.storage.delete(expired.slice(i, i + 128).map(([key]) => key));
    }
    if (attempts.size > expired.length) await this.storage.setAlarm(now + 60 * 60_000);
  }
}
