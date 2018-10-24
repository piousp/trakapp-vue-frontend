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

const debug = D("ciris:ChatIndividuo.vue");

export default {
  name: "ChatIndividuo",
  props: {
    privado: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data,
  computed: {
    mensajes() {
      return this.privado ?
        this.$store.state.mensaje.mensajesPrivados :
        this.$store.state.mensaje.mensajesPublicos;
    },
  },
  mounted,
  watch: {
    mensajes: {
      handler() {
        this.$nextTick(() => {
          if (this.$refs.dialogo) {
            this.$refs.dialogo.scrollTop = this.$refs.dialogo.scrollHeight;
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    enviar,
    arreglarScroll,
  },
};

function data() {
  return {
    mensaje: {},
    idEmisor: this.$store.state.usuario.usuarioActivo._id,
    idReceptor: this.$store.state.empleado.empleado._id,
    limiteItems: 20,
    cargando: false,
  };
}

function enviar(txt) {
  const txtTrim = txt ? txt.trim() : null;
  if (!txtTrim) {
    return noop;
  }
  const msj = {
    texto: txtTrim,
    emisor: this.idEmisor,
    modelo: "usuario",
    fechaEnvio: moment(),
  };
  if (this.privado) {
    msj.receptor = this.idReceptor;
  }
  debug("Enviando el texto", txtTrim);
  setTimeout(() => {
    this.$refs.chatInput.focus();
    this.mensaje = {};
  }, 10);
  debug({
    mensaje: msj, aListaPublica: !this.privado, aListaPrivada: this.privado,
  });
  return this.$store.dispatch(this.$actions.guardarMensaje, {
    mensaje: msj, conservar: true, aListaPublica: !this.privado, aListaPrivada: this.privado,
  })
    .then(() => {
      this.arreglarScroll();
      this.$socket.emit(
        this.privado ? "mensajeEnviado" : "broadcastEnviado",
        this.$store.state.mensaje.mensaje,
      );
      this.$store.commit(this.$actions.resetMensaje);
      return null;
    });
}

function arreglarScroll() {
  this.$nextTick(() => {
    debug("$nextTick, haciendo scroll del elemento");
    setTimeout(() => {
      if (this.$refs.dialogo) {
        this.$refs.dialogo.scrollTop = this.$refs.dialogo.scrollHeight;
      }
    }, 10);
  });
}

function mounted() {
  debug("mounted");
  if (this.privado) {
    return this.$socket.on("recibirMensaje", this.$actions.agregarAMensajesPrivados);
  }
  return this.$socket.on("recibirBroadcast", this.$actions.agregarAMensajesPublicos);
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
    padding-left: 6px;
    padding-right: 6px;
    &::placeholder {
      color: $grisd;
    }
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
  color: $blanco;

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
