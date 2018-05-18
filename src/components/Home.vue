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
  components: { Navbar },
  data,
  created,
  sockets: {
    recibirMensaje(msj) {
      this.$notify(`${msj.emisor.nombre} dice: `, msj.texto);
    },
  },
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
    height: 100%;
  }

  .layout__padding {
    padding: 1em;
    height: 100%;
    @media (min-width: $reflex-md ) {
      padding: 1em 3em;
    }
  }
</style>
