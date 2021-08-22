import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../Repositories/IUsersRepository';
import { deleteFile } from '../../../../Util/File';

interface IRequest {
    user_id: string,
    avatar_file: string
};

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.repository.findById(user_id);
        if (user.avatar) {
            await deleteFile(`./storage/avatar/${user.avatar}`);
        }
        user.avatar = avatar_file;
        await this.repository.create(user);
    }
}