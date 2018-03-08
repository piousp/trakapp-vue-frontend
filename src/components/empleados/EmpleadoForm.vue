<template>
  <section>
    <form class="form" novalidate>
      <div class="botones-pagina">
        <router-link :to="{name: 'empleadolist'}" class="boton boton--volver"/>
        <button type="button" v-if="empleado._id && editando" class="boton boton--cancelar" @click="cancelar"/>
        <button type="button" v-if="empleado._id && !editando" class="boton boton--editar" @click="editar(empleado)"/>
        <button type="button" v-if="editando" class="boton boton--guardar" @click="guardar(empleado)"/>
      </div>

      <div class="form__group" :class="{ 'form__group--error': errors.has('nombre') && submitted }">
        <label class="form__label">Nombre</label>
        <input class="form__input" v-model="empleado.nombre" :disabled="!editando" v-validate="'required'" name="nombre">
      </div>

      <div class="form__group" :class="{ 'form__group--error': errors.has('apellidos') && submitted }">
        <label class="form__label">Apellidos</label>
        <input class="form__input" v-model="empleado.apellidos" :disabled="!editando" v-validate="'required'" name="apellidos">
      </div>

    </form>
  </section>
</template>

<script>
import _ from "lodash";
import empleadoApi from "./empleadoApi.js";

function data() {
  return {
    empleado: {},
    copia: {},
    editando: true,
    submitted: false,
    listaTipos: [
      "Técnico Lvl1",
      "Técnico Lvl2",
      "Técnico Lvl3",
    ],
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
        })
        .catch((err) => {
          this.$toastr("error", err, "Error");
        });
    }
    this.$toastr("error", "Hay campos requeridos sin completar", "Error");
  });
}

function editar(empleado) {
  this.editando = true;
  this.copia = _.cloneDeep(empleado);
}

function cancelar() {
  this.editando = false;
  this.empleado = this.copia;
}

function beforeRouteEnter(to, from, next) {
  if (to.params.id) {
    return empleadoApi.obtener(to.params.id).then((resp) => {
      next((vm) => {
        vm.empleado = resp;
        vm.copia = _.cloneDeep(resp);
        vm.editando = to.params.edit;
      });
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
