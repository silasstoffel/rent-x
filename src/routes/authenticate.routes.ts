import { Router } from "express";
import { AuthenticateUserController } from "../Modules/Accounts/UseCases/AuthenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const auth = new AuthenticateUserController();
authenticateRoutes.post("/", auth.handle);

export { authenticateRoutes };
