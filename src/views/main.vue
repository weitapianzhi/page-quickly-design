<template>
  <div class="wrap">
    <left @dragStartCallback="dragStartCallback"></left>
    <section
      class="m-wrap">
      <middle-view ref="middleViewRef" @setCurrFocusELm="setCurrFocusELm"></middle-view>
    </section>
    <section class="r-wrap">
      <update-view ref="updateView"></update-view>
    </section>
  </div>
</template>

<script>
import left from "@/components/ui/left";
import updateView from "@/components/ui/right/update-view.vue";
import middleView from "@/components/ui/middle";
import { mapState } from "vuex";
export default {
  name: "Main",
  components: {
    left,
    updateView,
    middleView,
  },
  computed: {
    ...mapState("xNodeData",{
      "prev": state => state.prev,
      "next": state => state.next,
      "baseData": state => state.baseData 
    })
  },
  methods: {
    setCurrFocusELm(val) {
      this.$refs.updateView.setCurrFocusELm(val)
    },
    dragStartCallback(event, item) {
      this.$refs.middleViewRef.dragStartCallback(event, item)
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: row;
  .m-wrap {
    flex: 3 0 500px;
    min-width: 500px;
    background: rgb(235, 245, 189);
  }
  .r-wrap {
    overflow: hidden;
  }
}
</style>
