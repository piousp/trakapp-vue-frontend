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
          <form-group :error="errors.has('apellidos') && submitted">
            <input
              name="apellidos"
              class="form__input"
              v-model="empleado.apellidos"
              :disabled="!editando"
              v-validate="'required'" >
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
          <form-group>
            <money
              id="costoHora"
              name="costoHora"
              class="form__input"
              v-model="empleado.costoHora"
              v-bind="money"
              :disabled="!editando"
            />
            <label class="form__label">Costo por hora</label>
          </form-group>
          <form-group>
            <money
              id="horaExtra"
              name="horaExtra"
              class="form__input"
              v-model="empleado.horaExtra"
              v-bind="money"
              :disabled="!editando"
            />
            <label class="form__label">Costo por hora extra</label>
          </form-group>
        </form>
      </div>
      <div class="col-md-6">
        <h1 class="h1"><strong class="text--bold">Hora</strong>rios de trabajo</h1>
        <ul class="lista">
          <li class="lista__item">
            <div class="lista__item__cell lista__item__cell--small">
              <label class="text">Lunes:</label>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                :disabled="!editando"
                v-model="empleado.horarios.lunes.desde"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.lunes.hasta"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
          </li>
          <li class="lista__item">
            <div class="lista__item__cell lista__item__cell--small">
              <label class="text">Martes:</label>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.martes.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.martes.hasta"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
          </li>
          <li class="lista__item">
            <div class="lista__item__cell lista__item__cell--small">
              <label class="text">Miércoles:</label>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.miercoles.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.miercoles.hasta"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
          </li>
          <li class="lista__item">
            <div class="lista__item__cell lista__item__cell--small">
              <label class="text">Jueves:</label>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.jueves.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.jueves.hasta"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
          </li>
          <li class="lista__item">
            <div class="lista__item__cell lista__item__cell--small">
              <label class="text">Viernes:</label>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.viernes.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.viernes.hasta"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
          </li>
          <li class="lista__item">
            <div class="lista__item__cell lista__item__cell--small">
              <label class="text">Sábado:</label>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.sabado.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.sabado.hasta"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
          </li>
          <li class="lista__item">
            <div class="lista__item__cell lista__item__cell--small">
              <label class="text">Domingo:</label>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.domingo.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="empleado.horarios.domingo.hasta"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
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
    aHora,
  },
  beforeRouteEnter,
};

function data() {
  return {
    empleado: {
      horarios: verificarHorarios(null),
    },
    copia: {},
    editando: true,
    submitted: false,
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "₡",
      suffix: "",
      precision: 2,
      masked: false, /* doesn't work with directive */
    },
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

function verificarHorarios(configHoras) {
  if (configHoras) {
    configHoras.lunes = configHoras.lunes || {};
    configHoras.martes = configHoras.martes || {};
    configHoras.miercoles = configHoras.miercoles || {};
    configHoras.jueves = configHoras.jueves || {};
    configHoras.viernes = configHoras.viernes || {};
    configHoras.sabado = configHoras.sabado || {};
    configHoras.domingo = configHoras.domingo || {};
    return configHoras;
  }
  return {
    lunes: {
      desde: 8,
      hasta: 17,
    },
    martes: {
      desde: 8,
      hasta: 17,
    },
    miercoles: {
      desde: 8,
      hasta: 17,
    },
    jueves: {
      desde: 8,
      hasta: 17,
    },
    viernes: {
      desde: 8,
      hasta: 17,
    },
    sabado: {},
    domingo: {},
  };
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
        vm.empleado.horarios = verificarHorarios(vm.empleado.horarios);
        vm.copia = cloneDeep(vm.empleado);
        vm.editando = to.params.edit;
      }))
      .catch((err) => {
        debug(err);
        self.$toastr("error", err, "Error");
      });
  }
  return next();
}

function aHora(val) {
  const minutos = `${val % 1 === 0 ? ":00" : ":30"}`;
  const hora = val < 1 ? "12" : (`0${Math.floor((val > 12 ? val - 12 : val))}`).slice(-2);
  return `${hora}${minutos} ${val > 12 ? "PM" : "AM"}`;
}

function horarios() {
  return range(0, 24, 0.5);
}
</script>
<style lang="scss" scoped="true">
  .lista__item {
    display: table;
    width: 100%;
  }

  .lista__item__cell {
    display: table-cell;
    padding: 0 1%;
    width: 38%;
  }

  .lista__item__cell--small {
    width: 20%;
  }
</style>
