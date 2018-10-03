<template>
  <section class="full-height">
    <chat-individuo ref="chat" :privado="false"/>
  </section>
</template>

<script>
export default {
  name: "Chat",
  mounted,
};
function mounted() {
  this.$refs.chat.cargarMensajes();
}
</script>
