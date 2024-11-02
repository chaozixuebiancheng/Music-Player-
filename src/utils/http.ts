import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'

import NProgress from '@/config/nprogress'


const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础的url
    timeout: 100000, // 请求的超时时间
    withCredentials: true, //允许跨域请求时携带cookies
})

// 请求拦截器
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 开启进度条
        // console.log(import.meta.env.VITE_APP_BASE_API)
        NProgress.start()
        if (config.params === undefined) {
            config.params = {};
        }
        // 添加或修改params
        Object.assign(config.params, {
            timestamp: Date.now(), // 该属性是唯一的，为了每次请求都获取资源，而不是使用缓存
            realIP: "116.25.146.177", // 真实ip地址
        });
        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response

        // 进度条结束
        NProgress.done()
        return data
    },
    (error) => {
        // 响应错误时也结束进度条
        NProgress.done()
        return Promise.reject(error)
    }
)

// 封装get方法
//函数返回一个 Promise 对象，该 Promise 最终会解析为类型 T 的数据
export const httpGet = <T>(
    url: string,
    params?: object
): Promise<T> => instance.get(url, { params })

// 封装post方法
export const httpPost = <T>(
    url: string,
    data?: object,
    header?: object
): Promise<T> => instance.post(url, data, header)
