<template lang="html">
  <section>
    <ul>
      <router-link :to="{ name: 'botones', params: {} }">Botones</router-link>
      <router-link :to="{ name: 'tema', params: {} }">Tema</router-link>
      <router-link :to="{ name: 'forms', params: {} }">Forms</router-link>
      <router-link :to="{ name: 'tablas', params: {} }">Tablas</router-link>
      <router-link :to="{ name: 'colores', params: {} }">Colores</router-link>
      <router-link :to="{ name: 'checks', params: {} }">Checks</router-link>
      <router-link :to="{ name: 'tipografía', params: {} }">Tipografías</router-link>
      <router-link :to="{ name: 'notificaciones', params: {} }">Alertas</router-link>
    </ul>
    <router-view/>
  </section>
</template>
<style lang="scss">
code {
  text-align: left;
}
</style>
