import md5 from "md5";
export type baseType = {
  $token?: string;
  $el?: HTMLElement | Element,
  $children?: XNode[],
  $tagName?: string,
  $attr?: attrType,
  $on?: any,
  ___xObj___?: any
}
export type attrType = {
  "className"?: string,
  "x-parent"?: string,
  "style"?: string,
  "x-token"?: string,
}
export class XNode {
  $token: string
  $el: HTMLElement
  $children: XNode[]
  $tagName: string
  $attr: attrType
  constructor(el: HTMLElement | Element, level ?: any) {
    this.$token = md5(new Date().getTime() + "" + Math.random()).slice(0,8)
    if(level) {
      el.setAttribute("x-parent","")
    }
    el.setAttribute("x-token",this.$token.slice(0,8))
    this.$el = el as HTMLElement
    this.$tagName = el.tagName.toLowerCase()
    this.$attr = {}
    this.$children = []
    this.setAttr("0")
    this.appendChild(el.children)
  }

  appendChild(childrens: HTMLCollection): void {
    const queue = [ ...childrens ]
    while(queue.length > 0) {
      const currentData = queue.pop() as HTMLElement
      const _baseData = new XNode(currentData)
      this.$children.unshift(_baseData)
    }
  }

  setAttr(type: string, obj?: any): void {
    if(type === "0") {
      this.$attr["className"] = this.$el.getAttribute("class") as string
      this.$attr["x-parent"] = this.$el.getAttribute("x-parent") as string
      this.$attr["style"] = this.$el.getAttribute("style") as string
      this.$attr["x-token"] = this.$el.getAttribute("x-token") as string
    } else if(type === "1") {
      //to do
      this.$el.style[obj.feild] = obj.val
      this.$attr["style"] = this.$el.getAttribute("style") as string
    } else if(type === "2") {
      this.$el.className = obj.val
      this.$attr["className"] = obj.val
    }
  }
}

