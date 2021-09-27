import { baseType } from "@/utils/tools/baseType";
export type updateDataType = {
  type: "add" | "del",
  info: any
}
export default {
  namespaced: true,
  state: {
    /**
     * 上一步下一步格式
     * { del | add | move: {} }
     */
    prev: [], //记录上一步操作
    next: [], //记录下一步操作
    baseData: {}, //原始数据
  },
  mutations: {
    setPrev(state: any, obj: updateDataType): void {
      if( obj.type == "add") {
        state.prev.push(obj.info)
      } else if( obj.type == "del") {
        //to do..
      }
    },
    setNext(state: any, obj: updateDataType): void {
      if( obj.type == "add") {
        state.next.push(obj.info) 
      } else if( obj.type == "del") {
        //to do ..
      }
    },
    setBaseData(state: any, val: baseType): void {
      state.baseData = val
    },
  },
  actions: {
    setPrev({ commit }:any, val: any): void {
      commit("setPrev",val)
    },
    setNext({ commit }:any, val: any): void {
      commit("setNext",val)
    },
    setBaseData({ commit }:any, val: any): void {
      commit("setBaseData",val)
    },
  },
}