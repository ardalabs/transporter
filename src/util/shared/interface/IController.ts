import { ILooseObject } from './ILooseObject';
export interface IWorker {
    getAllList(parameters:ILooseObject):Promise<any>;
    create(parameter:ILooseObject):Promise<any>;
    update(id:string,parameter:ILooseObject):Promise<any>;
    softDelete(id:string):Promise<any>;
    hardDelete(id:string):Promise<any>;
}