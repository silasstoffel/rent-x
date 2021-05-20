import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateUserUseCase);
    const { name, username, password, email, driver_license } = req.body;
    await useCase.execute({
      name,
      username,
      password,
      email,
      driver_license,
    });
    return res.status(201).send();
  }
}
