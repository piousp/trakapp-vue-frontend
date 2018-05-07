<template>
  <section>
    <div class="chat">
      <div class="chat__dialogo" ref="chat">
        <div class="text--center">
          <i v-show="cargando" class="fas fa-circle-notch fa-spin fa-2x text--gris6"/>
        </div>
        <div :class="{'text--right': msj.emisor._id === idEmisor}"
             v-for="msj in mensajes.docs" :key="msj._id">
          <div class="chat__dialogo__msj text"
               :class="{'chat__dialogo__msj--yo': msj.emisor._id === idEmisor}">
            <p v-show="msj.emisor._id !== idEmisor" class="text--blanco text--bold">
              {{ msj.emisor.nombre }}:
            </p>
            <p>{{ msj.texto }}</p>
          </div>
          <p class="text text--small chat__dialogo__hora">
            {{ msj.fechaEnvio | fecha('DD/MM/YYYY HH:mm') }}
          </p>
        </div>
      </div>
      <div class="chat__input">
        <textarea class="form__input" placeholder="Escriba un mensaje..."
                  v-model="mensaje.texto" @keyup.enter="enviar(mensaje.texto)"/>
      </div>
    </div>

  </section>
</template>

<script>
import chatApi from "./chatApi";

export default {
  data,
  mounted,
  methods: {
    enviar,
    iniciarPaginacion,
    arreglarScroll,
  },
  sockets: {
    recibirBroadcast,
  },
};

function data() {
  return {
    mensajes: [],
    mensaje: {},
    idEmisor: this.$auth.usuario._id,
    limiteItems: 20,
    cargando: false,
  };
}

function enviar(txt) {
  const msj = {
    texto: txt,
    emisor: this.idEmisor,
    modelo: "usuario",
  };
  return chatApi.guardar(msj).then((resp) => {
    this.$socket.emit("broadcastEnviado", resp);
    this.mensajes.docs.push(resp);
    this.mensajes.cant += 1;
    this.mensaje = {};
    this.arreglarScroll();
    return null;
  });
}

function recibirBroadcast(mensaje) {
  this.mensajes.docs.push(mensaje);
  this.mensajes.cant += 1;
  this.arreglarScroll();
}

function arreglarScroll() {
  this.$nextTick(() => {
    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
  });
}

function iniciarPaginacion() {
  this.$refs.chat.onscroll = () => {
    if (this.$refs.chat.scrollTop === 0 && this.mensajes.cant > this.mensajes.docs.length) {
      this.cargando = true;
      return chatApi
        .listarPublico(this.mensajes.docs.length, this.limiteItems)
        .then((msjs) => {
          const heightInicial = this.$refs.chat.scrollHeight;
          this.mensajes.docs = msjs.docs.concat(this.mensajes.docs);
          this.cargando = false;
          this.$nextTick(() => {
            this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight - heightInicial;
          });
          return msjs;
        });
    }
    return null;
  };
}

function mounted() {
  return chatApi
    .listarPublico(0, this.limiteItems)
    .then((msjs) => {
      this.mensajes = msjs;
      this.arreglarScroll();
      this.iniciarPaginacion();
      return msjs;
    });
}
</script>
<style lang="scss" src="../comunes/_chatEstilos.scss"></style>
