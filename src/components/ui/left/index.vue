<template>
  <div class="l-wrap">
    <div class="component-wrap" v-if="!hide">
      <div class="component-title">
        <h3 class="title">组件</h3>
        <a-icon @click="handleHide" title="隐藏" class="icon-left" type="left" />
      </div>
      <div class="component">
        <a-button class="mt-10" @click="showModal = true">自定义组件</a-button>
        <div class="component-item">
          <span class="component-item-title" title="横向排序">横向排序</span>
          <div class="horizontal-wrap" v-dragged="{ dragStartCallback, dragCallback, dragendCallback }" style="display:flex; width: 100%; height: 100px; flex-direction: row">
            <span>横向排序</span>
          </div>
        </div>
        <div class="component-item">
          <span class="component-item-title" title="纵向排序">纵向排序</span>
          <div class="vertical-wrap" v-dragged="{ dragStartCallback, dragCallback, dragendCallback }" style="display:flex; width: 100%; height: 100px; flex-direction: column">
            <span style="height: 50px; line-height: 50px">纵向排序</span>
          </div>
        </div>
        <div class="component-item">
          <span class="component-item-title" title="按钮">按钮</span>
          <button class="x-btn-default" v-dragged="{ dragStartCallback, dragCallback, dragendCallback }"
            >button</button
          >
        </div>
        <div class="component-item">
          <span class="component-item-title" title="单选按钮">单选按钮</span>
          <a-radio v-dragged="{ dragStartCallback, dragCallback, dragendCallback }" value="radio">raido1</a-radio>
        </div>
      </div>
    </div>
    <div v-if="hide" class="simple-wrap">
      <a-icon @click="handleShow" title="显示" class="icon-right" type="right" />
    </div>
    <custom-component @modalClose="modalClose" :showModal="showModal"></custom-component>
  </div>
</template>

<script>
import customComponent from "./component/custom-component.vue";
export default {
  name: "leftLayout",
  components: {
    customComponent
  },
  data() {
    return {
      hide: false,
      showModal: true
    };
  },
  methods: {
    dragStartCallback(event) {
      this.$emit("dragStartCallback", event);
    },

    dragCallback(event) {
      this.$emit("dragCallback", event);
    },

    dragendCallback(event) {
      this.$emit("dragendCallback", event);
    },

    handleHide() {
      this.hide = true
    },

    handleShow() {
      this.hide = false
    },

    modalClose() {
      this.showModal = false
    }
  },
};
</script>
<style lang="scss" scoped>
.l-wrap {
  width: auto;
}
.component-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 200px;
  .component {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    padding: 0 10px;
    .component-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
      &:first-of-type {
        margin-top: 10px;
      }
      .component-item-title {
        width: 60px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: normal;
        white-space: nowrap;
        margin-right: 10px;
      }
      .horizontal-wrap {
        background: #eec8e9;
        justify-content: center;
        align-items: center;
      }
      .vertical-wrap {
        background: #eec8e9;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.component-title {
  padding: 5px 20px;
  box-shadow: 0px 3px 4px 0px rgb(231, 231, 231);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .title {
    color: #eec8e9;
    position:relative;
    padding-top: 5px;
    font-size: 1.2rem;
    margin-bottom: 0;
  }

  .icon-left {
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
}
.simple-wrap {
  display: flex;
  width: 30px;
  padding: 14px 20px 0 0px;
  .icon-right {
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>