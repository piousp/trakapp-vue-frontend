<template>
  <div class="layout">
    <vue-progress-bar/>
    <div class="layout__nav" v-simplebar>
      <navbar/>
      <lista-empleados/>
    </div>
    <div class="layout__content">
      <div class="layout__padding">
        <router-view/>
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
  @import "../sass/tema/colores";
  @import "../sass/base/helpers";
  @import "../sass/tema/globales";

  .layout {
    background: url("/static/hero2.jpg");
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
    display: flex;
  }

  .layout__nav,
  .layout__chat{
    @extend .sombra;
    background: transparentize($negro2, .3);
    height: 100%;
    width: 260px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .layout__content{
    height: 100%;
    padding-top: 40px;
    flex-grow: 2;
    width: 100%;
    background: transparentize($blanco, .2);
    box-shadow: inset 2px 0 0 $negro2;
    position: relative;
  }

  .layout__padding {
    padding: 1em;
    height: 100%;
    @media (min-width: $reflex-md ) {
      padding: 1em 3em;
    }
  }
</style>
