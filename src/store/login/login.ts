import { Module } from "vuex"

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login"
import localCache from "@/utils/cache"
import router from "@/router"
// 类型导入
import { IAccount } from "@/service/login/type"
import { ILoginState } from "./types"
import { IRootstate } from "../types"
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus"

const loginModule: Module<ILoginState, IRootstate> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },

    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },

    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      console.log("注册动态路由")
      const routes = mapMenusToRoutes(userMenus)
      // 将routes 加到router.main.children里面
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 获取用户权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },

  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      // console.log("login-vuex实现登录逻辑!", payload);
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      console.log("获取的token:", token)
      commit("changeToken", token)
      localCache.setCache("token", token)

      // 中间加一个, 发送初始化数据(完整的department/role/menu)
      dispatch("getInitialDataAction", null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log("请求用户信息结果:", userInfoResult)
      const userInfo = userInfoResult.data
      commit("changeUserInfo", userInfo)
      localCache.setCache("userInfo", userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      console.log("请求用户菜单数据:", userMenusResult)
      const userMenus = userMenusResult.data
      commit("changeUserMenus", userMenus)
      localCache.setCache("userMenus", userMenus)

      // 4.跳转到首页
      router.push("/main")
    },

    LoadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
        // 发送初始化的请求(完整的role/department)
        dispatch("getInitialDataAction", null, { root: true })
      }

      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }

      const userMenus = localCache.getCache("userMenus")
      if (userMenus) {
        commit("changeUserMenus", userMenus)
      }
    }
  }
}

export default loginModule
