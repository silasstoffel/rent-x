import { inject, injectable } from "tsyringe";
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
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    await this.repository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });
  }
}
