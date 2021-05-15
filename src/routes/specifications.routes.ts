import { Router, Request, Response } from "express";
import { CreateSpecificationController } from "../Modules/Cars/UseCases/CreateSpecification/CreateSpecificationController";

const speficationsRoutes = Router();

const createController = new CreateSpecificationController();

speficationsRoutes.post("/", createController.handle);

export { speficationsRoutes };
