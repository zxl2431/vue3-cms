<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick"
            >退出登录<el-icon><CloseBold /></el-icon
          ></el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import localCache from "@/utils/cache"

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => {
      return store.state.login.userInfo.name
    })

    const router = useRouter()
    // 退出登录
    const handleExitClick = () => {
      localCache.deleteCache("token")
      // localCache.deleteCache("userInfo")
      // localCache.deleteCache("userMenus")
      router.push("/main")
    }

    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  width: 100px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
