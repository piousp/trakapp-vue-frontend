<template>
  <section>
    <full-calendar class="text" :events="cargarTareas" :config="config" />
    <div class="backdrop" v-if="modalVisible">
      <div class="modal">
        <div class="modal__header text--center">
          <div class="modal__header__titulo">
            <i class="fal fa-fw fa-calendar"/>
            {{ tarea.title || 'Nueva tarea' }}
          </div>
        </div>
        <div class="modal__body">
          <form>
            <div class="form__group">
              <label class="form__label">Título</label>
              <input class="form__input" v-model="tarea.title">
            </div>
            <div class="grid grid--padding">
              <div class="col-md-6 form__group">
                <label class="form__label">Desde</label>
                <input class="form__input" v-model="tarea.start">
              </div>
              <div class="col-md-6 form__group">
                <label class="form__label">Hasta</label>
                <input class="form__input" v-model="tarea.end">
              </div>
            </div>
            <div class="form__group">
              <label class="form__label">Asignar a</label>
              <select class="form__input" v-model="tarea.empleado">
                <option v-for="emp in empleados" :value="emp._id" :key="emp._id">
                  {{ emp.nombre }} {{ emp.apellidos }}
                </option>
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
          <button type="button" class="boton boton--guardar" @click="aceptarModal(tarea)"/>
          <button type="button"
                  class="boton boton--eliminar"
                  @click="eliminarTarea(tarea)"
                  v-show="tarea._id"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import reject from "lodash/reject";
import findIndex from "lodash/findIndex";
import { FullCalendar } from "vue-full-calendar";
import D from "debug";
import agendaApi from "./agendaApi";
import empleadoApi from "../empleados/empleadoApi";

const debug = D("ciris:Agenda.vue");

export default {
  components: {
    FullCalendar,
  },
  data,
  methods: {
    abrirModal,
    cerrarModal,
    guardarTarea,
    aceptarModal,
    editarModal,
    moverTarea,
    eliminarTarea,
    cargarTareas,
  },
  beforeRouteEnter,
};

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
      eventDrop: this.moverTarea,
      eventResize: this.moverTarea,
      eventColor: "#2196f3",
      buttonText: {
        month: "Mes",
        week: "Semana",
        day: "Día",
        today: "Hoy",
      },
    },
    tarea: {},
    empleados: [],
  };
}

function editarModal(tarea) {
  this.tarea = parsearTarea(tarea);
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

function moverTarea(tarea) {
  const tareaMod = parsearTarea(tarea);
  this.guardarTarea(tareaMod);
}

function aceptarModal(tarea) {
  const self = this;
  return self.guardarTarea(tarea).then(() => self.cerrarModal());
}

function guardarTarea(tarea) {
  debug("Guardando tarea");
  const self = this;
  return agendaApi.guardar(tarea).then((resp) => {
    debug("Respuesta de guardado de tarea", resp);
    const i = findIndex(self.tareas, { _id: tarea._id });
    if (i < 0) {
      tarea._id = resp._id;
      return self.tareas.push(tarea);
    }
    return self.tareas.splice(i, 1, tarea);
  });
}

function eliminarTarea(tarea) {
  const self = this;
  return agendaApi.eliminar(tarea._id).then(() => {
    self.tareas = reject(self.tareas, { _id: tarea._id });
    return self.cerrarModal();
  });
}

function parsearTarea(tarea) {
  return {
    _id: tarea._id,
    title: tarea.title,
    start: tarea.start,
    end: tarea.end,
    empleado: tarea.empleado,
    descripcion: tarea.descripcion,
  };
}

function cargarTareas(inicio, fin, tz, cb) {
  debug("cargarTareas");
  return agendaApi.listar(inicio.format(), fin.format())
    .then((resp) => {
      debug("cargarTareas resp", resp);
      return cb(resp.docs);
    });
}

function beforeRouteEnter(to, from, next) {
  debug("beforeRouteEnter");
  next(vm => empleadoApi.listar().then((empleados) => {
    vm.empleados = empleados.docs;
    return null;
  }));
}
</script>

<style lang="scss">
@import "../../../node_modules/fullcalendar/dist/fullcalendar.css";
</style>
