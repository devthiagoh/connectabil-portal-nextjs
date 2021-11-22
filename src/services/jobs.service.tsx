import { Method } from "../util/util";
import { defaultService } from "../services/default.service";

export async function service(method: Method, obj: any = null): Promise<any>{

    const path = 'jobs';

    let switchcase = {

        FINDALL (obj){ return _findAll(path) },
        CREATE  (obj){ return _create(path, obj) },
        UPDATE  (obj){ return _update(path, obj) },
        DELETE  (obj){ return _delete(path, obj) }
    };

    return switchcase[method](obj);
}

async function _findAll(path: string){
    return await defaultService(Method.FINDALL, path, null);
}

async function _create(path: string, create: any): Promise<any>{
    const created = await defaultService(Method.CREATE, path, create);
    return created;
}

async function _update(path: string, update: any): Promise<any>{
    const updated = await defaultService(Method.UPDATE, path, update);
    return updated;
}

async function _delete(path: string, _id: any){
    return await defaultService(Method.DELETE, path, _id);
}