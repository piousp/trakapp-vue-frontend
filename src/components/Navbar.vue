<template lang="html">
  <nav class="navbar">
    <img src="/icono.png" alt="Logo" class="img-responsive navbar__logo">
    <p class="navbar__user__version text--gris6 text--extra-small
     text--right text--center text--italic">Versión: {{ version }}</p>
    <directorio/>
    <!--<p class="nom--cuenta">
      <i class="far fa-fw fa-building"/>
      <span class="text">{{ cuenta.nombre }}</span>
    </p>-->
    <router-link :to="{ name: 'usuario' }" tag="div"
                 class="navbar__user" active-class="navbar__user--active">
                 <i class="far fa-fw fa-user-circle"/>
                 <span class="text">{{ nombreUsuario }}</span>
    </router-link>

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
      return this.$store.dispatch(this.$actions.guardarUsuario, {
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
    display: flex;
    flex-direction: row;
  }

  .navbar__logo {
    padding: .75em 2em;
  }

  .navbar__user{
    color: $blanco;
    text-align: justify;
    padding: 0 1em;
    cursor: pointer;
    user-select: none;
    display: inline-block;

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
    padding: .25em 1em;
  }

  .navbar__user__version{
    user-select: none;
    position: fixed;
    bottom: 0;
  }

  .navbar__user--active{
    @extend .text--azul;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: $blanco;
    cursor: default;
    pointer-events: none;
    height: 54px;
    transform: translateY(10px);
  }
</style>
