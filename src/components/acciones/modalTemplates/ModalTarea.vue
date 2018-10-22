<template>
  <section>
    <div class="modal__header text--center">
      <div class="modal__header__titulo">
        <i class="fal fa-fw fa-calendar"/>
        {{ copia.title || 'Nueva tarea' }}
        <span class="text--italic text--gris8" v-if="copia.activa === false">Finalizada</span>
      </div>
    </div>
    <form ref="form" novalidate>
      <div class="modal__body">
        <div class="grid">
          <div class="col-6">
            <form-group id="title" :error="errors.has('title') && submitted">
              <input class="form__input"
                     name="title"
                     v-model="copia.title"
                     :disabled="copia.activa === false"
                     required
                     v-validate="'required'">
              <label class="form__label">Título</label>
            </form-group>
            <form-group>
              <label class="form__label">Cliente dueño</label>
              <multiselect
                v-model="copia.cliente"
                :options="clientes.docs"
                :disabled="copia.activa === false"
                label="nombreCompleto"
                placeholder="Buscar por nombre..."
                @search-change="buscarClientes"
              />
            </form-group>
            <form-group id="asignar-tarea" :error="errors.has('empleado') && submitted">
              <select class="form__input"
                      name="empleado"
                      v-model="copia.empleado"
                      required
                      :disabled="copia.activa === false"
                      v-validate="'required'">
                <option v-for="emp in empleados.docs" :value="emp" :key="emp._id">
                  {{ emp.nombre }} {{ emp.apellidos }}
                </option>
              </select>
              <label class="form__label">Asignar a</label>
            </form-group>
            <form-group>
              <textarea class="form__input" rows="3"
                        v-model="copia.descripcion"
                        :disabled="copia.activa === false"/>
              <label class="form__label">Descripción</label>
            </form-group>
            <div class="grid grid--bleed" id="fecha-tarea">
              <div class="col-6">
                <form-group id="fecha-desde" :error="errors.has('fecha-desde') && submitted">
                  <label class="form__label form__label--required">Desde</label>
                  <datetime
                    v-if="copia.activa"
                    v-model="copia.start"
                    v-validate="'required'"
                    :disabled="copia.activa === false"
                    :minute-step="15"
                    :use12-hour="true"
                    input-class="form__input"
                    name="fecha-desde"
                    type="datetime"/>
                  <p v-else class="form__input">
                    {{ copia.start | fecha("DD MMM YYYY hh:mm a") }}
                  </p>
                </form-group>
              </div>
              <div class="col-6">
                <form-group id="fecha-hasta" :error="errors.has('fecha-hasta')">
                  <label class="form__label form__label--required">Hasta</label>
                  <datetime
                    v-if="copia.activa"
                    v-model="copia.end"
                    v-validate="{rules: {is: copia.start > copia.end, required: true}}"
                    :disabled="copia.activa === false"
                    :minute-step="15"
                    :use12-hour="true"
                    input-class="form__input"
                    name="fecha-hasta"
                    type="datetime"/>
                  <p v-else class="form__input">
                    {{ copia.end | fecha("DD MMM YYYY hh:mm a") }}
                  </p>
                  <p class="form__error-message text--small" v-show="errors.has('fecha-hasta')">
                    Debe ser mayor que 'Desde'
                  </p>
                </form-group>
              </div>
            </div>
            <div class="grid" v-if="!isEmpty(copia.post)">
              <div class="col-md-6 form__group">
                <label class="form__label">Firma</label><br>
                <img :src="`data:image/svg+xml;base64,${copia.post.firma}`" height="100px">
              </div>
              <div class="col-md-6 form__group">
                <label class="form__label">Apuntes</label>
                <p class="text text--gris8">{{ copia.post.apuntes }}</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <form-group id="ubicacion-tarea">
              <gmap-autocomplete class="form__input" ref="gmapAutocomplete"
                                 :disabled="copia.activa === false"
                                 required
                                 :options="{componentRestrictions: {country: 'cr'}}"
                                 @place_changed="buscarLugar"
                                 placeholder=""/>
              <label class="form__label form__label--required">Ubicación</label>
            </form-group>
            <gmap-map
              class="mapa-agenda"
              ref="map"
              :center="mapCenter"
              :zoom="14"
              :options="{ disableDefaultUI : true }"
              map-type-id="terrain">
              <gmap-marker
                v-if="copia.ubicacion && copia.ubicacion.coordinates"
                :draggable="copia.activa !== false"
                :position="{
                  lat: copia.ubicacion.coordinates[1],
                  lng: copia.ubicacion.coordinates[0]
                }
              "/>
            </gmap-map>
          </div>
        </div>
        <div class="col-12 text">
          <Subtareas :lista="copia.subtareas"/>
        </div>
      </div>
      <div class="modal__footer">
        <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
        <button type="button" class="boton boton--guardar" @click="verificarYAceptar(copia)"/>
        <button type="button"
                class="boton boton--eliminar"
                @click="eliminarTarea(copia)"
                v-show="copia._id"/>
      </div>
    </form>
  </section>
</template>

<script>
import moment from "moment";
import some from "lodash/some";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import D from "debug";
import Subtareas from "../../agenda/Subtareas.vue";

const debug = D("ciris:ModalTarea.vue");

export default {
  name: "ModalTarea",
  components: {
    Subtareas,
  },
  data,
  props: ["params"],
  computed: {
    empleados() {
      return this.$store.state.storeEmpleado.empleados;
    },
    tarea() {
      return this.$store.state.storeTarea.tarea;
    },
    clientes() {
      return this.$store.state.storeCliente.clientes;
    },
  },
  created() {
    if (this.copia._id) {
      return this.editarModal(this.copia);
    }
    return this.abrirModal(this.copia);
  },
  watch: {
    tarea: {
      handler(newV) {
        this.copia = cloneDeep(newV);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    eliminarTarea,
    buscarLugar,
    abrirModal,
    cerrarModal,
    editarModal,
    buscarClientes: debounce(buscarClientesDebounce, 500),
    verificarYAceptar,
    isEmpty,
    crearSubtarea,
  },
};

function data() {
  return {
    copia: { subtareas: [] },
    mapCenter: { lat: 9.93, lng: -84.07 },
    submitted: false,
    mostrarSubtareas: true,
  };
}

function eliminarTarea(ptarea) {
  debug("eliminarTarea");
  this.$store.commit("storeModal/hideModal");
  this.$store.commit("storeTarea/resetTarea");
  if (this.params.eliminar) this.params.eliminar(ptarea);
}

function verificarYAceptar(tarea) {
  debug("verificarYAceptar");
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido && tarea.ubicacion.coordinates) {
      this.$store.commit("storeModal/hideModal");
      this.$store.commit("storeTarea/resetTarea");
      if (this.params.aceptar) this.params.aceptar(tarea);
      return tarea;
    } else if (!valido) {
      this.$toastr("error", "Falta información por llenar", "Campos vacios");
    } else if (!tarea.ubicacion.coordinates) {
      this.$toastr("error", "La tarea tiene que tener una ubicación", "Campos vacios");
    }
    return null;
  });
}

function abrirModal(evt) {
  debug("abrirModal");
  const tarea = {
    start: evt.start,
    end: evt.end,
    ubicacion: {},
    post: {},
    activa: true,
    subtareas: [],
  };
  this.copia = formatearFechas(tarea);
}

function cerrarModal() {
  debug("cerrarModal");
  this.submitted = false;
  this.$store.commit("storeTarea/resetTarea");
  this.$refs.gmapAutocomplete.$el.value = null;
  this.clienteBuscado = null;
  this.$store.commit("storeModal/hideModal");
}

function editarModal(ptarea) {
  debug("editarModal");
  const tarea = cloneDeep(ptarea);
  if (tarea && tarea.cliente) {
    tarea.cliente.nombreCompleto = `${tarea.cliente.nombre} ${tarea.cliente.apellidos}`;
  }
  tarea.empleado = find(this.empleados.docs, { _id: tarea.empleado });
  this.copia = formatearFechas(tarea);
  // Hay que esperar a que el mapa cargue. No hay forma de hacer un watch sobre $refs.
  setTimeout(() => {
    this.$refs.map.panTo({
      lat: this.copia.ubicacion.coordinates[1],
      lng: this.copia.ubicacion.coordinates[0],
    });
  }, 1000);
}

function buscarLugar(lugar) {
  debug("buscarLugar");
  this.copia.ubicacion = {
    type: "Point",
    coordinates: [lugar.geometry.location.lng(), lugar.geometry.location.lat()],
  };
  this.$refs.map.panTo({
    lat: this.copia.ubicacion.coordinates[1],
    lng: this.copia.ubicacion.coordinates[0],
  });
}

function buscarClientesDebounce(txt) {
  debug("buscarClientesDebounce");
  if (!txt) {
    return [];
  }
  return this.$store.dispatch("storeCliente/buscar", {
    txt, pagina: 0, cantidad: 10, recordar: true,
  });
}

function formatearFechas(tarea) {
  debug("formatearFechas");
  const tareaMod = cloneDeep(tarea);
  tareaMod.start = moment.isMoment(tarea.start) ? tarea.start.format() : tarea.start;
  tareaMod.end = moment.isMoment(tarea.end) ? tarea.end.format() : tarea.end;
  return tareaMod;
}

function crearSubtarea() {
  debug("crearSubtarea");
  if (some(this.copia.subtareas, { texto: "" })) {
    return false;
  }
  return this.copia.subtareas.push({
    texto: "",
    completado: false,
  });
}
</script>

<style lang="scss">
.mapa-agenda{
  height: 300px;
  width: 100%;
}
.lista-subtareas {
  margin-left: 20px;
  li {
    padding: 0 0 15px 0;
  }
}
.toggle-subtareas {
  font-size: 12px;
}
#fecha-tarea {
  .col-6 {
    padding-top: 0;
    padding-bottom: 0;
    .form__group {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
