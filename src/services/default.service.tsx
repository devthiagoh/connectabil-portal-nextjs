import { AxiosResponse } from "axios";
import api from "../services/api";
import { Method } from "../util/util";

export async function defaultService(method: Method, path: string, obj: any = null): Promise<any>{

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