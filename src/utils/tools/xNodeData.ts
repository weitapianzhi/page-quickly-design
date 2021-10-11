import md5 from "md5";
export type baseType = {
  $token?: string;
  $children?: XNode[],
  $attr?: attrType,
  $on?: any,
  $el?: HTMLElement,
  ___xObj___?: xObjType
}

export type xObjType = {
  xid: string,
  tagName: string,
  description: string,
  innerText: string,
  iconClassName: string,
}

export type attrType = {
  "className"?: string,
  "x-parent"?: string,
  "style"?: string,
  "x-token"?: string,
}

export class XNode {
  $token: string
  $children: XNode[]
  $attr: attrType
  $el: HTMLElement
  $on: any
  ___xObj___: xObjType
  constructor(current: any) {
    this.$token = md5(new Date().getTime() + "" + Math.random()).slice(0,8)
    this.$children = []
    this.$attr = {}
    this.$on = {}
    this.___xObj___ = {
      xid: current.params ? current.params.xid : "",
      tagName: current.params ? current.params.tagName : "",
      description: current.params ? current.params.description : "",
      innerText: current.params ? current.params.innerText : "",
      iconClassName: current.params ? current.params.iconClassName : "",
    }
    this.$el = current.elm ? current.elm : current
    this.$el.setAttribute("x-token",this.$token)
    this.$el.setAttribute("x-parent",md5(this.$token).slice(0,8))
    this.setAttr("0", this.$el)
  }

  appendChild(child: XNode): void {
    this.$children.push(child)
  }

  setAttr(type: string, el?: any): void {
    if(type === "0") {
      this.$attr["className"] = el.getAttribute("class") as string
      this.$attr["x-parent"] = el.getAttribute("x-parent") as string
      this.$attr["style"] = el.getAttribute("style") as string
      this.$attr["x-token"] = el.getAttribute("x-token") as string
    } else if(type === "1") {
      //to do
      this.$attr["style"] = el.getAttribute("style") as string
    } else if(type === "2") {
      this.$attr["className"] = el.className
    }
  }
}

