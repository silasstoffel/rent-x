import { inject, injectable } from "tsyringe";

import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    return await this.repository.getAll();
  }
}
