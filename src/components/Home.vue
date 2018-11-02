<template>
  <div class="layout">
    <vue-progress-bar/>
    <navbar class="layout__nav"/>
    <div class="layout__content">
      <lista-empleados class="layout__chat"/>
      <!--<div class="layout__content__bar"/>-->
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
  name: "Home",
  components: { Navbar, QuestionMark },
  data,
  created,
  sockets: {
    connect() {
      this.$socket.emit("sesionIniciada", this.$store.state.usuario.usuarioActivo);
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
  }

  .layout {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .layout__nav{
    @extend .sombra;
    background: $negro2;
    width: 100%;
    height: 64px;
  }

  .layout__chat{
    box-shadow: inset -1px 0 0 $grisa,
    1px 0 2px transparentize($negro2, .6);
    background: $grisc;
    width: 260px;
    height: 100vh;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .layout__content{
    display: flex;
    min-height: 90vh;
    flex-grow: 2;
    width: 100%;
    background: $blanco;
    position: relative;
    flex-direction: row;
  }

  .layout__content__bar{
    @extend .sombra;
    background: $grise;
    position: absolute;
    width: 100%;
    height: 44px;
    top: 0;
    left: 0;
  }

  .layout__padding {
    padding: 1em;
    height: 100%;
    width: 100%;
    @media (min-width: $reflex-md ) {
      padding: 1em 3em;
    }
  }

  /*.botones-pagina,
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
  }*/
</style>
