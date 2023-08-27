import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

import useStore from "@/store"

import localCache from "@/utils/cache"
import { firstMenu } from "@/utils/map-menus"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "./main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    name: "main", // 这个名字必须加上
    component: () => import("@/views/main/main.vue")
  },
  {
    path: "/:pathMath(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/not-found.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      // 存在token
      return "/login"
    }
  }

  // console.log(router.getRoutes())
  // console.log(to)

  if (to.path === "/main") {
    // return "/main/analysis/overview"
    return firstMenu.url
  }
})

export default router
