import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

describe("CreateCarUseCase", () => {
    let useCase: CreateCarUseCase;
    let repository: CarsRepositoryInMemory;

    beforeEach(() => {
        repository = new CarsRepositoryInMemory();
        useCase = new CreateCarUseCase(repository);
    });

    it("Should be able to create a car", async () => {
        const car = await useCase.execute({
            name: "Argo Drive",
            description: "Motor 1.3 - Manual",
            daily_rate: 85.9,
            brand: "Fiat",
            category_id: "",
            license_plate: "PPW-9999",
            fine_amount: 60,
        });

        expect(car).toHaveProperty("name", "Argo Drive");
    });

    it("Should not be able to create a car with exists license plate", async () => {
        const car = {
            name: "Argo Drive",
            description: "Motor 1.3 - Manual",
            daily_rate: 85.9,
            brand: "Fiat",
            category_id: "",
            license_plate: "PPW-9999",
            fine_amount: 60,
        };
        await useCase.execute(car);
        expect(async () => {
            await useCase.execute(car);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a car with avaliable true by default", async () => {
        const data = {
            name: "Argo Drive",
            description: "Motor 1.3 - Manual",
            daily_rate: 85.9,
            brand: "Fiat",
            category_id: "",
            license_plate: "PPW-9999",
            fine_amount: 60,
        };
        const car = await useCase.execute(data);
        expect(car.avaliable).toBeTruthy();
    });
});
