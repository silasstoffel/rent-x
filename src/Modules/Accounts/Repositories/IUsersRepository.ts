import { User } from '../Entities/User';

interface ICreateUserDto {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
