<template>
  <section>
    <full-calendar class="text" :events="cargarTareas" :config="config" ref="calendario"
                   @event-created="abrirModal"
                   @event-selected="abrirModal"/>
  </section>
</template>

<script>
import { FullCalendar } from "vue-full-calendar";
import cloneDeep from "lodash/cloneDeep";
import D from "debug";
import obtenerColor from "../comunes/colores.js";

const debug = D("ciris:Agenda.vue");

export default {
  name: "Agenda",
  components: {
    FullCalendar,
  },
  data,
  computed: {
    cuenta() {
      return this.$store.state.cuenta.cuentaActiva;
    },
    tareas() {
      return this.$store.state.tarea.tareas;
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
  const evt = cloneDeep(pevt);
  if (evt.view) delete evt.view;
  if (evt.resource) delete evt.resource;
  if (evt.source) delete evt.source;
  this.$store.commit(this.$actions.setTarea, evt);
  return this.$store.commit(this.$actions.showModal, {
    componentName: "modalTarea",
    params: {
      aceptar: this.guardarTarea,
      eliminar: this.eliminarTarea,
      grande: true,
    },
  });
}

function guardarTarea(tarea) {
  debug("Guardando tarea", tarea);
  const self = this;
  const tareaLimpia = limpiarParaGuardar(tarea);
  return this.$store.dispatch(this.$actions.guardarTarea, { tarea: tareaLimpia, conservar: true })
    .then((resp) => {
      debug("Tarea guardada. Refrescando calendario");
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
  if (tarea._id) {
    const self = this;
    return this.$store.dispatch(this.$actions.deleteIDTarea, {
      tarea, delLocal: true, deLista: true,
    })
      .then(() => self.$refs.calendario.fireMethod("removeEvents", tarea._id));
  }
  return this.$refs.calendario.fireMethod("removeEvents", tarea._id);
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
  const comp = this;
  return this.$store.dispatch(this.$actions.listarTareaXFecha, {
    fechaInicio: inicio.format(),
    fechaFin: fin.format(),
  })
    .then(() => {
      const clon = cloneDeep(comp.tareas);
      return cb(clon.docs.map(agregarCamposCalendario));
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
