import express, { type Express, type ErrorRequestHandler } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.disable("x-powered-by");
app.use(express.json({ limit: "32kb", inflate: false }));
app.use(express.urlencoded({ extended: false, limit: "32kb", inflate: false }));

app.use("/api", router);

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const status = typeof error?.status === "number" ? error.status : 500;
  const safeStatus = [400, 413, 415].includes(status) ? status : 500;
  req.log.error({ statusCode: safeStatus }, "API request failed");
  res.status(safeStatus).json({
    error: safeStatus === 413 ? "The request is too large."
      : safeStatus === 415 ? "Compressed requests are not supported."
      : safeStatus === 400 ? "Please send a valid request."
      : "An unexpected error occurred. Please try again later.",
  });
};
app.use(errorHandler);

export default app;
