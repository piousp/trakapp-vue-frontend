<template>
  <ul class="menu">
    <li class="menu__item"
        v-for="(ruta, index) in rutas"
        :key="ruta.meta.titulo">
      <div class="menu__item__content"
           @click="accionar(ruta, index)"
           v-if="ruta.meta ? !ruta.meta.esconder : true">
        <i :class="ruta.meta ? ruta.meta.icono : ''"/>
        <span>{{ ruta.meta.titulo }}</span>
      </div>
      <div class="menu__hijos"
           :class="{'menu__hijos--active': ruta.name === estirado}"
           @blur="cerrar" :tabindex="index + 1">
        <h1 class="menu__hijos__title">{{ ruta.meta.titulo }}</h1>
        <ul>
          <li tag="li"
              class="menu__hijos__item"
              @click="accionar(hijo)"
              v-for="hijo in ruta.children"
              :key="hijo.meta.titulo"
              v-if="hijo.meta ? !hijo.meta.esconder : true">
            <i :class="hijo.meta ? hijo.meta.icono : ''"/>
            <span>{{ hijo.meta.titulo }}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script type="text/javascript">
export default {
  data,
  methods: {
    accionar,
    cerrar,
  },
};

function data() {
  return {
    rutas: this.$router.options.routes[0].children,
    estirado: "",
  };
}

function accionar(ruta, index) {
  if (!ruta.children) {
    this.$router.push({ name: ruta.name });
    this.estirado = "";
  } else {
    setTimeout(() => {
      document.getElementsByClassName("menu__hijos")[index].focus();
    }, 50);
    if (ruta.name === this.estirado) {
      this.estirado = "";
    } else {
      this.estirado = ruta.name;
    }
  }
}

function cerrar() {
  this.estirado = "";
}

</script>
<style lang="scss">
@import "../sass/tema/globales";
@import "../sass/base/colores";
@import "../sass/base/fondos";
@import "../sass/base/helpers";
@import "../sass/base/tipografia";
$ancho-menu: 200px;
$ancho-menu-movil: 160px;

.menu{
  outline:none;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu__item{
  @extend %sans;
  color: $blanco;
  cursor: pointer;
  font-size: .9em;

  &:hover{
    background: transparentize($magenta, .1);
  }

  &.router-link-active {
    @extend .text--blanco;
    background: transparentize($magenta, .5);
    cursor: default;
  }

  .menu__item__content {
    padding: 1em 0;
    font-size: 1em;
    padding-left: 17px;

    span {
      text-align: center;
    }

    @media (min-width: $reflex-md ) {
      visibility: visible;
    }
  }
}

.menu__hijos {
  border-right: 3px solid $magenta;
  cursor: default;
  display: none;
  height: 0;
  opacity: 0;
  transition: all .5s;
  z-index: 5;
  outline: none;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

.menu__hijos--active {
  background: $blanco;
  box-shadow: 3px 0 3px transparentize($gris6, .4);
  color: $negro4;
  display: block;
  height: 100%;
  left: $ancho-menu-movil;
  list-style: none;
  margin: 0;
  opacity: 1;
  padding: 0;
  position: fixed;
  top: 52px;
  width: 12em;

  @media (min-width: $reflex-md ) {
    left: $ancho-menu;
  }
}

.menu__hijos__title {
  @extend %sans;
  @extend .text--center;
  @extend .text--negro2;
  font-size: 1.3em;
}

.menu__hijos__item {
  @extend %sans;
  @extend .text--left;
  background: inherit;
  cursor: pointer;
  padding: .5em 1em;

  &:hover {
    background: transparentize($magenta, .8);
  }

  .fa {
    font-size: 1em;
  }

  span {
    display: inline;
  }
}

</style>
