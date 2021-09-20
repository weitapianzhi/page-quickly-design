<template>
  <div>
    <a-form-model :model="form" >
      <a-form-model-item label="宽度" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input v-model="form.width" style="width: 120px" suffix="px"></a-input>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import nodeMove from "@/mixins/core/nodeMove";
export default {
  name: "baseStyle",
  props: {
    currFocusElm: {}
  },
  mixins: [nodeMove],
  watch: {
    currFocusElm: {
      deep: true,
      handler(elm) {
        //to do..
        const val = elm.getAttribute("x-token")
        const _node = this.utils.getParentInfoOfFeild(this.baseData, "$token", val)
        this.getStyleInfo(_node)
      }
    }
  },
  data() {
    return {
      form: {},
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
  },
  methods: {
    getStyleInfo(node) {
      console.log(node);
    }
  },
};
</script>
<style scoped>
</style>