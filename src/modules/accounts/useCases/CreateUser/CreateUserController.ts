import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateUserUseCase);
    const { name, password, email, driver_license } = req.body;
    try {
    await useCase.execute({
        name,
        password,
        email,
        driver_license,
    });
    } catch (error) {
    return res.status(400).send({
        error: error.message,
    });
    }
    return res.status(201).send();
  }
}
