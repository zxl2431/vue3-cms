<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <el-icon v-if="isFold === false"><DArrowLeft /></el-icon>
      <el-icon v-if="isFold === true"><DArrowRight /></el-icon>
    </div>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"

import userInfo from "./user-info.vue"
import HyBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb"

import { useStore } from "@/store"
import { useRoute } from "vue-router"
import { pathMapBreadcrumbs } from "@/utils/map-menus"

export default defineComponent({
  emits: ["foldChange"],

  components: {
    userInfo,
    HyBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // console.log("折叠菜单")
      emit("foldChange", isFold.value)
    }

    // 面包屑的数据 [{name: '', path:''}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      // console.log("userMenus:", userMenus)
      // console.log("route:", route.path)
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
