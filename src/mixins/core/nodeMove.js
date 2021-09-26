import { BaseData } from "@/utils/tools/baseType.ts";
import storeMixin from "./storeMixin";
export default {
  mixins: [ storeMixin ],
  methods: {
    //节点添加
    nodeAdd(parentNode, curMoveNode) {
      this.currDraggedElm.addEventListener("dragstart", (event) => {
        this.currDraggedElm = event.target
      })
      if(curMoveNode === parentNode) return
      const isEmpty = this.utils.isEmpty(this.baseData)
      if(isEmpty) {
        const parentElm = new BaseData(document.querySelector(".middle-wrap-content"))
        this.setBaseData(parentElm)
      }
      const _obj = { el: null }
      if(parentNode.className.indexOf("middle-wrap-content") === -1) {
        if(parentNode.getAttribute("x-parent") === null) {
          this.utils.getXParentOfNode([ this.baseData ], parentNode, _obj)
          parentNode = _obj.el.$el
        }
      }
      parentNode.insertBefore(curMoveNode, null)
      this.nodeSave(parentNode, curMoveNode)
    },

    //节点信息保存
    nodeSave(parentNode, curMoveNode) {
      //数据是否已经存在
      const isExist = this.utils.dataExist(this.baseData, curMoveNode)
      if(isExist) {
        //存在
        this.nodeMove(this.baseData, curMoveNode)
      } else {
        //不存在
        const _curMoveNode = new BaseData(curMoveNode, "1")
        const _parentNode = this.utils.getParentInfoOfFeild(this.baseData, "$token", parentNode.getAttribute("x-token"))
        _parentNode.$children.push(_curMoveNode)
        this.setPrev({
          type: "add",
          info: {
            "add": {
              oldNode: _parentNode,
              data: _curMoveNode
            }
          }
        })
      }
    },

    //节点信息修改，删除旧的父节点下的信息，增加新的父节点下的信息
    nodeDel(list,data) {
      const _data = this.utils.getParentInfoOfFeild(list, "$token", data.getAttribute("x-token"))
      const oldNode = this.utils.getParentInfoOfNode(list, data, "$token")
      if(!oldNode) return
      let index = null;
      for (let _i in oldNode.$children) {
        if(oldNode.$children[_i].$token == data.getAttribute("x-token")) {
          index = _i
        }
      }
      if(index !== null) {
        oldNode.$children.splice(index, 1)
      }
      oldNode.$el.removeChild(_data.$el)
      this.setPrev({
        type: "add",
        info: {
          "del": {
            oldNode: oldNode,
            data: _data,
            newNode: null
          }
        }
      })
    },

    //节点移动
    nodeMove(list, data) {
      //to do ..
      const _data = this.utils.getParentInfoOfFeild(list, "$token", data.getAttribute("x-token"))
      const oldNode = this.utils.getParentInfoOfNode(list, data, "$token")
      const newNode = this.utils.getParentInfoOfFeild(list, "$token", data.parentNode.getAttribute("x-token"))
      if(!oldNode) return
      let index = null;
      for (let _i in oldNode.$children) {
        if(oldNode.$children[_i].$token == data.getAttribute("x-token")) {
          index = _i
        }
      }
      if(index !== null) {
        oldNode.$children.splice(index, 1)
      }
      this.setPrev({
        type: "add",
        info: {
          "move": {
            oldNode: oldNode,
            data: _data,
            newNode: newNode
          }
        }
      })
      newNode.$children.push(_data)
    },

    //节点边界碰撞
    borderTouch(event, curMoveNode) {
      const isOutBorder = this.isOutBorder(event)
      const childElms = curMoveNode.parentNode.children
      //1.判断当前元素下是否只有一个元素，并且移动的范围属于当前父节点下
      if(childElms.length > 1) {
        //是否超过父元素边界
        if(isOutBorder) {
          //超过
        } else {
          //没超过
          //判断当前放下的点是否在某个元素前后
          const mouseUpX = event.clientX
          const mouseUpY = event.clientY
          let afterElm = null //需要移动到这个节点前
          let beforeElm = null //需要移动到这个节点后
          let touchDirection = null
          for (const _elm of childElms) {
            const _elmBorder = this.utils.getNodeBorderInfo(_elm)
            if(_elmBorder.left <= mouseUpX && mouseUpX <= _elmBorder.left + 15) {
              touchDirection = "left"
              afterElm = _elm
            }
            if(_elmBorder.right - 15 <= mouseUpX && mouseUpX <= _elmBorder.right) {
              touchDirection = "right"
              beforeElm = _elm
            }
            if(_elmBorder.top - 15 <= mouseUpY && mouseUpY <= _elmBorder.top + 15) {
              touchDirection = "top"
              afterElm = _elm
            }
            if(_elmBorder.bottom - 15 <= mouseUpY && mouseUpY <= _elmBorder.bottom + 15) {
              touchDirection = "bottom"
              beforeElm = _elm
            }
          }
          if(afterElm) {
            //to do .. 
            event.target.insertBefore(curMoveNode,afterElm)
          } else if(beforeElm) {
            //to do ..
            event.target.insertBefore(beforeElm,curMoveNode)
          }
        }
      }
    },
    //是否超过父元素边界
    isOutBorder(event) {
      const mouseUpX = event.clientX
      const mouseUpY = event.clientY

      const parentBorderInfo = this.utils.getNodeBorderInfo(event.target)
      if(mouseUpY > parentBorderInfo.bottom || mouseUpY < parentBorderInfo.top || mouseUpX > parentBorderInfo.right || mouseUpX < parentBorderInfo.left) {
        return true
      }
      return false
    }
  }
}