<template>
  <div class="l-wrap">
    <div class="component-wrap" v-if="!hide">
      <div class="component-title">
        <h3 class="title">组件</h3>
        <a-icon @click="handleHide" title="隐藏" class="icon-left" type="left" />
      </div>
      <div class="component">
        <a-button v-dragged="{ dragStartCallback, dragCallback, dragendCallback }"
          >button</a-button
        >
        <a-radio-group v-dragged="{ dragStartCallback, dragCallback, dragendCallback }">
          <a-radio value="radio">raido1</a-radio>
          <a-radio value="raido2">raido2</a-radio>
          <a-radio value="raido3">raido3</a-radio>
        </a-radio-group>
        <a-steps v-dragged="{ dragStartCallback, dragCallback, dragendCallback }" direction="vertical" :current="1">
          <a-step title="Finished" description="This is a description." />
          <a-step title="In Progress" description="This is a description." />
          <a-step title="Waiting" description="This is a description." />
        </a-steps>
      </div>
    </div>
    <div v-if="hide" class="simple-wrap">
      <a-icon @click="handleShow" title="显示" class="icon-right" type="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: "leftLayout",
  data() {
    return {
      hide: false
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
  justify-content: center;
  padding: 14px 10px 0 20px;
  .icon-right {
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>