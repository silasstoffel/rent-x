import { inject, injectable } from "tsyringe";

import { ICategoriesRepositories } from "../../Repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepositories
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const alreadyExists = await this.repository.findByName(name);
    if (alreadyExists) {
      throw new Error("Category already exists.");
    }
    this.repository.create({ name, description });
  }
}
