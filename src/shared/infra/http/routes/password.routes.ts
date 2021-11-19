import {Router} from "express";

import {
    SendForgotPasswordMailController
} from "@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController";
import {ResetPasswordController} from "@modules/accounts/useCases/ResetPassword/ResetPasswordController";

const passwordRoutes = Router();

const forgotPassword = new SendForgotPasswordMailController();
const resetPassword = new ResetPasswordController();

passwordRoutes.post("/forgot", forgotPassword.handle);
passwordRoutes.post("/reset", resetPassword.handle);

export {passwordRoutes};
