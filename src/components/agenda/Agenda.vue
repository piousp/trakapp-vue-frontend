<template>
  <section>
    <full-calendar :events="tareas" :config="config" />
    <div class="backdrop" v-if="modalVisible">
      <div class="modal">
        <div class="modal__header">
          <div class="modal__header__titulo">
            <i class="fal fa-fw fa-calendar"></i>
            {{tarea.titulo || 'Nueva tarea'}}
          </div>
        </div>
        <div class="modal__body">
          <form>
            <div class="form__group">
              <label class="form__label">Título</label>
              <input class="form__input" v-model="tarea.titulo"/>
            </div>
            <div class="grid grid--padding">
              <div class="col-md-6 form__group">
                <label class="form__label">Desde</label>
                <input class="form__input" v-model="tarea.start"/>
              </div>
              <div class="col-md-6 form__group">
                <label class="form__label">Hasta</label>
                <input class="form__input" v-model="tarea.end"/>
              </div>
            </div>
            <div class="form__group">
              <label class="form__label">Asignar a</label>
              <select class="form__input" v-model="tarea.empleado">
                <option v-for="emp in empleados" :value="emp._id" :key="emp._id">{{emp.nombre}} {{emp.apellidos}}</option>
              </select>
            </div>
            <div class="form__group">
              <label class="form__label">Descripción</label>
              <textarea class="form__input" rows="3" v-model="tarea.descripcion"/>
            </div>
          </form>
        </div>
        <div class="modal__footer">
          <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
          <button type="button" class="boton boton--guardar" @click="guardarTarea(tarea)"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FullCalendar } from "vue-full-calendar";
import agendaApi from "./agendaApi";
import empleadoApi from "../empleados/empleadoApi";

function data() {
  return {
    tareas: [],
    modalVisible: false,           
    config: {
      locale: "es",
      timezone: "local",
      allDaySlot: false,
      select: this.abrirModal,
      eventClick: this.editarModal,
    },
    tarea: {},
    empleados: [],
  }
}

function editarModal(tarea) {
  this.tarea = {
    _id: tarea._id,
    titulo: tarea.titulo,
    start: tarea.start,
    end: tarea.end,
    empleado: tarea.empleado,
    descripcion: tarea.descripcion,
  };
  this.modalVisible = true;
}

function abrirModal(inicio, fin) {
  this.tarea = {
    start: inicio,
    end: fin,
  };
  this.modalVisible = true;
}

function cerrarModal() {
  this.tarea = {};
  this.modalVisible = false;
}

function guardarTarea(tarea) {
  const self = this;
  agendaApi.guardar(tarea).then((resp) => {
    const i = _.findIndex(self.tareas, {_id: tarea._id});
    if (i < 0) {
      tarea._id = resp._id;
      self.tareas.push(tarea);
    } else {
      self.tareas.splice(i, 1, tarea);
    }
    self.cerrarModal();
  });
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    const promesas = [
      agendaApi.listar(),
      empleadoApi.listar(),
    ];
    Promise.all(promesas).then(([tareas, empleados]) => {
      vm.tareas = tareas.docs;
      vm.empleados = empleados.docs;
    });
  });
}

export default {
  components: {
    FullCalendar,
  },
  data,
  methods: {
    abrirModal,
    cerrarModal,
    guardarTarea,
    editarModal,
  },
  beforeRouteEnter,
}
</script>

<style lang="scss">
@import "../../../node_modules/fullcalendar/dist/fullcalendar.css";
</style>
