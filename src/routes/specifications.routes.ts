import { Router, Request, Response } from "express";
import { SpecificationsRepository } from '../Modules/Cars/Repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../Modules/Cars/Services/Specifications/CreateSpecificationService';

const speficationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();
const createCategoryService = new CreateSpecificationService(specificationsRepository);

speficationsRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    createCategoryService.execute({ name, description });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(201).send();
});


export { speficationsRoutes };