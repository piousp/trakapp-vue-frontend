<template lang="html">
  <nav class="navbar">
    <div class="navbar__left">
      <i class="navbar__left__menu far fa-bars fa-2x" @click="mostrarMenu"/>
      <img class="navbar__left__logo" src="/static/icono.png">
    </div>
    <div class="navbar__right" v-if="nombreUsuario !== 'undefined'">
      <div class="navbar__right__elem">
        <i class="fa fa-fw" :class="titulo.meta.icono"/>
        <span class="text text--negro4">{{ titulo.meta.titulo }}</span>
      </div>
      <div class="navbar__right__botones navbar__right__elem"/>
      <popover name="default" class="popover">
        <div slot="face" class="navbar__popover">
          <i class="far fa-fw fa-user-circle"/>
          <span>{{ nombreUsuario }}</span>
          <i class="fas fa-fw fa-caret-down"/>
        </div>
        <div slot="content">
          <ul class="popover__list">
            <router-link class="popover__list__item" tag="li" :to="{ name: 'parametros' }">
              <i class="fal fa-fw fa-cog"/>
              <span>Configuración</span>
            </router-link>
            <li class="popover__list__item" @click="logout">
              <i class="fal fa-fw fa-sign-out"/>
              <span>Cerrar sesión</span>
            </li>
            <li class="popover__list__divider"/>
            <li class="text--small text--italic navbar__version">
              <i class="fal fa-fw fa-tags"/>
              <span>Versión: {{ version }}</span>
            </li>
          </ul>
        </div>
      </popover>
    </div>
  </nav>
</template>

<script>//
import popover from "vue-popover";
import pkg from "../../package.json";

export default {
  components: {
    popover,
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
    logout,
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

function logout() {
  this.$auth.logout();
  this.$router.push("/login");
}

function nombreUsuario() {
  const { usuario } = this.$auth;
  return `${usuario.nombre}`;
}

function version() {
  return pkg.version;
}

</script>

<style lang="scss">
  @import "../sass/base/colores";
  @import "../sass/tema/colores";
  @import "../sass/base/helpers";
  @import "../sass/tema/globales";
  $ancho-menu: 200px;
  $ancho-menu-movil: 160px;
  .navbar {
    background: $blanco;
    box-shadow: inset 0 -1px 0 $grisd;
    top: 0;
    left: 0;
    height: 52px;
    width: 100%;
    z-index: 5;

    @media (min-width: $reflex-md ) {
      position: fixed;
    }
  }
  .navbar__left {
    background: $negro2;
    display: block;
    height: 52px;
    width: 50px;
    padding: .7em 1em;
    float:left;

    @media (min-width: $reflex-md ) {
      width: $ancho-menu;
    }
  }

  .navbar__left__menu {
    color: $blanco;
    text-shadow: 0 1px 1px $sombra1;
    cursor: pointer;

    @media (min-width: $reflex-md ) {
      display: none;
    }
  }

  .navbar__left__logo {
    height: 32px;
    display: none;
    @media (min-width: $reflex-md ) {
      display: block;
    }
  }

  .navbar__right {
    text-align: center;
    color: $negro4;
    padding: 0 1em;
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: $reflex-md ) {
      text-align: left;
    }
  }

  .botones-pagina{
    text-align: center;
    position: fixed;
    width: 95%;
    height: 52px;
    padding-left: 50px;
    padding-top: 7px;
    top: 0;
    left: 0;
    z-index: 5;

    @media (min-width: $reflex-md ) {
      padding-left: $ancho-menu;
    }
  }

  .navbar__right__elem{
    position: relative;

    .boton {
      margin: 0 5px;
    }
  }

  .popover{
    position:inherit !important;
    z-index: 9;
  }

  .popover__container{
    position: absolute;
    right: -16px;
    top: 52px;
    width: 200px;
  }

  .navbar__menu__interno{
    padding: 0 .5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .navbar__popover {
    cursor: pointer;
    text-align: right;
  }
  .navbar__version {
    padding: 8px 16px;
  }
</style>
