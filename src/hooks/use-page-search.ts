import { ref } from "vue"
import PageContent from "@/components/page-content"

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 重置事件
  const handleResetClick = () => {
    console.log("user页面收到重置事件")
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    console.log("user页面收到查询事件:", queryInfo)
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
