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

export async function getuserinfo(data) {
    return request({
        url: 'api/users/get_info',
        method: 'post',
        data,
    })
}

export async function edituserinfo(data) {
    return request({
        url: 'api/users/update/info',
        method: 'post',
        data,
    })
}
export async function changepassword(data) {
    return request({
        url: 'api/users/change_password',
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