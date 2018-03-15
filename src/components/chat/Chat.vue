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
            <p class="text--small">
              <i class="fal fa-clock"/>&nbsp;<span>{{ msj.fechaEnvio | fecha('HH:mm') }}</span>
            </p>
          </div>
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
    msj._id = resp._id;
    this.mensajes.push(msj);
    this.mensaje = {};
  });
}

function buscarUsuarios() {
  this.mostrarModal = true;
}

function cargarMensajes(id) {
  this.$router.push({ name: "chat", params: { receptor: id } });
  this.idReceptor = id;
  chatApi.listar(this.idEmisor, id).then((msjs) => {
    this.mensajes = msjs.docs;
  });
  this.cerrarModal();
}

function cerrarModal() {
  this.mostrarModal = false;
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    const idReceptor = to.params.receptor;
    const promesas = [empleadoApi.listar()];
    if (idReceptor) {
      vm.idReceptor = idReceptor;
      promesas.push(chatApi.listar(vm.$auth.usuario._id, idReceptor));
    }
    Promise.all(promesas).then(([empleados, mensajes]) => {
      vm.empleados = empleados.docs;
      vm.mensajes = mensajes.docs;
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
  beforeRouteEnter,
};
</script>
<style lang="scss">
@import "../../sass/base/colores";
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
.chat__dialogo__msj {
  min-width: 80px;
  background: #fff;
  display: inline-block;
  min-width: 80px;
  padding: 1em;
  margin-bottom: 1em;
}
.chat__dialogo__msj--yo {
  text-align: right;
}
</style>
