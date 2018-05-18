<template lang="html">
  <section>
    <h2 class="h2"><i class="fas fa-fw fa-warehouse-alt"/> Administración de la cuenta</h2>
    <div class="tabs">
      <router-link :to="{ name: 'cuenta-datos', params: {} }"
                   tag="div"
                   active-class="tabs__tab--active"
                   class="tabs__tab">
        <i class="fal fa-database"/>
        <span>Datos de la cuenta</span>
      </router-link>
      <div class="tabs__tab">
        <i class="fas fa-user-tie"/>
        <span>Usuarios administradores</span>
      </div>
      <div class="tabs__tab">
        <i class="fal fa-sliders-h"/>
        <span>Preferencias</span>
      </div>
    </div>
    <router-view/>
  </section>
</template>
<script>


export default {
  afterRouteEnter,
  data,
};

function data() {
  return {
    cuenta: {},
  };
}

function afterRouteEnter() {
  this.$router.push({ name: "datos-cuenta" });
}
</script>

<style lang="scss">
</style>
