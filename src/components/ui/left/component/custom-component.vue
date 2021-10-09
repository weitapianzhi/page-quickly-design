<template>
  <a-modal
    class="custom-component-modal"
    :visible="showModal"
    title="自定义组件"
    width="800px"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="取消"
    okText="确认"
  >
    <div>
      <a-tabs
        class="update-container"
        default-active-key="1"
        @change="currentTabs"
        size="small"
      >
        <a-tab-pane key="1" tab="导航栏" force-render>
          <div class="pane-wrap">
            <custom-component-header
              @save="saveNavigate"
              @addParentMenu="addNavigate"
              @addChildMenu="addChildNavigate"
              @delMenu="delNavigate"
            ></custom-component-header>
            <x-table ref="navTable" :height="200" :columns="navColumns" :data="navData"></x-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="表格" force-render>
          <div class="pane-wrap"></div>
          <!-- <x-table :columns="columns" :data="data"></x-table> -->
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script>
import customComponentHeader from "./custom-component-header.vue";
import xTable from "@/components/business/x-table.vue";
import xNavigate from "@/components/business/x-navigate.vue";
export default {
  name: "custom-component",
  components: {
    xTable,
    customComponentHeader,
    "x-navigate": xNavigate
  },
  props: {
    showModal: {
      tyoe: Boolean,
      default: false,
    },
  },
  mixins: [],
  computed: {},
  data() {
    return {
      currentTabs: "1",
      navColumns: [
        {
          title: "标题名称",
          dataIndex: "title",
          customRender: (text, record, index) => {
            return (<a-input size="small" v-model={record.title} style="width: 100px"></a-input>)
          },
          width: 170
        },
        {
          title: "key",
          dataIndex: "key",
          width: 100,
          customRender: (text, record, index) => {
            return (<a-input size="small" v-model={record.key}></a-input>)
          },
        },
        {
          title: "父key",
          dataIndex: "parentKey",
          width: 100,
          customRender: (text, record, index) => {
            return (<a-input size="small" v-model={record.parentKey}></a-input>)
          },
        },
        {
          title: "图标类型",
          dataIndex: "iconType",
          width: 100,
          customRender: (text, record, index) => {
            return (<a-input size="small" v-model={record.iconType}></a-input>)
          },
        },
        {
          title: "图标类名",
          dataIndex: "iconClassName",
          width: 100,
          customRender: (text, record, index) => {
            return (<a-input size="small" v-model={record.iconClassName}></a-input>)
          },
        },
        {
          title: "是否禁用",
          dataIndex: "disabled",
          width: 100,
          customRender: (text, record, index) => {
            let ischeck = text === "是" 
            return (<a-switch checked-children="是" un-checked-children="否" checked={ischeck} onChange={(val) => this.disableChange(record, val)}/>)
          },
        },
      ],
      navData: []
    };
  },
  methods: {
    handleOk() {
      //to do ....
    },

    handleCancel() {
      this.$emit("modalClose");
    },

    //保存自定义导航栏
    saveNavigate() {
      if(this.navData.length === 0 ) return
      this.$confirm({
        class: "modal-unicon",
        title: "效果图",
        width: "600px",
        okText: "确定",
        cancelText: "取消",
        icon: () => (<template></template>),
        content: () => (
          <x-navigate list={this.navData}></x-navigate>
        ),
        onOk: () => {
          setTimeout(() => {
            this.$confirm({
              title: "模版名称输入",
              width: "300px",
              okText: "确定",
              cancelText: "取消",
              icon: () => (<template></template>),
              content: () => (
                <a-input></a-input>
              ),
              onOk: () => {
                //to do
              }
            })
          },300)
        }
      })
    },

    //增加导航栏标题
    addNavigate() {
      const obj = {
        key: this.navData.length + 1,
        title: "",
        parentKey: "",
        iconClassName: "",
        iconType: "",
        disabled: "",
        children: []
      }
      this.navData.push(obj)
    },


    //增加导航栏子标题
    addChildNavigate() {
      const _currentRow = this.$refs.navTable.currentRow
      if(_currentRow) {
        const childKey = _currentRow.children.length + 1
        const obj = {
          key: _currentRow.key + "-" + childKey,
          title: "",
          parentKey: "",
          iconClassName: "",
          iconType: "",
          disabled: "",
          children: []
        }
        _currentRow.children.push(obj)
      } else {
        this.$message.warning({
          content: "请选择父级标签"
        })
      }
    },

    //删除指定的导航栏
    delNavigate() {
      console.log(this.navData);
    },

    //导航栏tab是否禁用选项改变回调
    disableChange(record,val) {
      record.disabled = val ? "是" : "否"
    },
  },
};
</script>
<style lang="scss" scoped>
.pane-wrap {
  display: flex;
  flex-direction: column;
  height: 400px;
}
.custom-component-modal {
  /deep/.ant-modal {
    top: 20px;
  }
}
</style>