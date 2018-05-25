<template lang="html">
  <div class="form__group" v-labelizador
       :class="{ 'form__group--error': error }">
    <slot/>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  directives: {
    labelizador,
  },
  props: {
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};

function labelizador(el) {
  const jel = $(el);
  setTimeout(() => {
    if (jel.children(".form__input").val()) {
      jel.children(".form__label").addClass("form__label--active");
    } else {
      jel.children(".form__label").removeClass("form__label--active");
    }
  }, 50);
}
</script>

<style lang="scss">
</style>
