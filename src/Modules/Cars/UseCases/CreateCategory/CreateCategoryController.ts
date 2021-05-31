import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const useCase = container.resolve(CreateCategoryUseCase);
    try {
      await useCase.execute({ name, description });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(201).send();
  }
}
