import * as Dto from './Dto';

export interface IDesignsClient {

    listDesigns(): Promise<Dto.DesignInfo[]>;

    loadDesign(name: string): Promise<Dto.Design>;

    saveDesign(design: Dto.Design, name: string): Promise<void>;

    deleteDesign(name: string): Promise<void>;
}