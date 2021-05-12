import { CategoriesRepository } from "../../Repositories/Implementations/CategoriesRepository";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { ImportCategoryController } from "./ImportCategoryController";

const repository = null;
const importCategoryController = new ImportCategoryController(
  new ImportCategoryUseCase(repository)
);

export { importCategoryController };
