import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const useCase = container.resolve(AuthenticateUserUseCase);

    try {
    const authInfo = await useCase.execute({ email, password });
    return res.status(200).json(authInfo);
    } catch (error) {
    return res.status(400).json({
        error: error.message,
    });
    }
  }
}
