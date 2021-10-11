import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from "@/utils/index";
import xComponent from "@/components/business/index";
import lodash from "lodash";
import directives from "./directives";
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; 
import '@/assets/iconfont/iconfont.css'

Vue.use(antd);
directives(Vue)
xComponent(Vue)

window._ = lodash

Vue.config.productionTip = false
Vue.prototype.utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
