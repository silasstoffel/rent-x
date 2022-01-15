import { Router } from "express";

import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import {CreateRentalController} from "@modules/rentals/useCases/createRental/CreateRentalController";
import {DevolutionRentalController} from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import {ListRentalsByUserController} from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalsRoutes = Router();
const createRentals = new CreateRentalController();
const devolutionRental = new DevolutionRentalController();
const loadByUser = new ListRentalsByUserController();

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

rentalsRoutes.get(
    "/user",
    ensureAuthenticated,
    loadByUser.handle
);

export { rentalsRoutes };
