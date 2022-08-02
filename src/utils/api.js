import {post,get} from "@/utils/http"
export const loginApi=data=>{
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
}