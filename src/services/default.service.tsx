import { AxiosResponse } from "axios";
import api from "../services/api";
import { Method } from "../util/util";

export async function defaultService(method: Method, path: string, obj: any = null): Promise<any>{

    let switchcase = {

        FINDALL (obj){ return _findAll(path) },
        CREATE  (obj){ return _create(path, obj) },
        UPDATE  (obj){ return _update(path, obj) },
        DELETE  (obj){ return _delete(path, obj) }
    };

    return switchcase[method](obj);
}

async function _findAll(path: string){
    const { data } = await api.get(`/${path}`);
    return data;
}

async function _create(path: string, create: any): Promise<any>{
    const { data } = await api.post(`/${path}`, create);
    return data;
}

async function _update(path: string, update: any): Promise<any>{
    const { data } = await api.put(`/${path}`, update);
    return data;
}

async function _delete(path: string, _id: any){
    return await api.delete(`/${path}/${_id}`);
}