<template>
  <div class="l-wrap">
    <div class="component-wrap" v-if="!hide">
      <div class="component-title">
        <h3 class="title">组件</h3>
        <a-icon @click="handleHide" title="隐藏" class="icon-left" type="left" />
      </div>
      <div class="component">
        <span>基础组件</span>
        <div class="base-component">
          <div class="component-item" v-for="item in componentList" :key="item.key"  v-dragged="{ dragStartCallback, dragCallback, dragendCallback, $val: item }">
            <i :class="['iconfont',item.iconClassName]"></i>
            <span>{{item.description}}</span>
            <base-component class="base-component-wrap" :info="item"></base-component>
          </div>
        </div>
        <span>自定义组件</span>
        <a-button style="width: 180px; margin:10px auto" @click="showModal = true">自定义</a-button>
      </div>
    </div>
    <div v-if="hide" class="simple-wrap">
      <a-icon @click="handleShow" title="显示" class="icon-right" type="right" />
    </div>
    <custom-component @modalClose="modalClose" :showModal="showModal"></custom-component>
  </div>
</template>

<script>
import baseComponent from "./base-component.jsx";
import componentList from "./json/component.json";
import customComponent from "./component/custom-component.vue";
export default {
  name: "leftLayout",
  components: {
    customComponent,
    baseComponent
  },
  data() {
    return {
      hide: false,
      showModal: false,
      componentList: []
    };
  },
  created() {
    this.componentList = componentList
  },
  methods: {
    dragStartCallback(event, item) {
      this.$emit("dragStartCallback", event, item);
    },

    dragCallback(event) {
      this.$emit("dragCallback", event);
    },

    dragendCallback(event) {
      this.$emit("dragendCallback", event);
    },

    modalClose() {
      this.showModal = false
    },

    handleHide() {
      this.hide = true
    },

    handleShow() {
      this.hide = false
    },
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
    .base-component {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .component-item {
        padding: 10px 0px;
        display: flex;
        flex-direction: column;
        flex: 0 0 33%;
        align-items: center;
        .base-component-wrap {
          display: none !important
        }
        &:hover {
          background: rgb(124, 192, 255);
          color: white;
          cursor: pointer;
        }
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