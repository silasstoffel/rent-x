import {ListAvailableCarsUseCase} from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsUseCase";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";

describe('List Car: Use Case', () => {

    let useCase: ListAvailableCarsUseCase;
    let repository: CarsRepositoryInMemory;

    beforeEach(() => {
        repository = new CarsRepositoryInMemory();
        useCase = new ListAvailableCarsUseCase(repository);
    });

    it('Should be able to list all available cars', async () => {
        const data: ICreateCarDTO = {
            name: 'Car 1',
            category_id: '123456',
            daily_rate: 120.99,
            description: 'Description test',
            fine_amount: 0,
            license_plate: 'XXX-111',
            brand: 'Brand'
        }
        const car = await repository.create(data);
        const cars = await useCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by name', async () => {
        const name = 'Car 1';
        let data: ICreateCarDTO = {
            name,
            category_id: '123456',
            daily_rate: 120.99,
            description: 'Description test',
            fine_amount: 0,
            license_plate: 'XXX-111',
            brand: 'Brand'
        }
        const car = await repository.create(data);
        const cars = await useCase.execute({name});

        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by brand', async () => {
        const name = 'Car 2';
        const brand = 'Brand-2';
        let data: ICreateCarDTO = {
            name,
            category_id: '123456',
            daily_rate: 120.99,
            description: 'Description test',
            fine_amount: 0,
            license_plate: 'XXX-111',
            brand
        }
        const car = await repository.create(data);
        const cars = await useCase.execute({brand});

        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by category', async () => {
        const name = 'Car 2';
        const brand = 'Brand-2';
        const category_id = '102030';
        let data: ICreateCarDTO = {
            name,
            category_id,
            daily_rate: 120.99,
            description: 'Description test',
            fine_amount: 0,
            license_plate: 'XXX-111',
            brand
        }
        const car = await repository.create(data);
        const cars = await useCase.execute({category_id});

        expect(cars).toEqual([car]);
    });

});
