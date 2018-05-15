<template>
  <div class="layout">
    <div class="layout__content">
      <navbar/>
      <div class="layout__padding">
        <router-view/>
        <vue-progress-bar/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import Navbar from "./Navbar.vue";

function data() {
  return {
    estaMostrado: false,
  };
}

function created() {
  this.$on("mostrarMenu", () => {
    this.estaMostrado = !this.estaMostrado;
  });
}

export default {
  name: "App",
  components: { directorio: Menu, Navbar },
  data,
  created,
};
</script>

<style lang="scss">
  @import "../sass/base/colores";
  @import "../sass/base/helpers";
  @import "../sass/tema/globales";
  html, body{
    background: url("/static/fondo.jpg");
    background-attachment: fixed;
    background-size: cover;
  }

  .layout {
    height: 100%;
  }

  .layout__content{
    padding-top: 90px;
  }

  .layout__padding {
    padding: 1em;
    @media (min-width: $reflex-md ) {
      padding: 1em 3em;
    }
  }
</style>
