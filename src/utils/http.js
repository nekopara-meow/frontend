import axios from 'axios';
import store from "@/store";
import router from "@/router";

const Service=axios.create({
        baseURL,
        timeout: 5000,
        headers: {
            'Content-Type':'application/json;charset=UTF'
        },
}).defaults.withCredentials = true
// add username and token into headers
Service.interceptors.request.use(
    config => {
        var username = localStorage.getItem('username');
        var authorization = localStorage.getItem('token');
        // 若 localStorage 中含有这两个字段，则添加入请求头
        if (username && authorization) {
            config.headers.authorization = authorization;
            config.headers.username = username;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
Service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status_code) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit('removeInfo')

                    // 只有在当前路由不是登录页面才跳转
                    router.currentRoute.path !== 'login' &&
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.path },
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    },
)
export const post=config=>{
    return Service({
        ...config,
        method: "post",
        data:config.data
    })
}
export const get=config=>{
    return Service({
        ...config,
        method: "get",
        params:config.data
    })
}
export default Service