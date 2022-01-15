import { Router } from "express";
import multer from "multer";

import uploadConfig from '../../../../config/upload';
import { ensureAuthenticated } from "../middleware/ensureAuthenticate";
import { CreateUserController } from "../../../../modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/ProfileUserUseCase/ProfileUserContoller";

const usersRoutes = Router();
const create = new CreateUserController();
usersRoutes.post("/", create.handle);

const uploadAvatar = multer(uploadConfig);
const update = new UpdateUserAvatarController();
const profile = new ProfileUserController();

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single('avatar_file'),
    update.handle
);

usersRoutes.get(
    "/profile", ensureAuthenticated, profile.handle
);

export { usersRoutes };
