import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../erros/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private repository: ICategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const alreadyExists = await this.repository.findByName(name);
        if (alreadyExists) {
            throw new AppError("Category already exists.");
        }
        this.repository.create({ name, description });
    }
}
