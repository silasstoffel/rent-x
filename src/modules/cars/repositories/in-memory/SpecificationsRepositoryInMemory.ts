import {ISpecificationDTO, ISpecificationsRepository} from "@modules/cars/repositories/ISpecificationsRepository";
import {Specification} from "@modules/cars/infra/typeorm/entities/Specification";

export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    async create({name, description}: ISpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {name, description});
        this.specifications.push(specification);
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(
            spec => ids.includes(spec.id)
        );
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(item => item.name === name);
    }
}
