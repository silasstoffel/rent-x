import { container, inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("E-mail or password invalid.");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new Error("E-mail or password invalid.");
    }

    // Token.Silas.Curso.Ignite <https://argon2.online/>
    const secret =
      "$argon2id$v=19$m=16,t=2,p=1$MVBVQ3pGWjBWcURnUzNKQg$aY/p2v/MkTikOJoIsP1dWQ";
    const config = {
      subject: user.id,
      expiresIn: "1d",
    };

    const payload = {
      email: user.email,
      name: user.email,
    };

    const token = sign(payload, secret, config);
    const authResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    
    return authResponse;
  }
}
