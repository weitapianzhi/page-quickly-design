import { baseType, XNode } from "@/utils/tools/xNodeData";
type objType = {
  [key: string]: any
}
export default {
  //获取元素的上下左右边界位置
  getNodeBorderInfo(elm: HTMLElement): objType {
    const left = elm.offsetLeft
    const top = elm.offsetTop
    const leftWrapWidth = (<HTMLElement>document.querySelector(".l-wrap")).offsetWidth
    const middleTopWrapHeight = (<HTMLElement>document.querySelector(".middle-header")).offsetHeight

    const right = elm.offsetLeft + elm.clientWidth + leftWrapWidth
    const bottom = elm.offsetTop + elm.clientHeight + middleTopWrapHeight
    return {
      left,
      top,
      right,
      bottom
    }
  },

  //获得当前节点信息
  getCurrentXNode(list: XNode, data: HTMLElement): baseType | null {
    let queue = [ {...list} ]
    let res: baseType | null = null
    
    const dataToken = data.getAttribute("x-token")
    
    while(queue.length > 0) {
      const currElm = queue.pop() as XNode
      if(currElm.$token === dataToken) {
        queue = []
        res = currElm
      } else {
        if(currElm.$children.length > 0) {
          queue.push(...currElm.$children)
        }
      }
    }
    return res
  },

  //根据整个节点信息获取父元素信息
  getParentInfoOfNode(list: XNode, data: HTMLElement, key: string): baseType | null {
    let queue = [ {...list} ]
    let res: baseType | null = null
    
    const dataToken = data.getAttribute("x-token")
    
    while(queue.length > 0) {
      const currElm = queue.pop() as XNode
      if(currElm.$token === dataToken) {
        queue = []
        res = currElm
      } else {
        if(currElm.$children.length > 0) {
          for(const _i in currElm.$children) {
            if(currElm.$children[_i].$token === dataToken) {
              queue = []
              res = currElm
            }
          }
          if(res === null) {
            queue.push(...currElm.$children)
          }
        }
      }
    }
    
    return res
  },

  //查找最外层x-parent节点
  getXParentOfNode(list: XNode[], data: HTMLElement, obj: any,parent: HTMLElement): void {
    if(!parent) {
      parent = document.querySelector(".middle-wrap-content") as HTMLElement
    }
    for(const i in list) {
      if(list[i].$token === data.getAttribute("x-token")) {
        obj.el = parent
      }
      if(list[i].$children.length > 0) {
        this.getXParentOfNode(list[i].$children, data, obj, list[i].$el)
      }
    }
  },

  //根据部分字段获取节点信息
  getParentInfoOfFeild(list: XNode, feild: string, value: string): baseType {
    let queue = [ list ]
    let res: baseType = {}
    
    while(queue.length > 0) {
      const currElm = queue.pop() as XNode
      const currToken = currElm[feild]
      
      if(value && currToken == value) {
        queue = []
        res = currElm
      }
      if(currElm.$children.length > 0) {
        queue.push(...currElm.$children)
      }
    }
    
    return res
  },

  /**
   * 判断数据是否已存在在基础数据中
   * @param list 基础数据
   * @param data 当前数据
   * @returns 
   */
  dataExist( list: XNode,data: HTMLElement):boolean {
    //1.如果没有该属性则一定不存在
    if(!data.getAttribute("x-token")) return false
    //2.存在该属性
    return true
  },

  dateFormat(date: Date, format: string): string {
    
    const year = date.getFullYear() + ""
    const month = date.getMonth() + 1 + ""
    const day = date.getDate() + ""
    const hour = date.getHours() + ""
    const minute = date.getMinutes() + ""
    const second = date.getSeconds() + ""


    const regx1 = /([Y|y]{4})-?(M{2})-?([D|d]{2})/g;
    const regx2 = /([h]{2}):([m]{2}):([s]{2})/g;
    
    if(!regx1.test(format) && !regx2.test(format)) {
      throw new Error("format值应为YYYY-MM-DD或yyyy-MM-dd")
    }

    format = format.replace(regx1, (strs: string, y: string, M: string, d: string) :string => {
      strs = strs.replace(y, year)
      strs = strs.replace(M, month)
      strs = strs.replace(d, day)
      
      return strs
    })
    format = format.replace(regx2, (strs: string, h: string, m: string, s: string) :string => {
      strs = strs.replace(h, hour)
      strs = strs.replace(m, minute)
      strs = strs.replace(s, second)
      
      return strs
    })
    
    return format
  },

  getElementOfToken(feild: string): HTMLElement {
    return document.querySelector(`[x-token='${feild}']`) as HTMLElement 
  },

  //判断是否空对象
  isEmpty(obj: any) :boolean{
    if(Object.keys(obj).length === 0) return true
    return false
  }
}