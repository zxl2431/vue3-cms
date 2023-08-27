import { createApp } from "vue"
import "normalize.css"
import "./assets/css/index.less"

import App from "./App.vue"

import router from "./router"
import store from "./store"
import { setupStore } from "./store"

import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

import { hyRequest, hyRequest2 } from "./service"

// login的请求模拟一下
import { accountLoginRequest } from "./service/login/login"

// 测试专用
// import './service/axios_demo'
// import  demoInstall from "./global/demoInstall"
import { globalRegister } from "./global"

// app.use(demoInstall)

const app = createApp(App)

app.use(globalRegister)

// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

setupStore()

app.use(router)
app.use(store)

app.mount("#app")

// accountLoginRequest({name: 'coderwhy', password: '123456'})

// hyRequest.request({
//   url: "/home/multidata",
//   headers: {},
//   showLoading: false,
//   interceptors: {
//     requestInterceptor: (config) => {

//       config.headers['token'] = '123'
//       console.log("hyRequest单独请求的config", config)
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log("hyRequest单独响应的response")
//       return res
//     }
//   }
// }).then((res) => {
//   console.log(res);
// })

// hyRequest2.request({
//   url: 'http://httpbin.org/get',
//   interceptors: {
//     requestInterceptor: (config: any) => {
//       console.log('hyRequest2单独请求的config');
//       return config;
//     },
//     responseInterceptor: (res: any) => {
//       console.log('hyRequest2单独响应的response');
//       return res;
//     }
//   }
// })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// hyRequest
//   .get<DataType>({
//     url: "/home/multidata",
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res)
//   })
