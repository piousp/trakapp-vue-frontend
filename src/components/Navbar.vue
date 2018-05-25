<template lang="html">
  <nav class="navbar">
    <img src="/static/logo-peq-contra.png" alt="Logo" class="img-responsive navbar__logo">
    <router-link :to="{ name: 'perfil' }" tag="div"
                 class="navbar__user" active-class="navbar__user--active">
      <p>
        <i class="far fa-fw fa-user-circle"/>
        <span class="text">{{ nombreUsuario }}</span>
      </p>
      <hr class="navbar__user__hr">
      <p class="navbar__user__version text--gris6 text text--small
       text--right text--center text--italic">Versión: {{ version }}</p>
    </router-link>
    <directorio/>
  </nav>
</template>

<script>//
import pkg from "../../package.json";
import Menu from "./Menu.vue";

export default {
  components: {
    directorio: Menu,
  },
  data,
  computed: {
    nombreUsuario,
    version,
  },
  watch: {
    $route: route,
  },
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
  const { usuario } = this.$auth;
  return `${usuario.nombre} ${usuario.apellidos}`;
}

function version() {
  return pkg.version;
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
    padding: 1em;
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

  .navbar__popover {
    cursor: pointer;
    text-align: right;
    line-height: 45px;
  }
  .navbar__version {
    padding: 8px 16px;
  }
</style>
