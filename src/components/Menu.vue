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
<style lang="scss" scoped="scoped">
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
}

.menu__item{
  @extend .text--blanco;
  display: block;
  text-align: justify;
  line-height: 45px;
  padding: 0 1em;
  cursor: pointer;
  user-select: none;
  transition: all ease .5s;

  &:hover{
    @extend .text--negro4;
    background: $cyan-tema;
  }
}

.menu__item--active{
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
