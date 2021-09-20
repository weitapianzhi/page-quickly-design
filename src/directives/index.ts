import directives from "./directives";
import { VueConstructor } from "Vue";
export default function(Vue: VueConstructor<Vue>): void {
  Object.keys(directives).map((key)=> {
    Vue.directive(key,directives[key])
  })
}