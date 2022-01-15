import { S3 } from "aws-sdk";
import { resolve } from "path";
import fs from "fs";
import mime from 'mime';

import {IStorageProvider} from "@shared/container/providers/storage/IStorageProvider";
import uploadConfig from "@config/upload";

export class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_DEFAULT_REGION
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(uploadConfig.tmpFolder, file);
        const fileContent = await fs.promises.readFile(originalName);

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: mime.getType(originalName)
        }).promise();

        await fs.promises.unlink(originalName);

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }
}
