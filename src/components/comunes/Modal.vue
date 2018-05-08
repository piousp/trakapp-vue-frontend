<template lang="html">
  <div class="backdrop" v-if="visible">
    <div class="modal">
      <slot/>
    </div>

  </div>
</template>

<script>

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss">
</style>
