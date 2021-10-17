import { Router, Request, Response } from "express";
import multer from "multer";

import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const create = new CreateCategoryController();
categoriesRoutes.post("/", ensureAuthenticated, ensureIsAdmin, create.handle);

categoriesRoutes.get("/", new ListCategoriesController().handle);

const ImportCategory = new ImportCategoryController();
categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ensureAuthenticated,
    ensureIsAdmin,
    ImportCategory.handle
);

export { categoriesRoutes };
