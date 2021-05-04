import { Specification } from "../Entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from "./ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  findByName(name: string): Specification {
   const result = this.specifications.find((item) => item.name === name);
   return result ? result : null;
  }

  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, { name, description, created_at: new Date() });
    this.specifications.push(specification);
  }
}
