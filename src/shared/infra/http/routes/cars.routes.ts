import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import {
    CreateCarSpecificationController
} from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();
const createController = new CreateCarController();
const availableController = new ListAvailableCarsController();
const createCarSpecifController = new CreateCarSpecificationController();

carsRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createController.handle);
carsRoutes.get('/available', availableController.handle);
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureIsAdmin, createCarSpecifController.handle);

export { carsRoutes };
