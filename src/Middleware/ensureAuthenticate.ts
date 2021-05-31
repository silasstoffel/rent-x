import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../Erros/AppError";
import { UsersRepository } from "../Modules/Accounts/Repositories/Implementations/UsersRepository";

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
  const secret =
    "$argon2id$v=19$m=16,t=2,p=1$MVBVQ3pGWjBWcURnUzNKQg$aY/p2v/MkTikOJoIsP1dWQ";

  try {
    const { sub: userId } = verify(token, secret) as IPayload;
    const repository = new UsersRepository();
    const user = await repository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists.", 401);
    }
    next();
  } catch (error) {
    throw new AppError("Invalid token.", 401);
  }
}
