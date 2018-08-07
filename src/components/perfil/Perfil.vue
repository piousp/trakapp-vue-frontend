<template lang="html">
  <section>
    <h1 class="h1 inline"><strong class="text--bold">Datos</strong> de perfil</h1>
    <nav class="boton-group float--right" v-if="cuenta.empresarial">
      <router-link class="boton boton--indigo boton--s"
                   :to="{ name: 'usuario' }" tag="a">
        <i class="fal fa-fw fa-user"/>
        <span>Mi Usuario</span>
      </router-link>
      <router-link class="boton boton--indigo boton--s"
                   :to="{ name: 'cuenta' }" tag="a">
        <i class="fal fa-fw fa-id-badge"/>
        <span>Datos Cuenta</span>
      </router-link>
    </nav>
    <div class="clear-both"/>
    <router-view/>
  </section>
</template>

<script>

export default {
  computed: computed(),
};

function computed() {
  return {
    cuenta() {
      return this.$store.state.perfil.cuenta;
    },
  };
}
</script>

<style lang="scss">
</style>
