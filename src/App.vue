<template>
  <div id="app">
    <vue-progress-bar/>
    <router-view v-if="authCargado"/>
    <app-modal v-if="authCargado"/>
  </div>
</template>
<script>
export default {
  name: "Perfil",
  computed: {
    authCargado() {
      return this.$store.state.storeApp.authCargado;
    },
  },
};
</script>
<style lang="scss">
@import "./sass/main";
@import "./sass/print/layout";
</style>
