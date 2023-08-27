import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import type { HYRequestInterceptors, HYRequestConfig } from "./type"

import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/es/components/loading/src/loading"

const DEAFULT_LOADING = false

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 2.添加对象的拦截器-new的时候有传就加上 (先use的拦截器后使用)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInerceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 1.添加类的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("类的拦截器:请求成功拦截")
        // 弹框提示
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            fullscreen: false,
            text: "正在请求数据....",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.5)"
          })
        }
        return config
      },
      (err) => {
        // console.log("类的拦截器:请求失败拦截")
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log("类的拦截器:响应成功拦截")
        // 将弹框移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === "-1001") {
          // console.log("请求失败~, 错误信息")
        } else {
          return data
        }
        console.log(res.data)

        // return res;
      },
      (err) => {
        // console.log("类的拦截器:响应失败拦截")

        // 将loading移除
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误~")
        }

        return err
      }
    )
  }

  //3 单个请求 也是可以使用拦截器的
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断调用的时候config里面是否有interceptor,在看看是否有request的
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }

      // 2.判断是否需要loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }
          // 2.将showLoading设置为true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          // 将结果resolve出去
          resolve(res)
        })
        .catch((err) => {
          // 2.将showLoading设置为true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default HYRequest
