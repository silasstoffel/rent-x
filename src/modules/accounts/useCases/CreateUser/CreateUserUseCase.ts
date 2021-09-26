import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
    const already = await this.repository.findByEmail(email);

    if (already) {
    throw new Error("User already exists.");
    }

    const passwordHash = await hash(password, 8);

    await this.repository.create({
    name,
    password: passwordHash,
    email,
    driver_license,
    });
  }
}
