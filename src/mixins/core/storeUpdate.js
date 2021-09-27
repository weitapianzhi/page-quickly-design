import { add } from "lodash";
import storeMixin from "./storeMixin.js";
export default {
  mixins: [
    storeMixin
  ],
  methods: {
    //下一步
    nextFunc(event) {
      if (event.target.className.indexOf("version-control-disabled") > -1) return
      const _next = this.next.pop()
      if(!_next) return
      const _key = Object.keys(_next)[0]
      if(!_key) return
      this.operateRefund(_next, _key, "Prev")
    },

    //上一步
    prevFunc(event) {
      if (event.target.className.indexOf("version-control-disabled") > -1) return
      const _prev = this.prev.pop()
      if(!_prev) return
      const _key = Object.keys(_prev)[0]
      if(!_key) return
      this.operateRefund(_prev, _key, "Next")
    },

    /**
     * 还原
     * @param {*} data 需要还原的数据
     * @param {*} key 操作类型 add del move
     * @param {*} type 是上一步还是下一步
     */
    operateRefund(data, key, type) {
      const _data = data[key].data
      const _oldNode = data[key].oldNode
      const _newNode = data[key].newNode
      const _oldPosition =  data[key].oldPosition
      const _newPosition = _newNode && _newNode.$children.findIndex(item => item == _data)
      const nextElm = _oldNode.$children[_oldPosition + 1] ? _oldNode.$children[_oldPosition + 1] : null

      //如果上一步是添加操作，则这里需要做删除操作并保存操作
      //如果上一步是删除操作，则这里需要做添加操作并保存操作
      //如果上一步是节点间的移动操作，则这里还是做移动操作
      switch (key) {
        case "add":
          _oldNode.$children.splice(_oldPosition, 1)
          _oldNode.$el.removeChild(_data.$el)
          this["set" + type]({
            type: "add",
            info: {
              "del": {
                oldNode: _oldNode,
                data: _data,
                newNode: _newNode,
                position: _oldPosition
              }
            }
          })
          break;
        case "del":
          _oldNode.$children.splice(_oldPosition,0,_data)
          _oldNode.$el.insertBefore(_data.$el, nextElm)
          this["set" + type]({
            type: "add",
            info: {
              "add": {
                oldNode: _oldNode,
                data: _data,
                newNode: _newNode,
                oldPosition: _oldPosition
              }
            }
          })
          break;
        case "move":
          _oldNode.$children.splice(_oldPosition,0,_data)
          _oldNode.$el.insertBefore(_data.$el, nextElm)
          _newNode.$children.splice(_newPosition, 1)
          this["set" + type]({
            type: "add",
            info: {
              "move": {
                oldNode: _newNode,
                data: _data,
                newNode: _oldNode,
                oldPosition: _newPosition
              }
            }
          })
          break;
        default:
          break;
      }
    },
  }
}