import { Router, Request, Response } from "express";
import multer from "multer";

import { ListCategoriesController } from "../Modules/Cars/UseCases/ListCategories/ListCategoriesController";
import { ImportCategoryController } from "../Modules/Cars/UseCases/ImportCategory/ImportCategoryController";
import { CreateCategoryController } from "../Modules/Cars/UseCases/CreateCategory/CreateCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const create = new CreateCategoryController();
categoriesRoutes.post("/", create.handle);

categoriesRoutes.get("/", new ListCategoriesController().handle);

const ImportCategory = new ImportCategoryController();
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ImportCategory.handle
);

export { categoriesRoutes };
