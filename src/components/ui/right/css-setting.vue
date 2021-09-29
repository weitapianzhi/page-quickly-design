<template>
  <div class="css-seeting-wrap">
    <a-button ref="b" @click="handleShow">自定义样式表</a-button>
    <a-modal
      class="custom-css-modal"
      title="自定义样式表"
      v-model="showModal"
      okText="确定"
      cancelText="取消"
      @ok="handleOk"
    >
      <textarea @keydown="handleKeyDown" @keyup="handleKeyUp" v-model="modalCssData" placeholder="请输入css样式表内容，例如 .demo { color: red }"></textarea>
    </a-modal>
  </div>
</template>

<script>
import storeMixin from "@/mixins/core/storeMixin";
export default {
  name: 'css-setting',
  props: {},
  mixins: [
    storeMixin
  ],
  data() {
    return {
      showModal: false,
      modalCssData: ""
    }
  },
  methods: {
    handleShow() {
      this.showModal = true
      this.modalCssData = this.customCss
    },

    handleOk() {
      this.setCustomCss(this.modalCssData)
      this.showModal = false
    },

    handleKeyDown(e) {
      e.stopPropagation()
    },

    handleKeyUp(e) {
      e.stopPropagation()
    },
  }

}

</script>
<style lang="scss" scoped>
.css-seeting-wrap {
  display: flex;
  flex-direction: column;
  padding: 0 5px;
}
.custom-css-modal {
  /deep/.ant-modal {
    top: 20px;
  }
  .ant-modal-body {
    textarea {
      outline: none;
      width: 100%;
      border: 1px solid #c5bdbd;
      height: 400px;
    }
  }
}
</style>