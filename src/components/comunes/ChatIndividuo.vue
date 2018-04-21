<template lang="html">
  <section>
    <div class="chat">
      <div class="chat__dialogo" ref="dialogo">
        <div
          :class="{'text--right': msj.emisor === idEmisor}"
          v-for="msj in mensajes" :key="msj._id">
          <div class="chat__dialogo__msj text"
               :class="{'chat__dialogo__msj--yo': msj.emisor === idEmisor}">
            <p>{{ msj.texto }}</p>
          </div>
          <p class="text text--extra-small chat__dialogo__hora">
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
import D from "debug";
import moment from "moment";
import chatApi from "../chat/chatApi.js";

const debug = D("ciris:comunes/ChatIndividuo.vue");

export default {
  data,
  methods: {
    enviar,
    cargarMensajes,
  },
  sockets: {
    recibirMensaje,
  },
};

function data() {
  return {
    mensajes: [],
    mensaje: {},
    idEmisor: this.$auth.usuario._id,
    idReceptor: "",
  };
}

function enviar(txt) {
  const msj = {
    texto: txt,
    fechaEnvio: moment(),
    emisor: this.idEmisor,
    receptor: this.idReceptor,
  };
  debug("Enviando el texto", msj);
  return chatApi.guardar(msj).then((resp) => {
    debug("Mensaje guardado");
    this.$socket.emit("mensajeEnviado", resp);
    this.mensajes.push(resp);
    this.mensaje = {};
    return null;
  });
}

function cargarMensajes(id) {
  debug("Cargando los mensajes del chat");
  this.idReceptor = id;
  return chatApi.listar(this.idEmisor, this.idReceptor).then((msjs) => {
    this.mensajes = msjs.docs;
    this.$nextTick(() => {
      debug("$nextTick, haciendo scroll del elemento");
      this.$refs.dialogo.scrollTop = this.$refs.dialogo.scrollHeight;
    });
    return null;
  });
}

function recibirMensaje(mensaje) {
  this.mensajes.push(mensaje);
}
</script>

<style lang="scss">
@import "../../sass/base/colores";
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chat__input {
  width: 100%;
  background-color: $gris-fondo;
}
.chat__dialogo {
  overflow-y: auto;
  flex-grow: 2;
  height: 260px
}
.chat__dialogo__msj {
  min-width: 80px;
  background: $verde-vivo;
  display: inline-block;
  min-width: 80px;
  padding: .5em;
  color: $negro2;
  border-radius: 5px;
}

.chat__dialogo__msj--yo {
  background: $grisc;
}
</style>
