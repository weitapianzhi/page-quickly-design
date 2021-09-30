<template>
  <div :class="['upt-wrap',hide ? 'width-70' : 'width-290']">
    <div class="update-title" v-if="!hide">
      <h3 class="title">控制区</h3>
      <a-icon @click="hide = true" title="隐藏" class="icon-right" type="right" />
    </div>
    <a-tabs class="update-container" default-active-key="1" @change="currentTabs" size="small" v-if="!hide">
      <a-tab-pane key="1" tab="基本属性" force-render>
        <base-style :currFocusElm="currFocusElm"></base-style>
      </a-tab-pane>
      <a-tab-pane key="2" tab="脚本编写" force-render>
        <js-setting :currFocusElm="currFocusElm"></js-setting>
      </a-tab-pane>
      <a-tab-pane key="3" tab="接口测试" force-render>
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
    <div v-if="hide" class="simple-wrap">
      <a-icon @click="hide = false" title="显示" class="icon-left" type="left" />
    </div>
  </div>
</template>

<script>
import baseStyle from "./base-style.vue";
import jsSetting from "./js-setting.vue";
export default {
  name: "updateView",
  components: {
    baseStyle,
    jsSetting
  },
  props: {
    currFocusElm: {},
  },
  data() {
    return {
      hide: false
    };
  },
  methods: {
    currentTabs(tab) {
      //to do..
    }
  },
};
</script>
<style lang="scss" scoped>
.upt-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.update-title {
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

  .icon-right {
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
}
.update-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  /deep/.ant-tabs-content-animated {
    flex: 1
  }
}
.simple-wrap {
  display: flex;
  justify-content: center;
  padding: 14px 10px 0 20px;
  .icon-left {
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
}
.width-290 {
  width: 290px;
}
.width-70 {
  width: 30px;
}
</style>