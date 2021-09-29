<template>
  <div class="upt-wrap">
    <a-tabs default-active-key="1" @change="currentTabs" size="small">
      <a-tab-pane key="1" tab="基本属性" force-render>
        <base-style :currFocusElm="currFocusElm"></base-style>
      </a-tab-pane>
      <a-tab-pane key="2" tab="脚本编写" force-render>
        <css-setting></css-setting>
      </a-tab-pane>
      <a-tab-pane key="3" tab="接口测试" force-render>
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import baseStyle from "./base-style.vue";
import cssSetting from "./css-setting.vue";
export default {
  name: "updateView",
  components: {
    baseStyle,
    cssSetting
  },
  props: {
    currFocusElm: {}
  },
  data() {
    return {
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
</style>