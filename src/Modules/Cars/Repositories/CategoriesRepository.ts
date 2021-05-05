import { Category } from "../Entities/Category";
import {
  ICategoriesRepositories,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepositories {
  private categories: Category[];

  constructor() {
    this.categories = [];
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
