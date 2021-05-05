import { Request, Response } from "express";
import { Category } from '../../Entities/Category';
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  constructor(private useCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Category[] {
    const categories = this.useCase.execute();
    return res.json(categories);
  }
}
