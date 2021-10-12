import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"

const carsRoutes = Router();
const createContoller = new CreateCarController();

carsRoutes.post('/', createContoller.handle);

export { carsRoutes };
