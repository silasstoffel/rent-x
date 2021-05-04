import { CategoriesRepositories } from "../../Repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {

  constructor(private repository: CategoriesRepositories) {
    this.repository = repository;
  }

  execute({ name, description }: IRequest) {
    const alreadyExists = this.repository.findByName(name);
    if (alreadyExists) {
      throw new Error("Category already exists.");
    }
    this.repository.create({ name, description });
  }
}
