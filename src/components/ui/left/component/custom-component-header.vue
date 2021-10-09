<template>
  <div class="cch-btn-wrap pb-5">
    <div class="cch-btn-l">
      <span class="mr-5">模板选择: </span>
      <a-select size="small" style="width: 100px"></a-select>
      <a-button class="ml-5" type="primary" size="small" @click="save">保存</a-button>
      <a-button class="ml-5" size="small">浏览效果</a-button>
    </div>
    <div class="cch-btn-r">
      <a-button size="small" type="primary" @click="addParentMenu">父级菜单增加</a-button>
      <a-button size="small" class="ml-5" @click="addChildMenu">子级菜单增加</a-button>
      <a-button size="small" class="ml-5" type="danger" @click="delMenu">菜单删除</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-component-header',
  props: {},
  data() {
    return {}
  },
  methods: {
    save() {
      this.$emit("save")
    },

    addParentMenu() {
      this.$emit("addParentMenu")
    },

    addChildMenu() {
      this.$emit("addChildMenu")
    },

    delMenu() {
      this.$emit("delMenu")
    }
  }

}

</script>
<style lang="scss" scoped>
.cch-btn-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .cch-btn-l {
    display: flex;
    flex-direction: row;
  }
  .cch-btn-r {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
  }
}
</style>