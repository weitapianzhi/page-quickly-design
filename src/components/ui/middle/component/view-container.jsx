import storeMixin from "@/mixins/core/storeMixin.js";

export default {
  data() {
    return {
      initStatus: true,
      baseData1: {}
    }
  },
  methods: {
    initData() {
      if(this.utils.isEmpty(this.baseData)) return
      const queue = [ this.baseData ]
      while(queue.length > 0) {
        const _item = queue.pop()
        _item.$el = this.utils.getElementOfToken(_item.$attr["x-token"])
        if(_item.$children.length > 0) {
          queue.push(..._item.$children)
        }
      }
    },

    handleClick(event) {
      if(!this.utils.isEmpty(this.baseData)) {
        const _current = this.utils.getCurrentXNode(this.baseData, event.target)
        if(_current === null) return
        this.$emit("setCurrDraggedElm", {
          params: _current.___xObj___,
          elm: event.target
        })
      }
      // to do
      this.$emit("handleClick", event)
    },

    handleDBLclick(event) {
      this.$emit("handleDBLclick", event)
    },

    handleDrop(event) {
      this.$emit("dropDown", event)
    },

    handleDragMove(event) {
      event.preventDefault();
    },

    handleDragStart() {
      const _current = this.utils.getCurrentXNode(this.baseData, event.target)
        if(_current === null) return
      this.$emit("setCurrDraggedElm", {
        params: _current.___xObj___,
        elm: event.target
      })
    },

    initView(data) {
      if(data.$children && data.$children.length > 0) {
        return (<div
          class="middle-wrap-content"
          x-parent={data.$attr ? data.$attr["x-parent"] : null}
          x-token={data.$attr ? data.$attr["x-token"] : null}
          onClick={this.handleClick}
          onDblclick={this.handleDBLclick}
          onDragenter={this.handleDragMove}
          onDragover={this.handleDragMove}
          onDragstart={this.handleDragStart}
          onDrop={this.handleDrop}
        >
          {...this.createElm(data.$children)}
        </div>)
      } else {
        return (<div
          class="middle-wrap-content"
          x-parent={data.$attr ? data.$attr["x-parent"] : null}
          x-token={data.$attr ? data.$attr["x-token"] : null}
          onClick={this.handleClick}
          onDblclick={this.handleDBLclick}
          onDragenter={this.handleDragMove}
          onDragover={this.handleDragMove}
          onDrop={this.handleDrop}
        >
        </div>)
      }
    },
    createElm(list) {
      let res = []
      let _child = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if(item.$children && item.$children.length > 0) {
          _child = this.createElm(item.$children)
        }
        let _VNode = (<item.___xObj___.tagName
          class={"x-elm-border " + item.$attr.className}
          style={item.$attr.style}
          draggable={true}
          x-parent={item.$attr["x-parent"]}
          x-token={item.$attr["x-token"]}
        >
          {item.___xObj___.innerText}
          {
            ..._child
          }
        </item.___xObj___.tagName>)
        res.push(_VNode)
      }
      return res
    }
    //t
  },
  created() {
    if(this.initStatus) {
      this.initStatus = false
      this.baseData1 = window._.cloneDeep(this.baseData)
    }
  },//todo
  mounted() {
    this.initData()
  },
  mixins: [
    storeMixin
  ],
  render(h) {
    const {
      initView
    } = this
    return initView(this.baseData1)
  }
}