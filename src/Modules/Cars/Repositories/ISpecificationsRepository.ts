import { Specification } from '../Entities/Specification';

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): void;
  findByName(name: string): Specification | null;
}

export { ISpecificationDTO, ISpecificationsRepository };
