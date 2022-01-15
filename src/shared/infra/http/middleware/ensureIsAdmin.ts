import {AppError} from "@shared/errors/AppError";
import {NextFunction, Request, Response} from "express";
import {UsersRepository} from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function ensureIsAdmin(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const {id} = request.user;
    const repository = new UsersRepository();
    const user = await repository.findById(id);

    if (!user || (user && !user.is_admin)) {
        throw new AppError("User is not an admin!");
    }
    return next();
}
