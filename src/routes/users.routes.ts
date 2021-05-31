import { Router } from "express";
import { CreateUserController } from "../Modules/Accounts/UseCases/CreateUser/CreateUserController";

const usersRoutes = Router();
const create = new CreateUserController();
usersRoutes.post("/", create.handle);

export { usersRoutes };
