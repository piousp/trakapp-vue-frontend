<template lang="html">
  <section>
    <h1 class="h1 inline"><strong class="text--bold">Datos</strong> de perfil</h1>
    <nav class="boton-group float--right" v-if="cuenta.empresarial">
      <router-link class="boton boton--indigo boton--s"
                   :to="{ name: 'usuario' }" tag="a">
        <i class="fal fa-fw fa-calendar"/>
        <span>Mi Usuario</span>
      </router-link>
      <router-link class="boton boton--indigo boton--s"
                   :to="{ name: 'cuenta' }" tag="a">
        <i class="fal fa-fw fa-tasks"/>
        <span>Datos Cuenta</span>
      </router-link>
    </nav>
    <div class="clear-both"/>
    <router-view/>
  </section>
</template>

<script>
import store from "../../config/store";

export default {
  beforeRouteEnter,
  computed: computed(),
};

function computed() {
  return {
    cuenta() {
      return this.$store.state.perfil.cuenta;
    },
  };
}

function beforeRouteEnter(to, from, next) {
  return store.dispatch("perfil/cargarDatos").then(() =>
    next(vm => vm.$router.replace({ name: "usuario" }))).catch(() => {
    this.$toastr("error", "Error al cargar sus datos", "Error");
  });
}
</script>

<style lang="scss">
</style>
