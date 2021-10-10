import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import "@shared/infra/typeorm";
import "../../container";
import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

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

app.listen(3333, () => console.log("Server is running :D"));