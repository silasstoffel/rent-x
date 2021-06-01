import { Router } from "express";
import multer from "multer";

import uploadConfig from '../Config/upload';
import { ensureAuthenticated } from "../Middleware/ensureAuthenticate";
import { CreateUserController } from "../Modules/Accounts/UseCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "../Modules/Accounts/UseCases/UpdateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();
const create = new CreateUserController();
usersRoutes.post("/", create.handle);

const uploadAvatar = multer(
    uploadConfig.upload('./storage/avatar')
);
const update = new UpdateUserAvatarController();
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single('avatar_file'),
    update.handle
);

export { usersRoutes };
