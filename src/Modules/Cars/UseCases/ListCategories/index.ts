import { CategoriesRepository } from "../../Repositories/Implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

// const repository = new CategoriesRepository();
const repository = null;

const listCategoriesController = new ListCategoriesController(
  new ListCategoriesUseCase(repository)
);

export { listCategoriesController };
