<template>
  <div class="wrap">
    <left @dragStartCallback="dragStartCallback"></left>
    <section
      class="m-wrap">
      <middle-view ref="middleViewRef" @setCurrFocusELm="setCurrFocusELm"></middle-view>
    </section>
    <section class="r-wrap">
      <update-view :currFocusElm="currFocusElm"></update-view>
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
    middleView
  },
  data() {
    return {
      currFocusElm: {}
    }
  },
  computed: {
    ...mapState("storageData",{
      "prev": state => state.prev,
      "next": state => state.next,
      "baseData": state => state.baseData 
    })
  },
  mounted() {
    this.initView();
  },
  methods: {
    setCurrFocusELm(val) {
      this.currFocusElm = val
    },

    initView() {
      //to do.
      if (this.baseData && !this.utils.isEmpty(this.baseData)) {
        if (this.baseData.$el.className.indexOf("middle-wrap-content") > -1) {
          document
            .querySelector("#app .wrap .middle-wrap")
            .replaceChild(this.baseData.$el, document.querySelector(".middle-wrap-content"));
        }
      }
    },
    dragStartCallback(event) {
      this.$refs.middleViewRef.dragStartCallback(event)
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
    padding: 5px;
  }
  .r-wrap {
    width: 200px;
    overflow: hidden;
  }
}
</style>
