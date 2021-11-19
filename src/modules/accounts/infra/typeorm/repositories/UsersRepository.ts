import {getRepository, Repository} from "typeorm";
import {ICreateUserDto} from "@modules/accounts/dtos/ICreateUserDto";
import {User} from "../entities/User";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne({id});
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email});
    }

    async create({
                     id,
                     name,
                     password,
                     email,
                     driver_license,
                     avatar,
                 }: ICreateUserDto): Promise<void> {
        const entity = this.repository.create({
            name,
            email,
            password,
            driver_license,
            avatar,
            id,
        });
        await this.repository.save(entity);
    }
}
