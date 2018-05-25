<template lang="html">
  <section class="full-height">
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
            <p v-show="!privado" class="text--bold">{{ msj.emisor.nombre }}:</p>
            <p>{{ msj.texto }}</p>
          </div>
          <p class="text text--extra-small chat__dialogo__hora">
            {{ msj.fechaEnvio | fecha('DD/MM/YYYY HH:mm') }}
          </p>
        </div>
      </div>
      <div class="chat__input">
        <textarea class="form__input" placeholder="Escriba un mensaje..."
                  v-model="mensaje.texto" @keypress.enter="enviar(mensaje.texto)" ref="chatInput"
        />
      </div>
    </div>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";
import moment from "moment";
import chatApi from "../chat/chatApi.js";

const debug = D("ciris:comunes/ChatIndividuo.vue");

export default {
  props: {
    privado: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data,
  mounted,
  methods: {
    enviar,
    cargarMensajes,
    arreglarScroll,
    agregarMensaje,
    listar,
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
    emisor: this.$auth.usuario,
    modelo: "usuario",
    fechaEnvio: moment(),
  };
  if (this.privado) {
    msj.receptor = this.idReceptor;
  }
  if (isBlank(txt)) {
    return noop;
  }
  debug("Enviando el texto", isBlank(txt));
  this.agregarMensaje(msj, true);
  setTimeout(() => {
    this.$refs.chatInput.focus();
    this.mensaje = {};
  }, 10);
  return chatApi.guardar(msj).then((resp) => {
    debug("Mensaje guardado");
    this.$socket.emit(this.privado ? "mensajeEnviado" : "broadcastEnviado", resp);
    return null;
  });
}

function cargarMensajes(id) {
  debug("Cargando los mensajes del chat");
  this.idReceptor = id;
  return this.listar(0).then((msjs) => {
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

function agregarMensaje(mensaje) {
  this.mensajes.docs.push(mensaje);
  this.mensajes.cant += 1;
  this.arreglarScroll();
}

function listar(cargados) {
  if (this.privado) {
    return chatApi
      .listarPrivado(cargados, this.limiteItems, this.idEmisor, this.idReceptor);
  }
  return chatApi
    .listarPublico(cargados, this.limiteItems);
}

function mounted() {
  this.$socket.on(this.privado ? "recibirMensaje" : "recibirBroadcast", this.agregarMensaje);
  this.$refs.dialogo.onscroll = () => {
    if (this.$refs.dialogo.scrollTop === 0 && this.mensajes.cant > this.mensajes.docs.length) {
      this.cargando = true;
      return this.listar(this.mensajes.docs.length)
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

<style lang="scss">

@import "../../sass/base/colores";
@import "../../sass/tema/colores";
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chat__input {
  width: 100%;
  background: transparentize($fondo, .5);
  .form__input {
    color: $blanco;
  }
}
.chat__dialogo {
  overflow-y: auto;
  flex-grow: 2;
  height: 260px;
  padding: .6em;
}
.chat__dialogo__msj {
  position: relative;
  min-width: 80px;
  background: $grisc;
  display: inline-block;
  min-width: 80px;
  padding: .5em;
  color: $negro4;
  border-radius: 5px;

  &::after{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: $grisc;
    border-left: 0;
    border-top: 0;
    margin-top: -5px;
    margin-left: -10px;
  }
}

.chat__dialogo__msj--yo {
  background: $indigo;
  color: $grisc;

  &::after{
    content: "";
    position: absolute;
    right: 0;
    left:auto;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: $indigo;
    border-left: auto;
    border-right: 0;
    border-bottom: 0;
    margin-top: -5px;
    margin-right: -10px;
  }
}
</style>
