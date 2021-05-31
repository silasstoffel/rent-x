import { inject, injectable } from "tsyringe";

import { Category } from "../../Entities/Category";
import { ICategoriesRepositories } from "../../Repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepositories
  ) {}

  async execute(): Promise<Category[]> {
    return await this.repository.getAll();
  }
}
