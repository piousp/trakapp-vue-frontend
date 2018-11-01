<template lang="html">
  <div class="form__group" v-labelizador
       :class="{ 'form__group--error': error }">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
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
  setTimeout(() => {
    if (el.getElementsByClassName("form__input")[0].value) {
      return el.getElementsByClassName("form__label")[0].classList.add("form__label--active");
    }
    return el.getElementsByClassName("form__label")[0].classList.remove("form__label--active");
  }, 50);
}
</script>

<style lang="scss">
</style>
