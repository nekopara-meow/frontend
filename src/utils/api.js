import request from '@/utils/http'

export async function login(data) {
    return request({
        url: 'api/users/login',
        method: 'post',
        data,
    })
}

export async function register(data) {
    return request({
        url: 'api/users/register',
        method: 'post',
        data,
    })
}

export function save_uml(data){
    return request({
        url: 'api/team/uml/save',
        method: 'post',
        data,
    })
}

export function load_uml(data){
    return request({
        url: 'api/team/uml/load',
        method: 'post',
        data,
    })
}

export function save_doc(data){
    return request({
        url: 'api/team/doc/save',
        method: 'post',
        data,
    })
}

export function load_doc(data){
    return request({
        url: 'api/team/doc/load',
        method: 'post',
        data,
    })
}
/*export const loginApi=data=>{
    return post({
        url: "api/users/login",
        data
    })
}

export const registerApi=data=>{
    return post({
        url:"api/users/register",
        data
    })
}*/