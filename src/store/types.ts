import { ILoginState } from "./login/types"
import { ISystemState } from "./main/system/types"
import { IDashboardState } from "./main/analysis/types"

export interface IRootstate {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootstateModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootstate & IRootstateModule
