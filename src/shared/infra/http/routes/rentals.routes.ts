import { Router } from "express";

import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import {CreateRentalController} from "@modules/rentals/useCases/createRental/CreateRentalController";
import {DevolutionRentalController} from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalsRoutes = Router();
const createRentals = new CreateRentalController();
const devolutionRental = new DevolutionRentalController();

rentalsRoutes.post(
    "/",
    ensureAuthenticated,
    createRentals.handle
);

rentalsRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRental.handle
);

export { rentalsRoutes };
