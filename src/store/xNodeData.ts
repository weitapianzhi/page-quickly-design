import { baseType } from "@/utils/tools/xNodeData";
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
    deleteDom: {}, //被删除的dom
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
    setDeleteDom(state: any, obj: any):void {
      if(obj.type == "add") {
        state.deleteDom[obj.key] = obj.val
      } else {
        delete state.deleteDom[obj.key]
      }
    },

    setBaseData(state: any, val: baseType): void {
      state.baseData = val
    },
  },
  actions: {
    setPrev({ commit }:any, val: updateDataType): void {
      commit("setPrev",val)
    },
    setNext({ commit }:any, val: updateDataType): void {
      commit("setNext",val)
    },
    setBaseData({ commit }:any, val: baseType): void {
      commit("setBaseData",val)
    },
    setDeleteDom({ commit }:any, val: any): void {
      commit("setDeleteDom",val)
    },
  },
}