import { Router, Request, Response } from "express";
import { CategoriesRepositories } from "../Repositories/CategoriesRepository";
import { CreateCategoryService } from "../Services/Categories/CreateCategoryService";
import { ListAllCategoryService } from '../Services/Categories/ListAllCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepositories();
const createCategoryService = new CreateCategoryService(categoriesRepository);
const loadAllCategories = new ListAllCategoryService(categoriesRepository);

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    createCategoryService.execute({ name, description });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(201).send();
});

categoriesRoutes.get("/", (req: Request, res: Response) => {
  const categories = loadAllCategories.execute();
  return res.json(categories);
});

export { categoriesRoutes };
