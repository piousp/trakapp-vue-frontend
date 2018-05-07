<template lang="html">
  <section>
    <div class="chat">
      <div class="chat__dialogo" ref="dialogo">
        <div class="text--center">
          <i v-show="cargando" class="fas fa-circle-notch fa-spin fa-2x text--gris6"/>
        </div>
        <div
          :class="{'text--right': msj.emisor._id === idEmisor}"
          v-for="msj in mensajes.docs" :key="msj._id">
          <div class="chat__dialogo__msj text"
               :class="{'chat__dialogo__msj--yo': msj.emisor._id === idEmisor}">
            <p>{{ msj.texto }}</p>
          </div>
          <p class="text text--extra-small chat__dialogo__hora">
            {{ msj.fechaEnvio | fecha('DD/MM/YYYY HH:mm') }}
          </p>
        </div>
      </div>
      <div class="chat__input">
        <textarea class="form__input" placeholder="Escriba un mensaje..." :disabled="cargando"
                  v-model="mensaje.texto" @keyup.enter="enviar(mensaje.texto)" ref="chatInput"
        />
      </div>
    </div>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";
import chatApi from "../chat/chatApi.js";

const debug = D("ciris:comunes/ChatIndividuo.vue");

export default {
  data,
  mounted,
  methods: {
    enviar,
    cargarMensajes,
    arreglarScroll,
    agregarMensaje,
  },
  sockets: {
    recibirMensaje,
  },
};

function data() {
  return {
    mensajes: { docs: [], cant: 0 },
    mensaje: {},
    idEmisor: this.$auth.usuario._id,
    idReceptor: "",
    limiteItems: 20,
    cargando: false,
  };
}

function isBlank(txt) {
  const str = txt.trim();
  return (!str || /^\s*$/.test(str));
}

function enviar(txt) {
  const msj = {
    texto: txt,
    emisor: this.idEmisor,
    receptor: this.idReceptor,
    modelo: "usuario",
  };
  if (isBlank(txt)) {
    return noop;
  }
  debug("Enviando el texto", isBlank(txt));
  this.cargando = true;
  return chatApi.guardar(msj).then((resp) => {
    debug("Mensaje guardado");
    this.$socket.emit("mensajeEnviado", resp);
    this.agregarMensaje();
    this.mensaje = {};
    this.cargando = false;
    setTimeout(() => {
      this.$refs.chatInput.focus();
    }, 10);
    return null;
  });
}

function cargarMensajes(id) {
  debug("Cargando los mensajes del chat");
  this.idReceptor = id;
  return chatApi.listarPrivado(this.idEmisor, this.idReceptor, 0, this.limiteItems).then((msjs) => {
    this.mensajes = msjs;
    this.arreglarScroll();
    this.$refs.chatInput.focus();
    return null;
  });
}

function arreglarScroll() {
  this.$nextTick(() => {
    debug("$nextTick, haciendo scroll del elemento");
    this.$refs.dialogo.scrollTop = this.$refs.dialogo.scrollHeight;
  });
}

function recibirMensaje(mensaje) {
  this.agregarMensaje(mensaje);
}

function agregarMensaje(mensaje) {
  this.mensajes.docs.push(mensaje);
  this.mensajes.cant += 1;
  this.arreglarScroll();
}

function mounted() {
  this.$refs.dialogo.onscroll = () => {
    if (this.$refs.dialogo.scrollTop === 0 && this.mensajes.cant > this.mensajes.docs.length) {
      this.cargando = true;
      return chatApi
        .listarPrivado(this.idEmisor, this.idReceptor, this.mensajes.docs.length, this.limiteItems)
        .then((msjs) => {
          const heightInicial = this.$refs.dialogo.scrollHeight;
          this.mensajes.docs = msjs.docs.concat(this.mensajes.docs);
          this.cargando = false;
          this.$nextTick(() => {
            this.$refs.dialogo.scrollTop = this.$refs.dialogo.scrollHeight - heightInicial;
          });
          return msjs;
        });
    }
    return null;
  };
}
</script>

<style lang="scss" src="./_chatEstilos.scss"></style>
