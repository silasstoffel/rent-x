import { User } from '../entities/User';

interface ICreateUserDto {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
