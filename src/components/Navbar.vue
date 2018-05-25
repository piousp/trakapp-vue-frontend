<template lang="html">
  <nav class="navbar">
    <img src="/static/logo-peq-contra.png" alt="Logo" class="img-responsive navbar__logo">
    <directorio/>
    <popover name="default" class="popover">
      <div slot="face" class="navbar__popover">
        <i class="far fa-fw fa-user-circle"/>
        <span>{{ nombreUsuario }}</span>
        <i class="fas fa-fw fa-caret-down"/>
      </div>
      <div slot="content">
        <ul class="popover__list">
          <router-link class="popover__list__item" tag="li" :to="{ name: 'perfil' }">
            <i class="fal fa-fw fa-user-cog"/>
            <span>Mi Perfil</span>
          </router-link>
          <router-link class="popover__list__item" tag="li" :to="{ name: 'cuenta' }">
            <i class="fal fa-fw fa-warehouse-alt"/>
            <span>Configurar Cuenta</span>
          </router-link>
          <li class="popover__list__item" @click="logout">
            <i class="fal fa-fw fa-sign-out"/>
            <span>Cerrar sesión</span>
          </li>
          <li class="popover__list__divider"/>
          <li class="popover__list__item">
            <i class="fal fa-fw fa-tags"/>
            <span>Versión: {{ version }}</span>
          </li>
        </ul>
      </div>
    </popover>
  </nav>
</template>

<script>//
import popover from "vue-popover";
import Menu from "./Menu.vue";
import pkg from "../../package.json";

export default {
  components: {
    popover,
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
  .navbar {
    width: 100%;
  }

  .navbar__logo {
    padding: 1em 2em;
  }

  .botones-pagina,
  .fc-header-toolbar
  {
    background: $blanco;
    box-shadow: inset 2px 0 0 $negro2;
    float: none;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 40px;
    top: 0;
    left: 0;
    z-index: 5;
    padding-top: 3px;
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
