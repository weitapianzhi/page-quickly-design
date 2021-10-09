<template>
  <div>
    <xMenuItem :list="list"></xMenuItem>
  </div>
</template>

<script>
import xMenuItem from "@/components/assist/x-menu-item.jsx";
export default {
  name: "x-navigate",
  components: {
    xMenuItem
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>