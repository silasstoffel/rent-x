import {IStorageProvider} from "@shared/container/providers/storage/IStorageProvider";

export class S3Provider implements IStorageProvider{
    delete(filename: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    save(filename: string): Promise<string> {
        return Promise.resolve("");
    }

}
