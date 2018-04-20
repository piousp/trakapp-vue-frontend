<template>
  <section>
    <div class="botones-pagina">
      <button
        type="button"
        class="boton boton--verde"
        @click="buscarUsuarios">
        <i class="far fa-fw fa-search"/>
        Usuarios
      </button>
    </div>
    <div class="chat" v-if="idReceptor">
      <div class="chat__dialogo">
        <div :class="{'chat__dialogo__msj--yo': msj.emisor === idEmisor}"
             v-for="msj in mensajes" :key="msj._id">
          <div class="chat__dialogo__msj text">
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

    <div class="backdrop" v-show="mostrarModal">
      <div class="modal">
        <div class="modal__header text--center">
          <span class="modal__header__cerrar" @click="cerrarModal"/>
          <div class="modal__header__titulo">
            <i class="fal fa-fw fa-user"/>Usuarios
          </div>
        </div>
        <div class="modal__body">
          <ul class="lista" v-for="emp in empleados" :key="emp._id">
            <li @click="cargarMensajes(emp._id)">
              <span>{{ emp.nombre }} {{ emp.apellidos }}</span>
              <i class="float--right far fa-fw fa-comment-alt"/>
            </li>
          </ul>
        </div>
        <div class="modal__footer">
          <button type="button" class="boton boton--cancelar" @click="mostrarModal = false"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import empleadoApi from "../empleados/empleadoApi";
import chatApi from "./chatApi";

function data() {
  return {
    empleados: [],
    mensajes: [],
    mensaje: {},
    mostrarModal: false,
    idEmisor: this.$auth.usuario._id,
    idReceptor: null,
  };
}

function enviar(txt) {
  const msj = {
    texto: txt,
    fechaEnvio: moment(),
    emisor: this.idEmisor,
    receptor: this.idReceptor,
  };
  return chatApi.guardar(msj).then((resp) => {
    this.$socket.emit("mensajeEnviado", resp);
    this.mensajes.push(resp);
    this.mensaje = {};
    return null;
  });
}

function buscarUsuarios() {
  this.mostrarModal = true;
}

function cargarMensajes(id) {
  this.$router.push({ name: "chat", params: { receptor: id } });
  this.idReceptor = id;
  this.cerrarModal();
  return chatApi.listar(this.idEmisor, id).then((msjs) => {
    this.mensajes = msjs.docs;
    return null;
  });
}

function cerrarModal() {
  this.mostrarModal = false;
}

function recibirMensaje(mensaje) {
  this.mensajes.push(mensaje);
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    const idReceptor = to.params.receptor;
    const promesas = [empleadoApi.listar()];
    if (idReceptor) {
      vm.idReceptor = idReceptor;
      promesas.push(chatApi.listar(vm.$auth.usuario._id, idReceptor));
    }
    return Promise.all(promesas).then(([empleados, mensajes]) => {
      vm.empleados = empleados.docs;
      vm.mensajes = mensajes ? mensajes.docs : [];
      return null;
    });
  });
}

export default {
  data,
  methods: {
    enviar,
    buscarUsuarios,
    cerrarModal,
    cargarMensajes,
  },
  sockets: {
    recibirMensaje,
  },
  beforeRouteEnter,
};
</script>
<style lang="scss">
@import "../../sass/base/colores";
.chat__input {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: $gris-fondo;
  padding-top: 1em;
}
.chat__dialogo {
  overflow-y: auto;
  padding-bottom: 2em;
}
.chat__dialogo__msj {
  min-width: 80px;
  background: $celeste;
  display: inline-block;
  min-width: 80px;
  padding: .5em;
  color: $blanco;
  border-radius: 5px;
}

.chat__dialogo__msj--yo {
  text-align: right;
}
</style>
