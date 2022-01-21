import createConnection from "@shared/infra/typeorm";
createConnection();

import express, { NextFunction, Request, Response } from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import swaggerFile from "../../../swagger.json";
import "../../container";
import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";
import rateLimiter from "@shared/infra/http/middleware/rateLimiter";

const app = express();

app.use(rateLimiter);
/*
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
*/

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
//app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
//app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

//app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: `Internal server error - ${err.message}`,
        status: "error",
    });
});

export { app };
