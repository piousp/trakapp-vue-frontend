<template lang="html">
  <section>
    <div class="titulo-tareas">
      <h1 class="h1 inline"><strong class="text--bold">Agen</strong>da de Tareas</h1>
      <nav class="boton-group float--right">
        <router-link class="boton boton--indigo boton--s"
                     :to="{ name: 'agenda' }" tag="a">
          <i class="fal fa-fw fa-calendar"/>
          <span>Vista Agenda</span>
        </router-link>
        <router-link class="boton boton--indigo boton--s"
                     :to="{ name: 'tarealist' }" tag="a">
          <i class="fal fa-fw fa-tasks"/>
          <span>Vista Listado</span>
        </router-link>
      </nav>
      <div class="clear-both"/>
    </div>

    <br>
    <router-view/>
  </section>
</template>

<script>
export default {
  mounted,
};

function mounted() {
  this.$router.replace("agenda");
}
</script>

<style lang="scss">
.titulo-tareas {
  .h1{
    margin: 0;
  }
  .boton-group {
    margin-top: 1em;
  }
}
</style>
