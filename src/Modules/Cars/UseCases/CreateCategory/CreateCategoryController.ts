import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor(private useCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response) {
    const { name, description } = req.body;
    try {
      this.useCase.execute({ name, description });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(201).send();
  }
}
