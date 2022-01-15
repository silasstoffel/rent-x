import {getRepository, Repository} from "typeorm";
import {Specification} from "../entities/Specification";
import {
    ISpecificationDTO,
    ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification> {
        return await this.repository.findOne({name});
    }

    async create({name, description}: ISpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });
        await this.repository.save(specification);
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.repository.findByIds(ids);
    }
}
