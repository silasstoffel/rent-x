import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import {RefreshTokenController} from "@modules/accounts/useCases/RefreshToken/RefreshTokenController";

const authenticateRoutes = Router();
const auth = new AuthenticateUserController();
const refreshToken = new RefreshTokenController();

authenticateRoutes.post("/", auth.handle);
authenticateRoutes.post("/refresh-token", refreshToken.handle);

export { authenticateRoutes };
