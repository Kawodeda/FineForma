export interface IImagesClient {

    uploadImage(image: File): Promise<string>;

    downloadImage(storageId: string): Promise<Blob>;
}