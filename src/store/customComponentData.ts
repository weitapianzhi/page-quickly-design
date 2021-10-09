import { baseType } from "@/utils/tools/baseType"
export type componentType = {
  templateName: string,
  data: baseType
}

export default {
  namespaced: true,
  state: {
    componentData: [], //原始数据
  },
  mutations: {
    setComponentData(state: any, obj: componentType[]): void {
      state.componentData = obj
    },
  },
  actions: {
    setComponentData({ commit }:any, val: componentType[]): void {
      commit("setComponentData",val)
    },
  },
}