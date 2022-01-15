import {inject, injectable} from 'tsyringe';
import {IUsersRepository} from '../../repositories/IUsersRepository';
import {IStorageProvider} from "@shared/container/providers/storage/IStorageProvider";

interface IRequest {
    user_id: string,
    avatar_file: string
};

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository,

        @inject("StorageProvider")
        private storage: IStorageProvider
    ) {
    }

    async execute({user_id, avatar_file}: IRequest): Promise<void> {
        const user = await this.repository.findById(user_id);
        if (user.avatar) {
            await this.storage.delete(user.avatar, "avatar");
        }
        await this.storage.save(avatar_file, "avatar");
        user.avatar = avatar_file;
        await this.repository.create(user);
    }
}
