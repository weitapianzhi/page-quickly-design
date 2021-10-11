<template>
  <div class="base-style-wrap">
    <a-form-model :model="form">
      <a-form-model-item label="宽度" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input :disabled="disabled" @change="(e) => styleChange('width', e)" v-model="form.width">
          <a-select :disabled="disabled" slot="addonAfter" v-model="unit.width">
            <a-select-option value="auto">
              auto
            </a-select-option>
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
            <a-select-option value="vw">
              vw
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="高度" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input :disabled="disabled" @change="(e) => styleChange('height', e)" v-model="form.height">
          <a-select :disabled="disabled" slot="addonAfter" v-model="unit.height">
            <a-select-option value="auto">
              auto
            </a-select-option>
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
            <a-select-option value="vh">
              vh
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-model-item>
        <a-form-model-item label="基础类名" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-model="form.className" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="新增类名" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-model="form.newClassName" :disabled="disabled" placeholder="新增类名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="删除类名" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-model="form.delClassName" :disabled="disabled" placeholder="删除类名"></a-input>
          <a-button :disabled="disabled" class="custom-css-btn" @click="handleShow">自定义样式表</a-button>
          <a-button :disabled="disabled" class="custom-css-btn" @click="classChange">保存类名</a-button>
        </a-form-model-item>
    </a-form-model>
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
  name: "baseStyle",
  props: {
    currFocusElm: {}
  },
  mixins: [ storeMixin ],
  watch: {
    baseData: {
      deep: true,
      handler(val) {
        this.form = {}
        this.currentNode = null
        this.disabled = true
      }
    },
    currFocusElm: {
      deep: true,
      handler(elm) {
        this.form = {}
        if(!elm.getAttribute || elm.getAttribute("class").indexOf("middle-wrap-content") > -1) {
          this.currentNode = null
          this.disabled = true
          return
        }
        this.disabled = false
        const val = elm.getAttribute("x-token")
        this.currentNode = this.utils.getParentInfoOfFeild(this.baseData, "$token", val)
        this.getStyleInfo(this.currentNode)
      }
    }
  },
  data() {
    return {
      form: {},
      disabled: true,
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
      showModal: false,
      currentNode: null,
      modalCssData: null,
      unit: {
        width: "px",
        height: "px"
      }
    };
  },
  methods: {
    //获取初始化样式信息
    getStyleInfo(node) {
      const _el = this.utils.getElementOfToken(node.$token)
      const obj = {}
      const regxUnit = /(px|%|vh)/g
      if(_el.style.width) {
        if(_el.style.width === "auto") {
          this.unit.width = "auto"
          obj.width = "auto"
        } else {
          this.unit.width = _el.style.width.match(regxUnit) ? _el.style.width.match(regxUnit)[0] : ""
          obj.width = _el.style.width.replace(this.unit.width,"")
        }
      } else {
        obj.width = _el.offsetWidth
        this.unit.width = "px"
      }

      if(_el.style.height) {
        if(_el.style.height === "auto") {
          this.unit.height = "auto"
          obj.height = "auto"
        } else {
          this.unit.height = _el.style.height.match(regxUnit) ? _el.style.height.match(regxUnit)[0] : ""
          obj.height = _el.style.height.replace(this.unit.height, "")
        }
      } else {
        obj.height = _el.offsetHeight
        this.unit.height = "px"
      }

      Object.keys(obj).map(key => {
        obj["old" + key] = obj[key]
      })

      obj.className = _el.className
      obj.newClassName = ""
      obj.delClassName = ""

      this.form = {
        ...obj
      }
    },

    //样式修改
    classChange(e, type) {
      let val = "";
      let _delClassName = this.form.delClassName.replace("active","").replace(/^\s*/,"").replace(/\s*$/g,"")
      val = this.form.className + " " + this.form.newClassName
      val = val.replaceAll(_delClassName, "").replace(/^\s*/,"").replace(/\s*$/g,"")
      this.currentNode.setAttr("2", {
        val
      })
      this.getStyleInfo(this.currentNode)
    },

    //样式修改
    styleChange(feild, event) {
      if(!this.currentNode) return
      let val = "";
      if(this.unit[feild] === undefined) {
        val = this.form[feild]
      } else if(this.unit[feild] === "auto") {
        val = "auto"
      } else {
        val = this.form[feild] + this.unit[feild]
      }
      this.currentNode.setAttr("1", {
        feild,
        val
      })
    },

    //展示样式编辑器
    handleShow() {
      this.showModal = true
      this.modalCssData = this.customCss
    },

    //保存样式表
    handleOk() {
      this.setCustomCss(this.modalCssData)
      this.showModal = false
      this.$message.success({
        content: "添加样式表成功"
      })
    },

    handleKeyDown(e) {
      e.stopPropagation()
    },

    handleKeyUp(e) {
      e.stopPropagation()
    },
  },
};
</script>
<style lang="scss" scoped>
.base-style-wrap {
  height: 100%;
  flex: 1;
  overflow-y:auto;
  /deep/.ant-form-item {
    margin-bottom: 10px;
  }
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
      height: 300px;
    }
  }
}
</style>