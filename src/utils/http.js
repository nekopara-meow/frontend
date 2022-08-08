// add username and token into headers
import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
const instance=axios.create({
    baseURL:'http://43.138.50.211:8000/',

    // baseURL:'http://43.138.45.223:8000/',
    timeout: 5000,
    headers: {
        'Content-Type':'application/json;charset=UTF'
    },
})
instance.defaults.withCredentials=false

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
    (config) => {
        const username = localStorage.getItem('username');
        const authorization = localStorage.getItem('token');
        // 若 localStorage 中含有这两个字段，则添加入请求头
        //config.data = qs.stringify(config.data)
        if (username && authorization) {
            console.log(authorization)
            config.headers.authorization = authorization;
            config.headers.username = username;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    response=> {
        /*const { data, config } = response
        const { code, msg } = data
        // 操作正常Code数组
        const codeVerificationArray = isArray(successCode)
            ? [...successCode]
            : [...[successCode]]
        // 是否操作正常
        if (codeVerificationArray.includes(code)) {
            return data
        } else {
            handleCode(code, msg)
            return Promise.reject(
                'vue-admin-beautiful请求异常拦截:' +
                JSON.stringify({ url: config.url, code, msg }) || 'Error'
            )
        }*/
        return response
    },
    /*(error) => {
        if (loadingInstance) loadingInstance.close()
        const { response, message } = error
        if (error.response && error.response.data) {
            const { status, data } = response
            handleCode(status, data.msg || message)
            return Promise.reject(error)
        } else {
            let { message } = error
            if (message === 'Network Error') {
                message = '后端接口连接异常'
            }
            if (message.includes('timeout')) {
                message = '后端接口请求超时'
            }
            if (message.includes('Request failed with status code')) {
                const code = message.substr(message.length - 3)
                message = '后端接口' + code + '异常'
            }
            message.error(message || `后端接口未知异常`)
            return Promise.reject(error)
        }
    }*/
)

export default instance
/*Service.interceptors.request.use(
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
                    router.currentRoute.path !== '/login' &&
                    router.replace({
                        path: '/login',
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
*/
