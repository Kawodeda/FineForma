import { Design } from '../../Design';

export interface IDesignCommand {

    execute(design: Design): Promise<Design>;
}