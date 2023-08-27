import type { App } from "vue"

import "element-plus/theme-chalk/base.css"
import { ElFormItem, ElInput, ElLink } from "element-plus"

const components = [ElFormItem, ElInput, ElLink]

export default function (app: App) {
  console.log("register-element执行了...")

  for (const component of components) {
    app.component(component.name, component)
  }
}
