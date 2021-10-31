import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();
const createContoller = new CreateCarController();
const avaliableController = new ListAvailableCarsController();

carsRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createContoller.handle);
carsRoutes.get('/available', avaliableController.handle);

export { carsRoutes };
