import { Router, Request, Response } from "express";
import { createSpecificationController } from "../Modules/Cars/UseCases/CreateSpecification";

const speficationsRoutes = Router();

speficationsRoutes.post("/", (req: Request, res: Response) => {
  return createSpecificationController.handle(req, res);
});

export { speficationsRoutes };
