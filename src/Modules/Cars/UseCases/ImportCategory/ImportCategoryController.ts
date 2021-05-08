import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  constructor(private useCase: ImportCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    this.useCase.execute(req.file);
    return res.send();
  }
}
