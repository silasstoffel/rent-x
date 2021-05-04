import { Category } from '../../Entities/Category';
import { CategoriesRepositories } from "../../Repositories/CategoriesRepository";

export class ListAllCategoryService {

  constructor(private repository: CategoriesRepositories) {
    this.repository = repository;
  }
  
  execute(): Category[] {
    return this.repository.getAll();
  }
}
