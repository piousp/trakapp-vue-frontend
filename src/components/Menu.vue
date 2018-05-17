<template>
  <ul class="menu">
    <router-link :to="{ name: ruta.name }" tag="li"
                 v-for="ruta in rutas"
                 active-class="menu__item--active"
                 :key="ruta.meta.titulo"
                 v-if="ruta.meta ? !ruta.meta.esconder : true"
                 class="menu__item">
      <i :class="ruta.meta ? ruta.meta.icono : ''"/>
      <span>{{ ruta.meta.titulo }}</span>
    </router-link>
  </ul>
</template>
<script type="text/javascript">
export default {
  data,
};

function data() {
  return {
    rutas: this.$router.options.routes[0].children,
  };
}


</script>
<style lang="scss">
@import "../sass/tema/globales";
@import "../sass/base/colores";
@import "../sass/tema/colores";
@import "../sass/base/fondos";
@import "../sass/base/helpers";
@import "../sass/base/tipografia";

.menu{
  @extend %sans;
  outline:none;
  list-style: none;
  display: flex;
}

.menu__item{
  display: block;
  text-align: center;
  line-height: 45px;
  padding: 0 1em;
  cursor: pointer;
  transition: all ease .5s;

  &:hover{
    @extend .text--blanco;
    background: $cyan-vivo;
  }
}

.menu__item--active{
  @extend .text--blanco;
  background: $fondo;
  cursor: default;

  &:hover{
    @extend .text--blanco;
    background: $fondo;
  }
}

</style>
