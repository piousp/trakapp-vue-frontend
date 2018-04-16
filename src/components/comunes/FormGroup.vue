<template lang="html">
  <div class="form__group"
       :class="{ 'form__group--error': error }">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
</style>
