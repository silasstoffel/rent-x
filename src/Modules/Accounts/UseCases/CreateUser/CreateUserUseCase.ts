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
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    await this.repository.create({
      name,
      password,
      email,
      driver_license,
    });
  }
}
