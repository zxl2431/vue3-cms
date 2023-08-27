import { createStore, Store, useStore as useVuexStore } from "vuex"

import login from "./login/login"
import system from "./main/system/system"
import dashboard from "./main/analysis/dashboard"

import { getPageListData } from "@/service/main/system/system"

import { IRootstate, IStoreType } from "./types"

const store = createStore<IRootstate>({
  state: () => {
    return {
      name: "Store 测试玩不",
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    //初始化一下数据
    async getInitialDataAction({ commit }) {
      // 1.请求部门
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      // 2.请求角色数据
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      // 3.请求菜单数据
      const menuResult = await getPageListData("/menu/list", {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit("changeEntireDepartment", departmentList)
      commit("changeEntireRole", roleList)
      commit("changeEntireMenu", menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch("login/LoadLocalLogin")
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
