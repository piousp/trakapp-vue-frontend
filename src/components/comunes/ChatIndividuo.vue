<template lang="html">
  <section>
    <div class="chat">
      <div class="chat__dialogo" ref="dialogo">
        <div class="text--center">
          <i v-show="cargando" class="fas fa-circle-notch fa-spin fa-2x text--gris6"/>
        </div>
        <div
          :class="{'text--right': msj.emisor === idEmisor}"
          v-for="msj in mensajes.docs" :key="msj._id">
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
                  v-model="mensaje.texto" @keyup.enter="enviar(mensaje.texto)"
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
  };
  if (isBlank(txt)) {
    return noop;
  }
  debug("Enviando el texto", isBlank(txt));
  return chatApi.guardar(msj).then((resp) => {
    debug("Mensaje guardado");
    this.$socket.emit("mensajeEnviado", resp);
    this.mensajes.docs.push(resp);
    this.mensajes.cant += 1;
    this.arreglarScroll();
    this.mensaje = {};
    return null;
  });
}

function cargarMensajes(id) {
  debug("Cargando los mensajes del chat");
  this.idReceptor = id;
  return chatApi.listar(this.idEmisor, this.idReceptor, 0, this.limiteItems).then((msjs) => {
    this.mensajes = msjs;
    this.arreglarScroll();
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
  this.mensajes.docs.push(mensaje);
  this.mensajes.cant += 1;
  this.arreglarScroll();
}

function mounted() {
  this.$refs.dialogo.onscroll = () => {
    if (this.$refs.dialogo.scrollTop === 0 && this.mensajes.cant > this.mensajes.docs.length) {
      this.cargando = true;
      return chatApi
        .listar(this.idEmisor, this.idReceptor, this.mensajes.docs.length, this.limiteItems)
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
