import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDto } from "../../Dtos/ICreateUserDto";
import { IUsersRepository } from "../../Repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const passwordHash = await hash(password, 8);

    await this.repository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}
