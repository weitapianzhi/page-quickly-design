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
    this.$attr = {}
    this.setAttr("0")
    this.appendChild(el.children)
  }

  appendChild(childrens: any): void {
    this.$children = []
    const queue = [ ...childrens ]
    
    while(queue.length > 0) {
      const currentData = queue.pop()
      const _baseData = new BaseData(currentData)
      this.$children.unshift(_baseData)
    }
  }

  setAttr(type: string): void {
    if(type === "0") {
      this.$el.attributes.forEach((i:any) => {
        if(i.name === "class") {
          this.$attr["className"] = i.value
        } else if (i.name === "x-parent") {
          this.$attr["x-parent"] = i.value
        } else if(i.name === "style") {
          this.$attr["style"] = i.value
        } else if(i.name === "x-token") {
          this.$attr["x-token"] = i.value
        }
      });
    } else if(type === "1") {
      //to do
      this.$attr["style"] = this.$el.getAttribute("style")
    }
  }
}

