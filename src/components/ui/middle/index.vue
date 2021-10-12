<template>
  <div class="middle-wrap">
    <div class="middle-header">
      <div class="middle-header-l">中间视图</div>
      <div class="middle-header-r">
        <a-button class="mr-10">保存模版</a-button>
        <a-select v-model="viewType" @change="viewTypeChange">
          <a-select-option key="1" value="界面视图">界面视图</a-select-option>
          <a-select-option key="2" value="代码视图">代码视图</a-select-option>
          <a-select-option key="3" value="全屏视图">全屏视图</a-select-option>
        </a-select>
      </div>
    </div>
    <div
      class="middle-wrap-view"
      v-if="viewType == '界面视图'"
    >
      <div class="version-control">
        <div :class="['version-control-prev', prev.length === 0 ? 'version-control-disabled': '']" @click="prevFunc">上一步</div>
        <div :class="['version-control-next', next.length === 0 ? 'version-control-disabled': '']" @click="nextFunc">下一步</div>
      </div>
      <view-container
        @setCurrDraggedElm="setCurrDraggedElm"
        @dragStartCallback="dragStartCallback"
        @handleClick="handleClick"
        @handleDBLclick="handleDBLclick"
        @dropDown="dropDown">
      </view-container>
      <i id="activeDelIcon" @click="handleDelElm" title="删除元素" class="active-del-icon">x</i>
    </div>
    <div
      v-if="viewType == '代码视图'"
    >2</div>
  </div>
</template>

<script>
import nodeMove from "@/mixins/core/nodeMove.js";
import storeUpdate from "@/mixins/core/storeUpdate.js";
import viewContainer from "./component/view-container.jsx";
export default {
  name: "middleView",
  components: {
    viewContainer
  },
  mixins: [ 
    nodeMove,
    storeUpdate
  ],
  data() {
    return {
      currDraggedElm: null, //当前拖动元素
      viewType: "界面视图",
      currentFocusElm: null, //当前获得焦点的元素
    };
  },
  methods: {
    //记录当前激活元素
    handleClick(e) {
      const _elm = document.querySelector(".middle-wrap-content .active");
      let delIcon = document.querySelector("#activeDelIcon")
      if(!delIcon) {
        const middleWrap = document.querySelector(".middle-wrap-view")
        let dataset = Object.keys(middleWrap.dataset)[0]
        delIcon = document.createElement("i")
          .innerHTML = "x"
        delIcon.setAttribute("id","activeDelIcon")
        delIcon.setAttribute("title","删除元素")
        delIcon.setAttribute("class","active-del-icon")
        delIcon.setAttribute(`data-${dataset}`,"")
        delIcon.addEventListener("click",this.handleDelElm)
        middleWrap.appendChild(delIcon)
      }
      if(e.target.className === "active-del-icon") {
        return false
      }
      if (_elm) {
        delIcon.style.display = "none"
        if (typeof _elm.className === "object") {
          _elm.setAttribute("class", "");
        } else {
          _elm.className = _elm.className.replace(/\s+active/g, "");
          _elm.setAttribute("class", _elm.className);
        }
      }
      if(!(e.target.className === "middle-wrap-content")) {
        delIcon.style.display = "block"
        e.target.appendChild(delIcon)
        e.target.setAttribute(
          "class",
          e.target.getAttribute("class") + " active"
        );
        this.currentFocusElm = e.target
        this.$emit("setCurrFocusELm", e.target);
      } else {
        this.currentFocusElm = e.target
        this.$emit("setCurrFocusELm", null)
      } //to do
    },

    //删除元素
    handleDelElm() {
      //to do
      const delIcon = document.querySelector("#activeDelIcon")
      const middleWrap = document.querySelector(".middle-wrap-view")
      delIcon.style.display = "none"
      middleWrap.appendChild(delIcon)
      // this.nodeDel(this.baseData, this.currentFocusElm)
      this.nodeDel(this.baseData, this.currentFocusElm)
    },

    handleDBLclick(e) {
      if(e.target.className === "middle-wrap-content") return
      const _obj = { el: null };
      this.utils.getXParentOfNode([this.baseData], e.target, _obj);
      if (!_obj.el) return;
      const _e = {
        target: _obj.el,
      };
      this.handleClick(_e);
    },

    dropDown(event) {
      const parentNode = event.target;
      //判断是否同一父节点下移动
      if (parentNode != this.currDraggedElm.elm.parentNode) {
        this.nodeAdd(parentNode, this.currDraggedElm);
      } else {
        this.borderTouch(event, this.currDraggedElm);
      }
    },

    viewTypeChange() {
      if(this.viewType === "界面视图") {
        this.$nextTick(()=>{
          this.$parent.initView()
        })
      }
    },

    dragStartCallback(event, item) {
      const _elm = event.target.children[2].cloneNode(true)
      _elm.setAttribute("class","x-elm-border " + _elm.className)
      _elm.setAttribute("draggable",true)
      this.currDraggedElm = {
        params: item,
        elm: _elm
      }
    },

    setCurrDraggedElm(val) {
      this.currDraggedElm = val
    }
  },
};
</script>
<style lang="scss" scoped>
.middle-wrap {
  position:relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  .middle-header {
    padding: 5.5px 10px;
    box-shadow: 0px 3px 4px 0px rgb(231, 231, 231);
    display: flex;
    justify-content: space-between;
    .middle-header-l {
      padding-top: 5px;
    }
  }
  .middle-wrap-view {
    height: 100%;
    position: relative;
    &:hover {
      .version-control {
        display: flex;
      }
    }
    .version-control {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      flex-direction: row;
      z-index: 98;
      user-select: none;
      .version-control-prev {
        padding: 5px 10px;
        background: #64c3f0;
      }
      .version-control-prev:not(.version-control-disabled ):hover {
        cursor: pointer;
        background: #c1e3f3;
      }
      .version-control-next {
        margin-left: 5px;
        background: #64c3f0;
        padding: 5px 10px;
      }
      .version-control-next:not(.version-control-disabled ):hover {
        cursor: pointer;
        background: #c1e3f3;
      }
      .version-control-disabled {
        cursor: not-allowed;
        background: #e8e8e8;
      }
    } 
    /deep/.middle-wrap-content {
      flex: 1;
      padding: 10px;
      position: relative;
      overflow-y: auto;
      height: 100%;
    }
  }
  
  .active-del-icon {
    z-index: 99;
    position: absolute;
    background: red;
    top: -8px;
    color: white;
    font-size: 19px;
    right: -5px;
    width: 25px;
    height: 25px;
    text-align: center;
    border-radius: 25px;
    display: none;
    line-height: 20px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>