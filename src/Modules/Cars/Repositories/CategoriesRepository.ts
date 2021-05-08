import { Category } from "../Entities/Category";
import { categoriesRepository } from '../UseCases/CreateCategory';
import {
  ICategoriesRepositories,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepositories {
  private categories: Category[];
  private static instance: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance() {
    if (!CategoriesRepository.instance) {
      CategoriesRepository.instance = new CategoriesRepository();
    }
    return CategoriesRepository.instance;    
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });
    this.categories.push(category);
  }

  getAll(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category | null {
    const category = this.categories.find((category) => category.name === name);
    return category ? category : null;
  }
}
