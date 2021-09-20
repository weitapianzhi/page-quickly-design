<template>
  <div class="middle-wrap">
    <div class="middle-wrap-title">中间视图</div>
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
    };
  },
  methods: {
    //记录当前激活元素
    handleClick(e) {
      const _elm = document.querySelector(".middle-wrap-content .active");
      if (_elm) {
        if (typeof _elm.className === "object") {
          _elm.setAttribute("class", "");
        } else {
          _elm.className = _elm.className.replace(/\s+active/g, "");
          _elm.setAttribute("class", _elm.className);
        }
      }
      if (
        typeof e.target.className == "string" &&
        e.target.className.indexOf(".middle-wrap-content") > -1
      ) {
        this.$emit("setCurrFocusELm", {});
      } else {
        e.target.setAttribute(
          "class",
          e.target.getAttribute("class") + " active"
        );
        this.$emit("setCurrFocusELm", e.target);
      }
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

    dragStartCallback(event) {
      this.currDraggedElm = event.target.cloneNode(true);
    },
  },
};
</script>
<style lang="scss" scoped>
.middle-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  .middle-wrap-title {
    padding: 9px 0;
    box-shadow: 0px 3px 4px 0px rgb(231, 231, 231);
  }
  /deep/.middle-wrap-content {
    flex: 1;
    padding: 5px 0;
    overflow-y: auto;
    height: 100%;
    .active {
      background: rgba(87, 171, 228, 0.2);
    }
  }
}
</style>