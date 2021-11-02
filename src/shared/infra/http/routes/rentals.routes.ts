import { Router } from "express";

import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import {CreateRentalController} from "@modules/rentals/useCases/createRental/CreateRentalController";

const rentalsRoutes = Router();
const createRentals = new CreateRentalController();

rentalsRoutes.post(
    "/",
    ensureAuthenticated,
    createRentals.handle
);

export { rentalsRoutes };
