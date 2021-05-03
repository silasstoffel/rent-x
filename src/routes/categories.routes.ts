import { Router, Request, Response } from "express";
import { CategoriesRepositories } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepositories();

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;
  
  const alreadyExists = categoriesRepository.findByName(name);
  if (alreadyExists) {
   return res.status(400).json({
      message: 'Category already exists.'
   });
  }

  categoriesRepository.create({ name, description });
  return res.status(201).json();
});

categoriesRoutes.get("/", (req: Request, res: Response) => {
  const categories = categoriesRepository.getAll();
  return res.json(categories);
});

export { categoriesRoutes };
