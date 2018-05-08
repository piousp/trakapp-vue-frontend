<template>
  <section>
    <chat-individuo ref="chat" :privado="false"/>
  </section>
</template>

<script>
export default {
  mounted,
};
function mounted() {
  this.$refs.chat.cargarMensajes();
}
</script>
