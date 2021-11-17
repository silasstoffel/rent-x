import { Router } from "express";
import {
    SendForgotPasswordMailController
} from "@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const forgotPasswordController = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", forgotPasswordController.handle);

export { passwordRoutes };
