<template>
  <ul class="menu">
    <router-link :to="{ name: ruta.name }" tag="li"
                 v-for="ruta in rutas"
                 active-class="menu__item--active"
                 :key="ruta.meta.titulo"
                 v-if="ruta.meta ? !ruta.meta.esconder : true"
                 class="menu__item"
                 :id="ruta.name">
      <i :class="ruta.meta ? ruta.meta.icono : ''"/>
      <span>{{ ruta.meta.titulo }}</span>
    </router-link>
  </ul>
</template>
<script type="text/javascript">

export default {
  name: "Menu",
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
  width: 100%;
}

.menu__item{
  color: $blanco;
  text-align: justify;
  line-height: 64px;
  padding: 0 1em;
  cursor: pointer;
  user-select: none;
  display: inline-block;

  &:hover{
    @extend .text--negro4;
    background: $cyan-tema;
  }
}

.menu__item--active{
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
