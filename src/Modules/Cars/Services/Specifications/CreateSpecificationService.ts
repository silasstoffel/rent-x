import { ISpecificationsRepository } from '../../Repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private repository: ISpecificationsRepository) {
    this.repository = repository;
  }
  execute({ name, description }: IRequest) {
    const alreadyExists = this.repository.findByName(name);
    if (alreadyExists) {
      throw new Error("Specifications already exists.");
    }
    this.repository.create({ name, description });
  }
}