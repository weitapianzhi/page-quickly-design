import Vue from 'vue'
import Vuex from 'vuex'
import cssData from "./cssData";
import xNodeData from "./xNodeData";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cssData,
    xNodeData
  }
})
