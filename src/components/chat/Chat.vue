<template>
  <section>
    <div class="chat">
      <div class="chat__dialogo">
        <div v-for="msj in mensajes" :key="msj._id">
          <div class="chat__dialogo__mensaje text">
            <p>{{msj.texto}}</p>
            <p class="text--small">
              <i class="fal fa-clock"/>&nbsp;<span>{{msj.fecha | fecha('HH:mm')}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="chat__input">
        <textarea class="form__input" placeholder="Escriba un mensaje..." v-model="mensaje.texto" @keyup.enter="enviar(mensaje.texto)"/>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";

function data() {
  return {
    mensajes: [],
    mensaje: {},
  }
}

function enviar(txt) {
  this.mensajes.push({
    texto: txt,
    fecha: moment(),
  });
  this.mensaje = {}
}

export default {
  data,
  methods: {
    enviar,
  },
}
</script>
<style lang="scss">
.chat__input {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f0f4f4;
  padding-top: 1em;
}
.chat__dialogo {
  overflow-y: auto;
}
.chat__dialogo__mensaje {
  min-width: 80px;
  background: #fff;
  display: inline-block;
  min-width: 80px;
  padding: 1em;
  margin-bottom: 1em;  
}
</style>
