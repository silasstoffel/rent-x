import { Router, Request, Response } from "express";
import multer from "multer";

import createCategoryController from "../Modules/Cars/UseCases/CreateCategory";
import { listCategoriesController } from "../Modules/Cars/UseCases/ListCategories";
import { importCategoryController } from "../Modules/Cars/UseCases/ImportCategory/index";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req: Request, res: Response) => {
  return createCategoryController().handle(req, res);
});

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
