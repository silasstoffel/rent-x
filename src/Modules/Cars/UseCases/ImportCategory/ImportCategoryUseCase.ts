import fs from "fs";
import csvParse from "csv-parse";

import { CategoriesRepository } from "../../Repositories/Implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (item: IImportCategory) => {
      const { name, description } = item;
      const exists = this.categoriesRepository.findByName(name);
      if (!exists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const parseFile = csvParse();
      const stream = fs.createReadStream(file.path);
      stream.pipe(parseFile);

      const categories: IImportCategory[] = [];

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          stream.close();
          resolve(categories);
        })
        .on("error", (err) => {
          stream.close();
          reject(err);
        });
    });
  }
}