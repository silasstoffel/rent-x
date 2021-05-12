import { ICategoriesRepositories } from "../../Repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private repository: ICategoriesRepositories) {
    this.repository = repository;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const alreadyExists = await this.repository.findByName(name);
    if (alreadyExists) {
      throw new Error("Category already exists.");
    }
    this.repository.create({ name, description });
  }
}
