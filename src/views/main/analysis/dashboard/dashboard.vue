<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)"> </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量"> </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)"> </hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <hy-card title="分类商品的销量"> </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <!-- {{ categoryGoodsFavor }} -->
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "@/store"

import HyCard from "@/base-ui/card"

import { BarEchart } from "@/components/page-echarts"

export default defineComponent({
  name: "dashboard",
  components: {
    HyCard,
    BarEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch("dashboard/getDashboardDataAction")
    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    //
    // const divRef = ref<HTMLElement>()

    // onMounted(() => {
    //   // 1.初始化echarts的实例
    //   const echartInstance = echarts.init(divRef.value!, "light", {
    //     renderer: "svg"
    //   })
    //   // 2.编写配置文件
    //   const option = {
    //     title: {
    //       text: "ECharts 入门示例",
    //       subtext: "哈哈哈啊"
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "cross"
    //       }
    //     },
    //     legend: {
    //       data: ["销量"]
    //     },
    //     xAxis: {
    //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: "销量",
    //         type: "bar",
    //         data: [18, 20, 36, 10, 10, 20]
    //       }
    //     ]
    //   }
    //   // 3.设置配置,并且开始绘制
    //   echartInstance.setOption(option)
    // })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped></style>
