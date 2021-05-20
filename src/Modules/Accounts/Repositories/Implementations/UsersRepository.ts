import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "../../Dtos/ICreateUserDto";
import { User } from "../../Entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const entity = this.repository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
    await this.repository.save(entity);
  }
}

export {UsersRepository}
