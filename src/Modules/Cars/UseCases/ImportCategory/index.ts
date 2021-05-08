import { CategoriesRepository } from "../../Repositories/Implementations/CategoriesRepository";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { ImportCategoryController } from "./ImportCategoryController";

const importCategoryController = new ImportCategoryController(
  new ImportCategoryUseCase(CategoriesRepository.getInstance())
);

export { importCategoryController };
