import {Request, Response} from 'express';
import {container} from "tsyringe";
import {UploadCarImagesUseCase} from "@modules/cars/useCases/uploadCarImage/UploadCarImagesUseCase";

interface IFile {
    filename: string;
}

export class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const images = request.files as IFile[];

        const filenames = images.map((img: IFile) => img.filename);

        const useCase = container.resolve(UploadCarImagesUseCase);
        await useCase.execute({
            car_id: id,
            images_name: filenames
        });
        return response.status(201).send();
    }
}
