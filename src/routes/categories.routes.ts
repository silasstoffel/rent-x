import { Router, Request, Response } from "express";
import multer from "multer";

import { listCategoriesController } from "../Modules/Cars/UseCases/ListCategories";
import { importCategoryController } from "../Modules/Cars/UseCases/ImportCategory/index";
import { CreateCategoryController } from "../Modules/Cars/UseCases/CreateCategory/CreateCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const create = new CreateCategoryController();
categoriesRoutes.post("/", create.handle);

categoriesRoutes.get("/", (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  (req: Request, res: Response) => {
    return importCategoryController.handle(req, res);
  }
);

export { categoriesRoutes };
