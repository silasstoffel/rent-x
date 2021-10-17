import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const speficationsRoutes = Router();

const createController = new CreateSpecificationController();

speficationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureIsAdmin,
    createController.handle
);

export { speficationsRoutes };
