import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/UseCases/AuthenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const auth = new AuthenticateUserController();
authenticateRoutes.post("/", auth.handle);

export { authenticateRoutes };
