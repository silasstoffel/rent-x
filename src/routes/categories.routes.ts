import { Router, Request, Response } from "express";
import { createCategoryController } from "../Modules/Cars/UseCases/CreateCategory";
import { listCategoriesController } from '../Modules/Cars/UseCases/ListCategories';

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
