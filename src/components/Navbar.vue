<template lang="html">
  <nav class="navbar">
    <img src="/logo-peq-contra.png" alt="Logo" class="img-responsive navbar__logo">
    <p class="nom--cuenta">
      <i class="far fa-fw fa-building"/>
      <span class="text">{{ cuenta.nombre }}</span>
    </p>
    <router-link :to="{ name: 'usuario' }" tag="div"
                 class="navbar__user" active-class="navbar__user--active">
      <p>
        <i class="far fa-fw fa-user-circle"/>
        <span class="text">{{ nombreUsuario }}</span>
      </p>
      <hr class="navbar__user__hr">
      <p class="navbar__user__version text--gris8 text--small
       text--right text--center text--italic">Versión: {{ version }}</p>
    </router-link>
    <directorio/>
  </nav>
</template>

<script>
import swal from "sweetalert2";
import pkg from "../../package.json";
import Menu from "./Menu.vue";
import tour from "./tour.js";

export default {
  name: "Navbar",
  components: {
    directorio: Menu,
  },
  data,
  computed: {
    nombreUsuario,
    version,
    usuario() { return this.$store.state.usuario.usuarioActivo; },
    cuenta() { return this.$store.state.cuenta.cuentaActiva; },
  },
  watch: {
    $route: route,
  },
  mounted,
  methods: {
    mostrarMenu() {
      this.$parent.$emit("mostrarMenu");
    },
  },
};

function data() {
  return {
    titulo: this.$router.currentRoute,
  };
}

function route(val) {
  this.titulo = val;
}

function nombreUsuario() {
  return `${this.usuario.nombre} ${this.usuario.apellidos || ""}`;
}

function version() {
  return pkg.version;
}

function mounted() {
  if (!this.usuario.tourVisto) {
    setTimeout(() => swal({ // para que no salga de un solo apenas inicia sesión
      title: "Bienvenido a Trakapp",
      html: "Vamos a guiarlo por algunas de las características más importantes que ofrece el" +
      "sistema. Si lo desea, puede omitir el tutorial por ahora y verlo después usando el botón" +
      "de ayuda en la esquina inferior derecha <i class='fa fa-fw fa-question-circle'></i>",
      imageUrl: "/static/icono.png",
      imageWidth: 175,
      imageHeight: 175,
      showCancelButton: true,
      confirmButtonText: "Ver tutorial",
      cancelButtonText: "Omitir",
    }).then((resp) => {
      this.usuario.tourVisto = true;
      if (resp && !resp.dismiss) {
        tour(this.$router, 0);
      }
      return this.$store.dispatch("usuario/guardar", {
        usuario: this.usuario, conservar: false, conservarActivo: true,
      });
    }), 2000);
  }
  return null;
}
</script>

<style lang="scss">
@import "../sass/tema/globales";
@import "../sass/base/colores";
@import "../sass/tema/colores";
@import "../sass/base/fondos";
@import "../sass/base/helpers";
@import "../sass/base/tipografia";

  .navbar {
    width: 100%;
  }

  .navbar__logo {
    padding: 1em 2em;
  }

  .navbar__user{
    @extend .text--blanco;
    padding: .25em 1em;
    user-select: none;
    cursor: pointer;
    transition: all ease .5s;

    &:hover{
      @extend .text--negro4;
      background: $cyan-tema;
    }
  }

  .navbar__user__hr{
    border: 0;
    border-top: 1px solid $azul-tema;
  }

  .nom--cuenta {
    background-color: white;
    color: black;
    padding: .25em 1em;
  }

  .navbar__user__version{
    user-select: none;
  }

  .navbar__user--active{
    @extend .text--blanco;
    background: transparentize($azul-tema, .2);
    cursor: default;
    pointer-events: none;

    &:hover{
      @extend .text--blanco;
      background: $fondo;
    }
  }
</style>
