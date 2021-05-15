import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
  public handle(req: Request, res: Response): Response {
    const useCase = container.resolve(CreateSpecificationUseCase);

    const { name, description } = req.body;
    try {
      useCase.execute({ name, description });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(201).send();
  }
}
