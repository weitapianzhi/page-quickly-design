import Vue from 'vue'
import Vuex from 'vuex'
import storageData from "./storageData";
import cssData from "./cssData";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    storageData,
    cssData
  }
})
