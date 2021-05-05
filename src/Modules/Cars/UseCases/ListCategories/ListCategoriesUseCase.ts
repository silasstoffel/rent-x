import { Category } from '../../Entities/Category';
import { ICategoriesRepositories } from "../../Repositories/ICategoriesRepository";

export class ListCategoriesUseCase {

   constructor(private repository: ICategoriesRepositories) {
      this.repository = repository;
    }
  
    execute(): Category[] {
      return this.repository.getAll();
    }
}