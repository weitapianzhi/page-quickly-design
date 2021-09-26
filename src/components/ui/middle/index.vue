<template>
  <div class="middle-wrap">
    <div class="middle-header">
      <div class="middle-header-l">中间视图</div>
      <div class="middle-header-r">
        <a-select v-model="viewType" @change="viewTypeChange">
          <a-select-option key="1" value="界面视图">界面视图</a-select-option>
          <a-select-option key="2" value="代码视图">代码视图</a-select-option>
        </a-select>
      </div>
    </div>
    <div
      class="middle-wrap-view"
      v-if="viewType == '界面视图'"
    >
      <div
        class="middle-wrap-content"
        @click="handleClick"
        @dblclick="handleDBLclick"
        @dragenter="
          (e) => {
            e.preventDefault();
          }
        "
        @dragover="
          (e) => {
            e.preventDefault();
          }
        "
        @drop="dropDown"
      ></div>
      <i id="activeDelIcon" @click="handleDelElm" title="删除元素" class="active-del-icon">x</i>
    </div>
    <div
      v-if="viewType == '代码视图'"
    >2</div>
  </div>
</template>

<script>
import nodeMove from "@/mixins/core/nodeMove.js";
export default {
  name: "middleView",
  components: {},
  props: {},
  mixins: [nodeMove],
  computed: {},
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
      const delIcon = document.querySelector("#activeDelIcon")
      if(e.target.className === "active-del-icon") {
        return
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
      }
      this.currentFocusElm = e.target
      this.$emit("setCurrFocusELm", e.target);
    },

    //删除元素
    handleDelElm() {
      //to do
      const delIcon = document.querySelector("#activeDelIcon")
      const middleWrap = document.querySelector(".middle-wrap-view")
      delIcon.style.display = "none"
      middleWrap.appendChild(delIcon)
      this.nodeDel(this.baseData, this.currentFocusElm)
    },

    handleDBLclick(e) {
      const _obj = { el: null };
      this.utils.getXParentOfNode([this.baseData], e.target, _obj);
      if (!_obj.el) return;
      const _e = {
        target: _obj.el.$el,
      };
      this.handleClick(_e);
    },

    dropDown(event) {
      //to do
      const parentNode = event.target;
      //判断是否同一父节点下移动
      if (parentNode != this.currDraggedElm.parentNode) {
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

    dragStartCallback(event) {
      this.currDraggedElm = event.target.cloneNode(true);
    },
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
  }
  /deep/.middle-wrap-content {
    flex: 1;
    padding: 10px;
    position: relative;
    overflow-y: auto;
    height: 100%;
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