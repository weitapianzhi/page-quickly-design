import md5 from "md5";
export type baseType = {
  $token: string;
  $el: any,
  $children: Array<baseType> | null | undefined
  $tagName: string;
} | null
export class BaseData {
  $token: string;
  $tagName: string;
  $el: any;
  $attr: any;
  $children: Array<baseType> | null | undefined;
  constructor(el: any, level ?: any) {
    this.$token = md5(new Date().getTime() + "" + Math.random()).slice(0,8)
    if(level) {
      el.setAttribute("x-parent","")
    }
    el.setAttribute("x-token",this.$token.slice(0,8))
    this.$el = el
    this.$tagName = el.tagName.toLowerCase()
    this.$attr = {
      ...el.attributes
    }
    this.appednChild(el.children)
  }

  appednChild(childrens: any) {
    this.$children = []
    const queue = [ ...childrens ]
    
    while(queue.length > 0) {
      const currentData = queue.pop()
      const _baseData = new BaseData(currentData)
      this.$children.push(_baseData)
    }
  }
}