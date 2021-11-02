import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import {
    CreateCarSpecificationController
} from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import {UploadCarImagesController} from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import uploadConfig from '@config/upload';

const upload = multer(
    uploadConfig.upload('./storage/cars')
);

const carsRoutes = Router();
const createController = new CreateCarController();
const availableController = new ListAvailableCarsController();
const createCarSpecifController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createController.handle);
carsRoutes.get('/available', availableController.handle);
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureIsAdmin, createCarSpecifController.handle);
carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureIsAdmin,
    upload.array('images'),
    uploadCarImagesController.handle
);

export { carsRoutes };
