<template>
  <a-table
    :columns="columns"
    :dataSource="data"
    :scroll="{ x: 10, y: height }"
    :rowKey="record => record.key"
    :customRow="customRow ? customRow : defaultCustomRow"
    :rowClassName="rowClassName ? rowClassName : defaultRowClassName"
  ></a-table>
</template>

<script>
export default {
  name: 'xTable',
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    rowClassName: {
      type: Function,
      default: null
    },
    customRow: {
      type: Function,
      default: null
    },
    height: {
      type: [String,  Number],
      default: () => (null)
    }
  },
  mixins: [],
  computed: {},
  data() {
    return {
      currentRow: null
    }
  },
  methods: {
    defaultRowClassName(record, index) {
      if(this.currentRow && this.currentRow.key == record.key) {
        return "current--row"
      }
    },
    defaultCustomRow(record) {
        return {
          on: { // 事件
            click: () => {
              this.currentRow = record
            },
          }
        }
      }
  }

}

</script>
<style lang="scss" scoped>
/deep/.current--row {
  background: #bbe9ff;
}
</style>