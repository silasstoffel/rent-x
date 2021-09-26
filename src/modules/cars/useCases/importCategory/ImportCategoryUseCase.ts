import fs from "fs";
import csvParse from "csv-parse";
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";


interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (item: IImportCategory) => {
    const { name, description } = item;
    const exists = await this.categoriesRepository.findByName(name);
    if (!exists) {
        await this.categoriesRepository.create({ name, description });
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
        fs.promises.unlink(file.path);
        resolve(categories);
        })
        .on("error", (err) => {
        stream.close();
        fs.promises.unlink(file.path);
        reject(err);
        });
    });
  }
}
