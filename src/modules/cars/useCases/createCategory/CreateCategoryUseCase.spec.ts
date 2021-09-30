import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create Category", () => {
    let categoryRepositoryInMemory: CategoriesRepositoryInMemory;
    let useCase: CreateCategoryUseCase;

    beforeEach(() => {
        categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
        useCase = new CreateCategoryUseCase(categoryRepositoryInMemory);
    });

    it("Should be able to create a category", async () => {
        const name = "Category name test";
        await useCase.execute({
            name,
            description: "Category Description Test",
        });
        const category = await categoryRepositoryInMemory.findByName(name);
        expect(category).toHaveProperty("id");
        expect(category.name).toBe(name);
    });

    it("Should not be able to create a category if name already exists", async () => {
        const create = async () => {
            const data = {
                name: "Category name test",
                description: "Category Description Test",
            };
            await useCase.execute(data);
            await useCase.execute(data);
        };
        expect(create()).rejects.toBeInstanceOf(AppError);
    });
});
