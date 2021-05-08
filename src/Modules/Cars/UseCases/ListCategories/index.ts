import { CategoriesRepository } from "../../Repositories/Implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const repository = CategoriesRepository.getInstance();

const listCategoriesController = new ListCategoriesController(
  new ListCategoriesUseCase(repository)
);

export { listCategoriesController };