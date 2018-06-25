<template>
  <section>
    <div class="botones-pagina">
      <router-link :to="{name: 'empleadolist'}" class="boton boton--volver"/>
      <button
        type="button"
        class="boton boton--cancelar"
        v-if="empleado._id && editando"
        @click="cancelar"/>
      <button
        type="button"
        class="boton boton--editar"
        v-if="empleado._id && !editando"
        @click="editar(empleado)"/>
      <button
        type="button"
        class="boton boton--guardar"
        v-if="editando"
        @click="guardar(empleado)"/>
    </div>
    <section class="grid">
      <div class="col-md-6">
        <form class="form" novalidate>
          <h1 class="h1"><strong class="text--bold">Info</strong>rmación básica</h1>
          <form-group :error="errors.has('nombre') && submitted">
            <input
              name="nombre"
              class="form__input"
              v-model="empleado.nombre"
              :disabled="!editando"
              v-validate="'required'" >
            <label class="form__label">Nombre</label>
          </form-group>
          <form-group>
            <input class="form__input"
                   v-model="empleado.apellidos"
                   :disabled="!editando">
            <label class="form__label">Apellidos</label>
          </form-group>

          <form-group :error="errors.has('correo') && submitted">
            <input class="form__input"
                   v-model="empleado.correo"
                   :disabled="!editando"
                   v-validate="'required|email'"
                   name="correo">
            <label class="form__label">Correo electrónico</label>
          </form-group>
        </form>
        <form class="form" novalidate>
          <h1 class="h1"><strong class="text--bold">Dato</strong>s de costos</h1>
          <form-group :error="errors.has('nombre') && submitted">
            <input
              name="nombre"
              class="form__input"
              v-model="empleado.nombre"
              :disabled="!editando"
              v-validate="'required'" >
            <label class="form__label">Costo por hora</label>
          </form-group>
          <form-group>
            <input class="form__input"
                   v-model="empleado.apellidos"
                   :disabled="!editando">
            <label class="form__label">Costo por hora extra</label>
          </form-group>
        </form>
      </div>
      <div class="col-md-6">
        <h1 class="h1"><strong class="text--bold">Hora</strong>rios de trabajo</h1>
        <ul class="lista">
          <li class="lista__item">
            <label class="text">Lunes:</label>
            <v-select
            :options="horarios"/>
            <v-select
            :options="horarios"/>
          </li>
          <li class="lista__item">
            <label class="text">Martes:</label>
            <v-select
            :options="horarios"/>
            <v-select
            :options="horarios"/>
          </li>
          <li class="lista__item">
            <label class="text">Miércoles:</label>
            <v-select
            :options="horarios"/>
            <v-select
            :options="horarios"/>
          </li>
          <li class="lista__item">
            <label class="text">Jueves:</label>
            <v-select
            :options="horarios"/>
            <v-select
            :options="horarios"/>
          </li>
          <li class="lista__item">
            <label class="text">Viernes:</label>
            <v-select
            :options="horarios"/>
            <v-select
            :options="horarios"/>
          </li>
          <li class="lista__item">
            <label class="text">Sábado:</label>
            <v-select
            :options="horarios"/>
            <v-select
            :options="horarios"/>
          </li>
          <li class="lista__item">
            <label class="text">Domingo:</label>
            <v-select
            :options="horarios"/>
            <v-select
            :options="horarios"/>
          </li>
        </ul>
      </div>
    </section>

  </section>
</template>

<script>
import D from "debug";
import range from "lodash/range";
import cloneDeep from "lodash/cloneDeep";
import empleadoApi from "./empleadoApi.js";

const debug = D("ciris:EmpleadoForm.vue");

export default {
  data,
  computed: {
    horarios,
  },
  methods: {
    guardar,
    editar,
    cancelar,
  },
  beforeRouteEnter,
};

function data() {
  return {
    empleado: {},
    copia: {},
    editando: true,
    submitted: false,
  };
}

function guardar(empleado) {
  this.submitted = true;
  this.$validator.validateAll().then((valido) => {
    if (valido) {
      return empleadoApi
        .guardar(empleado)
        .then((resp) => {
          this.$toastr("success", "Empleado guardado exitosamente", "Éxito");
          this.$router.push({ name: "empleadoform", params: { id: resp._id } });
          this.empleado._id = resp._id;
          this.editando = false;
          return resp;
        })
        .catch((err) => {
          this.$toastr("error", err, "Error");
        });
    }
    return this.$toastr("error", "Hay campos requeridos sin completar", "Error");
  })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}

function editar(empleado) {
  this.editando = true;
  this.copia = cloneDeep(empleado);
}

function cancelar() {
  this.editando = false;
  this.empleado = this.copia;
}

function beforeRouteEnter(to, from, next) {
  const self = this;
  if (to.params.id) {
    return empleadoApi.obtener(to.params.id)
      .then(resp => next((vm) => {
        vm.empleado = resp;
        vm.copia = cloneDeep(resp);
        vm.editando = to.params.edit;
      }))
      .catch((err) => {
        debug(err);
        self.$toastr("error", err, "Error");
      });
  }
  return next();
}

function horarios() {
  function aHora(val) {
    const minutos = `${val % 1 === 0 ? ":00" : ":30"}`;
    const hora = (`0${Math.floor((val > 12 ? val - 12 : val))}`).slice(-2);
    return `${hora}${minutos} ${val > 12 ? "PM" : "AM"}`;
  }
  return range(0, 24, 0.5).map(val => ({ label: aHora(val), value: val }));
}
</script>
<style lang="scss">
  .lista__item {

  }
</style>
