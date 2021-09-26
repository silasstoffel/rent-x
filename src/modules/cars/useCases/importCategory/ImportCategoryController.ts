import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {

  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ImportCategoryUseCase);
    await useCase.execute(req.file);
    return res.send();
  }
}
