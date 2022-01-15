import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import Auth from "@config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing.", 401);
    }

    const [, token] = authHeader.split(" ");
    const secret = Auth.token_secret;

    try {
        const { sub: userId } = verify(token, secret) as IPayload;
        req.user = { id: userId };

        return next();
    } catch (error) {
        throw new AppError("Invalid token.", 401);
    }
}
