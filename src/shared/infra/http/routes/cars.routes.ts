import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";

const carsRoutes = Router();
const createContoller = new CreateCarController();

carsRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createContoller.handle);

export { carsRoutes };
