<template>
  <section>
    <form class="form" novalidate>
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

      <div class="form__group"
           :class="{ 'form__group--error': errors.has('nombre') && submitted }">
        <label class="form__label">Nombre</label>
        <input
          name="nombre"
          class="form__input"
          v-model="empleado.nombre"
          :disabled="!editando"
          v-validate="'required'" >
      </div>

      <div class="form__group">
        <label class="form__label">Apellidos</label>
        <input class="form__input"
               v-model="empleado.apellidos"
               :disabled="!editando">
      </div>

      <div class="form__group"
           :class="{ 'form__group--error': errors.has('correo') && submitted }">
        <label class="form__label">Correo electrónico</label>
        <input class="form__input"
               v-model="empleado.correo"
               :disabled="!editando"
               v-validate="'required|email'"
               name="correo">
      </div>

    </form>
  </section>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import empleadoApi from "./empleadoApi.js";

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
  if (to.params.id) {
    return empleadoApi.obtener(to.params.id)
      .then(resp => next((vm) => {
        vm.empleado = resp;
        vm.copia = cloneDeep(resp);
        vm.editando = to.params.edit;
      }))
      .catch((err) => {
        this.$toastr("error", err, "Error");
      });
  }
  return next();
}

export default {
  data,
  methods: {
    guardar,
    editar,
    cancelar,
  },
  beforeRouteEnter,
};
</script>
