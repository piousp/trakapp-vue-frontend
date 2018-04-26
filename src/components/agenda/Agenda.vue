<template>
  <section>
    <div class="grid">
      <div class="col-auto text--center" v-for="emp in empleados"
           :key="emp._id">
        <div class="boton boton--blanco boton--s" @click="$refs.modalempleado.abrirModal(emp)">
          <i :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
          <span class="text">{{ emp.nombre }}</span>
        </div>
      </div>
    </div>
    <modal-empleado ref="modalempleado"/>
    <full-calendar class="text" :events="cargarTareas" :config="config" ref="calendario"/>
    <div class="backdrop" v-if="modalVisible">
      <div class="modal modal--l">
        <div class="modal__header text--center">
          <div class="modal__header__titulo">
            <i class="fal fa-fw fa-calendar"/>
            {{ tarea.title || 'Nueva tarea' }}
          </div>
        </div>
        <div class="modal__body">
          <form>
            <div class="grid">
              <div class="col-6">
                <form-group>
                  <label class="form__label">Título</label>
                  <input class="form__input" v-model="tarea.title">
                </form-group>
                <div class="form-group">
                  <label class="form__label">Asignar a</label>
                  <select class="form__input" v-model="tarea.empleado">
                    <option v-for="emp in empleados" :value="emp._id" :key="emp._id">
                      {{ emp.nombre }} {{ emp.apellidos }}
                    </option>
                  </select>
                </div>
                <form-group>
                  <label class="form__label">Descripción</label>
                  <textarea class="form__input" rows="3" v-model="tarea.descripcion"/>
                </form-group>
                <div class="grid grid--bleed">
                  <div class="col-6">
                    <form-group>
                      <label class="form__label">Desde</label>
                      <p class="form__input">{{ tarea.start | fecha("LLL") }}</p>
                    </form-group>
                  </div>
                  <div class="col-6">
                    <form-group>
                      <label class="form__label">Hasta</label>
                      <p class="form__input">{{ tarea.end | fecha("LLL") }}</p>
                    </form-group>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <form-group>
                  <label class="form__label">Ubicación</label>
                  <gmap-autocomplete class="form__input"
                                     :options="{componentRestrictions: {country: 'cr'}}"
                                     @place_changed="buscarLugar"/>
                </form-group>

                <gmap-map
                  class="map-container"
                  ref="map"
                  :center="mapCenter"
                  :zoom="14"
                  map-type-id="terrain">
                  <gmap-marker
                    v-if="tarea.ubicacion && tarea.ubicacion.coordinates"
                    :draggable="true"
                    :position="{
                      lat: tarea.ubicacion.coordinates[1],
                      lng: tarea.ubicacion.coordinates[0]
                    }
                  "/>
                </gmap-map>
              </div>
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
import { FullCalendar } from "vue-full-calendar";
import D from "debug";
import obtenerColor from "./colores.js";
import agendaApi from "./agendaApi";
import empleadoApi from "../empleados/empleadoApi";
import ModalEmpleado from "./ModalEmpleado.vue";

const debug = D("ciris:Agenda.vue");

export default {
  components: {
    FullCalendar,
    "modal-empleado": ModalEmpleado,
  },
  data,
  methods: {
    abrirModal,
    abrirModalEmpleado,
    cerrarModal,
    guardarTarea,
    aceptarModal,
    editarModal,
    eliminarTarea,
    cargarTareas,
    obtenerColor,
    buscarLugar,
  },
  beforeRouteEnter,
};

function data() {
  return {
    modalVisible: false,
    lugar: null,
    config: {
      locale: "es",
      timezone: "local",
      allDaySlot: false,
      select: this.abrirModal,
      eventClick: this.editarModal,
      eventDrop: this.guardarTarea,
      eventResize: this.guardarTarea,
      buttonText: {
        month: "Mes",
        week: "Semana",
        day: "Día",
        today: "Hoy",
      },
    },
    mapCenter: { lat: 9.93, lng: -84.07 },
    tarea: {},
    empleados: [],
  };
}

function buscarLugar(lugar) {
  this.lugar = lugar;
  this.tarea.ubicacion = {
    type: "Point",
    coordinates: [lugar.geometry.location.lng(), lugar.geometry.location.lat()],
  };
  debug("Ubicación asignada a tarea", this.tarea);
  this.$refs.map.panTo({
    lat: this.tarea.ubicacion.coordinates[1],
    lng: this.tarea.ubicacion.coordinates[0],
  });
}

function abrirModalEmpleado(empleado) {
  this.empleadoModal = empleado;
}

function editarModal(tarea) {
  this.tarea = tarea;
  this.modalVisible = true;
}

function abrirModal(inicio, fin) {
  debug("Abriendo el modal de tareas");
  this.tarea = {
    start: inicio,
    end: fin,
    ubicacion: {},
  };
  this.modalVisible = true;
}

function cerrarModal() {
  this.tarea = {};
  this.modalVisible = false;
}

function aceptarModal(tarea) {
  const self = this;
  return self.guardarTarea(tarea).then(() => self.cerrarModal());
}

function guardarTarea(tarea) {
  debug("Guardando tarea", tarea);
  const self = this;
  return agendaApi.guardar(limpiarParaGuardar(tarea)).then((resp) => {
    debug("Respuesta de guardado de tarea", resp);
    if (tarea._id) {
      self.$refs.calendario.fireMethod("updateEvent", agregarCamposCalendario(tarea));
      return self.cerrarModal();
    }
    self.$refs.calendario.fireMethod("renderEvent", agregarCamposCalendario(resp));
    return tarea;
  });
}

function eliminarTarea(tarea) {
  const self = this;
  return agendaApi.eliminar(tarea._id).then(() => {
    self.$refs.calendario.fireMethod("removeEvents", tarea._id);
    return self.cerrarModal();
  });
}

function agregarCamposCalendario(tarea) {
  const colores = obtenerColor(tarea.empleado);
  tarea.id = tarea._id;
  tarea.color = colores.fondo;
  tarea.textColor = colores.texto;
  return tarea;
}

function limpiarParaGuardar(tarea) {
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
      return cb(resp.docs.map(agregarCamposCalendario));
    });
}

function beforeRouteEnter(to, from, next) {
  debug("beforeRouteEnter");
  next(vm => empleadoApi.listar().then((empleados) => {
    debug("Empleados", empleados);
    vm.empleados = empleados.docs;
    return null;
  }));
}
</script>

<style scoped lang="scss">
@import "../../../node_modules/fullcalendar/dist/fullcalendar.css";

.colorEmpleado{
  display: inline-block;
  height: 10px;
  width: 10px;
}

.map-container{
  height: 300px;
  width: 100%;
}
</style>
