import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListCategoriesUseCase);
    const categories = await useCase.execute();
    return res.json(categories);
  }
}
