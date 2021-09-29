import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  private static instance: SpecificationsRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
    name,
    description,
    });
    await this.repository.save(specification);
  }
}
