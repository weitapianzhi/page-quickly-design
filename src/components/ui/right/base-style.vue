<template>
  <div>
    <a-form-model :model="form" >
      <a-form-model-item label="宽度" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input :disabled="disabled" @change="(e) => styleChange('width', 'px', e)" v-model="form.width" style="width: 120px" suffix="px"></a-input>
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
        //to do..
        if(elm.getAttribute("class").indexOf("middle-wrap-content") > -1) {
          this.currentNode = null
          this.form = {}
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
      disabled: false,
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
      currentNode: null
    };
  },
  methods: {
    getStyleInfo(node) {
      const _el = node.$el;
      const obj = {}
      if(_el.style.width) {
        obj.width = _el.style.width.replace("px", "")
      } else {
        obj.width = _el.offsetWidth
      }
      this.form = {
        ...obj
      }
    },
    styleChange(feild, extend, event) {
      if(!this.currentNode) return
      this.currentNode.$el.style[feild] = this.form[feild] + extend
      this.currentNode.$attr = {
        ...this.currentNode.$attr,
        ...this.currentNode.$el.attributes
      }

      console.log(this.baseData);
    }
  },
};
</script>
<style scoped>
</style>