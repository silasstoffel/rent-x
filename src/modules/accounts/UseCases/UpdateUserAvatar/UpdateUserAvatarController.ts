
import { Response, Request} from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
        const avatar = req.file.filename;

        const useCase = container.resolve(UpdateUserAvatarUseCase);
        useCase.execute({
            user_id: id,
            avatar_file: avatar
        });

        return res.status(204).send();

    }
}