import { Router } from "express";
import { ensureAuthenticated } from '../Middleware/ensureAuthenticate';
import { CreateSpecificationController } from "../Modules/Cars/UseCases/CreateSpecification/CreateSpecificationController";

const speficationsRoutes = Router();
speficationsRoutes.use(ensureAuthenticated);

const createController = new CreateSpecificationController();

speficationsRoutes.post("/", createController.handle);

export { speficationsRoutes };
