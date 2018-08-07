<template>
  <div class="layout">
    <vue-progress-bar/>
    <div class="layout__nav">
      <navbar/>
      <lista-empleados/>
    </div>
    <div class="layout__content">
      <div class="layout__content__bar"/>
      <div class="layout__padding">
        <router-view/>
        <question-mark/>
      </div>
    </div>
  </div>
</template>

<script>
import D from "debug";
import Navbar from "./Navbar.vue";
import QuestionMark from "./acciones/QuestionMark.vue";

const debug = D("ciris:Home.vue");

function data() {
  return {
    estaMostrado: false,
  };
}

function created() {
  debug("Home created");
  this.$on("mostrarMenu", () => {
    this.estaMostrado = !this.estaMostrado;
  });
}

export default {
  name: "App",
  components: { Navbar, QuestionMark },
  data,
  created,
  sockets: {
    connect() {
      this.$socket.emit("sesionIniciada", this.$store.state.perfil.usuario);
    },
    recibirMensaje(msj) {
      this.$notify(`${msj.emisor.nombre} dice: `, msj.texto);
    },
    notificarTarea(tarea) {
      const titulo = `${tarea.empleado.nombre} ${tarea.empleado.apellidos} completó: `;
      this.$toastr("success", tarea.title, titulo);
      this.$notify(titulo, tarea.title);
    },
  },
};


</script>

<style lang="scss">
  @import "../sass/base/colores";
  @import "../sass/tema/colores";
  @import "../sass/base/helpers";
  @import "../sass/tema/globales";

  body{
    background: url("/static/hero2.jpg");
    background-attachment: fixed;
    background-size: cover;
  }

  .layout {
    display: flex;
  }

  .layout__nav,
  .layout__chat{
    @extend .sombra;
    background: transparentize($negro2, .3);
    width: 260px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .layout__content{
    min-height: 100vh;
    padding-top: 40px;
    flex-grow: 2;
    width: 100%;
    background: transparentize($blanco, .2);
    box-shadow: inset 2px 0 0 $negro2;
    position: relative;
  }

  .layout__content__bar{
    background: $blanco;
    box-shadow: inset 2px 0 0 $negro2;
    position: absolute;
    width: 100%;
    height: 40px;
    top: 0;
    left: 0;
  }

  .layout__padding {
    padding: 1em;
    height: 100%;
    @media (min-width: $reflex-md ) {
      padding: 1em 3em;
    }
  }

  .botones-pagina,
  .fc-header-toolbar
  {
    float: none;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 40px;
    top: 0;
    left: 0;
    z-index: 5;
    padding-top: 3px;
    pointer-events: none;
    * {
      pointer-events: auto;
    }
  }
</style>
