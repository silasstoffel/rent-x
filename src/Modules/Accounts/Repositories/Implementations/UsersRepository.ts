import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "../../Dtos/ICreateUserDto";
import { User } from "../../Entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const entity = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });
    await this.repository.save(entity);
  }
}

export { UsersRepository };
