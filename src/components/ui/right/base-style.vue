<template>
  <div>
    <a-form-model :model="form" >
      <a-form-model-item label="宽度" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input :disabled="disabled" @change="(e) => styleChange('width', e)" v-model="form.width" style="width: 120px">
          <a-select slot="addonAfter" v-model="unit.width">
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
        <a-input :disabled="disabled" @change="(e) => styleChange('height', e)" v-model="form.height" style="width: 120px">
          <a-select slot="addonAfter" v-model="unit.height">
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
    </a-form-model>
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
    currFocusElm: {
      deep: true,
      handler(elm) {
        this.form = {}
        console.log(elm);
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
      currentNode: null,
      unit: {
        width: "px",
        height: "px"
      }
    };
  },
  methods: {
    //获取初始化样式信息
    getStyleInfo(node) {
      const _el = node.$el;
      const obj = {}
      const regxUnit = /(px|%|vh)/g
      if(_el.style.width) {
        this.unit.width = _el.style.width.match(regxUnit)[0]
        obj.width = _el.style.width.replace(_el.style.width.match(regxUnit)[0],"")
      } else {
        obj.width = _el.offsetWidth
        this.unit.width = "px"
      }

      if(_el.style.height) {
        this.unit.height = _el.style.height.match(regxUnit)[0]
        obj.height = _el.style.height.replace(_el.style.height.match(regxUnit)[0], "")
      } else {
        obj.height = _el.offsetHeight
        this.unit.height = "px"
      }

      Object.keys(obj).map(key => {
        obj["old" + key] = obj[key]
      })

      this.form = {
        ...obj
      }
    },

    //样式修改
    styleChange(feild, event) {
      if(!this.currentNode) return
      let val = "";
      if(this.unit[feild] === undefined) {
        val = this.form[feild]
      } else {
        val = this.form[feild] + this.unit[feild]
      }
      this.currentNode.$el.style[feild] = val
      this.currentNode.$attr = {
        ...this.currentNode.$attr,
        ...this.currentNode.$el.attributes
      }
    }
  },
};
</script>
<style scoped>
</style>