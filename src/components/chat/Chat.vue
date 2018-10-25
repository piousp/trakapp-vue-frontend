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
  const params = {
    cargados: 0,
    cantidad: this.$refs.chat.limiteItems,
  };
  return this.$store.dispatch(this.$actions.listarMensajePublico, params);
}
</script>
