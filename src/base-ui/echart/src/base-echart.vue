<template>
  <div class="base-echart">
    <div ref="echarDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect, withDefaults } from "vue"
import { EChartsOption } from "echarts"
// import useEchart from "../hooks/useEchart"

import * as echarts from "echarts"

const props = withDefaults(
  defineProps<{
    optiopns: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: "100%",
    height: "360px"
  }
)

const echarDivRef = ref<HTMLElement>()

onMounted(() => {
  // const { setOptions } = useEchart(echarDivRef.value!)

  const echartInstance = echarts.init(echarDivRef.value!)
  console.log(props.optiopns)

  // watchEffect(() => {
  //   setOptions(props.optiopns)
  // })
})
</script>

<style scoped></style>
