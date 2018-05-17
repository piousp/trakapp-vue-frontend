<template>
  <div class="layout">
    <div class="layout__menu"
         tabindex="0"
         :class="{'layout__menu--active': estaMostrado}">
      <directorio/>
    </div>
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
  sockets: {
    recibirMensaje(mensaje) {
      this.$notify(mensaje.texto);
    },
  },
};
</script>

<style lang="scss">
  @import "../sass/base/colores";
  @import "../sass/base/helpers";
  @import "../sass/tema/globales";
  html, body{
    background: $gris-fondo;
  }

  .layout {
    height: 100%;
    background: $gris-fondo;
  }

  .layout__menu{
    background: $negro2;
    box-shadow: inset -1px 0 0 $negro;
    z-index: 3;
    position: fixed;
    height: 100%;
    top: 52px;
    display: none;
    width: 160px;
    outline:none;

    @media (min-width: $reflex-md ) {
      display: inherit;
      width: 200px;
    }
  }

  .layout__menu--active {
    display: inherit !important;
  }

  .layout__content{
    background-attachment: fixed;
    background-size: cover;
    @media (min-width: $reflex-md ) {
      padding-left: 200px;
      padding-top: 52px;
    }
  }

  .layout__padding {
    padding: 1em;
    @media (min-width: $reflex-md ) {
      padding: 1em 3em;
    }
  }
</style>
