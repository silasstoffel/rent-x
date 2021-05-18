import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../Repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private repository: ISpecificationsRepository) {
    this.repository = repository;
  }
  async execute({ name, description }: IRequest): Promise<void>{
    const alreadyExists = await this.repository.findByName(name);
    if (alreadyExists) {
      throw new Error("Specifications already exists.");
    }
    await this.repository.create({ name, description });
  }
}
