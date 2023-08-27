import { ref } from "vue"

import PageModal from "@/components/page-modal"

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  // 需要抽取hook的
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    console.log("modal页面收到了新建事件")
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 处理密码是否需要显示
    newCb && newCb()
  }

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    console.log("modal页面收到编辑事件的数据:", defaultInfo)
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 处理密码是否需要显示
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
