import * as redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const redisHost = process.env.REDIS_HOST;
const redisPort = Number(process.env.REDIS_PORT);

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        sessionTimeout: 20,
    },
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 6, // 10 requests
    duration: 1, // per 1 second by IP
});

export default async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        redisClient.connect();
        await limiter.consume(request.ip);
        return next();
    } catch (err) {
        throw new AppError("Too many request", 429);
    } finally {
        await redisClient.disconnect();
    }
}
