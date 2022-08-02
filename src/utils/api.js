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