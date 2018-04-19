<template>
  <section>
    <div class="grid">
      <item class="col-auto text--center" v-for="emp in empleados"
            :key="emp._id">
        <span :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
        <span class="text">{{ emp.nombre }}</span>
      </item>
    </div>
    <full-calendar class="text" :events="cargarTareas" :config="config" ref="calendario"/>
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
import { FullCalendar } from "vue-full-calendar";
import D from "debug";
import obtenerColor from "./colores.js";
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
    obtenerColor,
  },
  beforeRouteEnter,
};

function data() {
  return {
    modalVisible: false,
    config: {
      locale: "es",
      timezone: "local",
      allDaySlot: false,
      select: this.abrirModal,
      eventClick: this.editarModal,
      eventDrop: this.moverTarea,
      eventResize: this.moverTarea,
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
  this.tarea = tarea;
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
  debug("Guardando tarea", tarea);
  const self = this;
  const colores = obtenerColor(tarea.empleado);
  return agendaApi.guardar(parsearTarea(tarea)).then((resp) => {
    debug("Respuesta de guardado de tarea", resp);
    if (tarea._id) {
      resp.color = colores.fondo;
      resp.textColor = colores.texto;
      self.$refs.calendario.fireMethod("updateEvent", tarea);
      return self.cerrarModal();
    }
    resp.color = colores.fondo;
    resp.textColor = colores.texto;
    self.$refs.calendario.fireMethod("renderEvent", resp);
    return tarea;
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
      return cb(resp.docs.map((tarea) => {
        const colores = obtenerColor(tarea.empleado);
        tarea.color = colores.fondo;
        tarea.textColor = colores.texto;
        return tarea;
      }));
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

.colorEmpleado{
  display: inline-block;
  height: 10px;
  width: 10px;
}
</style>
