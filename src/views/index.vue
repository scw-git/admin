<template>
  <div class="index">
    <myHeader />
    <myBody />
  </div>
</template>

<script>
import myHeader from "@/views/header/index.vue";
import myBody from "@/views/body/index.vue";
export default {
  components: {
    myHeader,
    myBody
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
