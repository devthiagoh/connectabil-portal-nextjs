import { Method } from "../util/util";
import { defaultService } from "../services/default.service";

export async function service(method: Method, obj: any = null): Promise<any>{

    const path = 'jobs';

    switch (method) {
        case Method.FINDALL:
            return _findAll(path);
        case Method.CREATE:
            return _create(path, obj);
        case Method.UPDATE:
            return _update(path, obj);
        case Method.DELETE:
            return _delete(path, obj);
        default:
            break;
    }
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