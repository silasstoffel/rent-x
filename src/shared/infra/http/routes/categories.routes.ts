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

categoriesRoutes.get("/", new ListCategoriesController().handle);

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.use(ensureIsAdmin);

const create = new CreateCategoryController();
categoriesRoutes.post("/", create.handle);

const ImportCategory = new ImportCategoryController();
categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ImportCategory.handle
);

export { categoriesRoutes };
