<template>
  <section>
    <full-calendar class="text" :events="cargarTareas" :config="config" ref="calendario"
                   @event-created="abrirModal"
                   @event-selected="abrirModal"/>
  </section>
</template>

<script>
import { FullCalendar } from "vue-full-calendar";
import clone from "lodash/clone";
import D from "debug";
import obtenerColor from "../comunes/colores.js";
import agendaApi from "./agendaApi";

const debug = D("ciris:Agenda.vue");

export default {
  name: "Agenda",
  components: {
    FullCalendar,
  },
  data,
  computed: {
    cuenta() {
      return this.$store.state.perfil.cuenta;
    },
  },
  watch: {
    cuenta() {
      this.$refs.calendario.fireMethod("refetchEvents");
    },
  },
  methods: {
    abrirModal,
    guardarTarea,
    aceptarTarea,
    eliminarTarea,
    cargarTareas,
    obtenerColor,
  },
};

function data() {
  return {
    config: {
      locale: "es",
      timezone: "local",
      allDaySlot: false,
      eventDrop: this.guardarTarea,
      eventResize: this.guardarTarea,
      buttonText: {
        month: "Mes",
        week: "Semana",
        day: "Día",
        today: "Hoy",
      },
    },
  };
}

function abrirModal(pevt) {
  const evt = clone(pevt);
  delete evt.view;
  delete evt.resource;
  delete evt.source;
  return this.$store.commit("modal/showModal", {
    componentName: "ModalTarea",
    params: {
      evt,
      aceptar: this.aceptarTarea,
      eliminar: this.eliminarTarea,
      grande: true,
    },
  });
}

function aceptarTarea(tarea) {
  const self = this;
  return self.guardarTarea(tarea);
}

function guardarTarea(tarea) {
  debug("Guardando tarea", tarea);
  const self = this;
  return agendaApi.guardar(limpiarParaGuardar(tarea)).then((resp) => {
    debug("Respuesta de guardado de tarea", resp);
    if (tarea._id) {
      return self.$refs.calendario.fireMethod("updateEvent", agregarCamposCalendario(tarea));
    }
    if (tarea.cliente) {
      resp.cliente = tarea.cliente;
    }
    return self.$refs.calendario.fireMethod("renderEvent", agregarCamposCalendario(resp));
  });
}

function eliminarTarea(tarea) {
  const self = this;
  return agendaApi.eliminar(tarea._id).then(() => self.$refs.calendario.fireMethod("removeEvents", tarea._id));
}

function agregarCamposCalendario(tarea) {
  const colores = obtenerColor(tarea.empleado._id || tarea.empleado);
  tarea.id = tarea._id;
  tarea.color = colores.fondo;
  tarea.textColor = colores.texto;
  tarea.className = tarea.activa === false ? "tarea--finalizada" : "";
  tarea.subtareas = tarea.subtareas.map((st) => {
    st.editando = false;
    return st;
  });
  debug("Tarea modificada para el calendario", tarea);
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
    ubicacion: tarea.ubicacion,
    cliente: tarea.cliente,
    subtareas: tarea.subtareas,
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

</script>

<style lang="scss">
@import "../../sass/base/colores";

.tarea--finalizada{
  text-decoration:line-through !important;
  text-decoration-color: $rojo-opaco !important;
}
</style>
