import type { App } from "vue"

import registerElement from "./register-element"
import demoInstall from "./demoInstall"

import registerProperties from "./register-properties"

export function globalRegister(app: App) {
  console.log("9999999")

  // app.use(registerElement)
  // app.use(demoInstall);
  app.use(registerProperties)
}
