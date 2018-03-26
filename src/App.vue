<template>
  <div id="app">
    <vue-progress-bar/>
    <router-view/>
  </div>
</template>
<script src="./main.js"></script>
<style lang="scss">
@import "./sass/main";
@import "./sass/print/layout";
#app {
  display: inline;
}
</style>
