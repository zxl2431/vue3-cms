import HYRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import localCache from "@/utils/cache"

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token
      const token = localCache.getCache("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log("hyRequest对象的请求拦截:请求成功", config)
      return config
    },
    requestInerceptorCatch: (err) => {
      // console.log("hyRequest对象的请求拦截:请求失败")
      return err
    },

    responseInterceptor: (res) => {
      // console.log("hyRequest对象的响应拦截:响应成功")
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log("hyRequest对象的响应拦截:响应失败")
      return err
    }
  }
})

const hyRequest2 = new HYRequest({
  // baseURL: BASE_URL,
  timeout: TIME_OUT
})

export { hyRequest, hyRequest2 }
