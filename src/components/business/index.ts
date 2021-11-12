import xNavigate from "./x-navigate.vue";
import xTable from "./x-table.vue";
import xButton from "./x-button.vue";
import xHorizontalDiv from "./x-horizontal-div.vue";
import xVerticalDiv from "./x-vertical-div.vue";
import xRadio from "./x-radio.vue";
import { VueConstructor } from "vue";


export const components = {
  xTable,
  xNavigate,
  xButton,
  xHorizontalDiv,
  xVerticalDiv,
  xRadio
}

function install(Vue: VueConstructor<Vue>): void {
  Object.keys(components).map(key => {
    Vue.component(key, components[key])
  })
}

export default install