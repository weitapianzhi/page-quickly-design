export default {
  namespaced: true,
  state: {
    /**
     * 上一步下一步格式
     * { del | add | move: {} }
     */
    customCss: "", //记录上一步操作
    defaultCss: "", //记录下一步操作
  },
  mutations: {
    setCustomCss(state: any, val: string): void {
      state.customCss = val
      document.styleSheets[2].insertRule(val)
    },
    setDefaultCss(state: any, val: string): void {
      state.defaultCss = val
    },
  },
  actions: {
    setCustomCss({ commit }:any, val: string): void {
      commit("setCustomCss",val)
    },
    setDefaultCss({ commit }:any, val: string): void {
      commit("setDefaultCss",val)
    },
  },
}