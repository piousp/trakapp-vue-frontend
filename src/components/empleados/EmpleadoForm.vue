<template>
  <section>
    <div class="botones-pagina">
      <router-link :to="{name: 'empleadolist'}" class="boton boton--volver"/>
      <button
        type="button"
        class="boton boton--cancelar"
        v-if="copia._id && editando"
        @click="cancelar"/>
      <button
        type="button"
        class="boton boton--editar"
        v-if="copia._id && !editando"
        @click="editar(copia)"/>
      <button
        type="button"
        class="boton boton--guardar"
        v-if="editando"
        @click="guardar(copia)"/>
    </div>
    <section class="grid">
      <div class="col-md-6">
        <form class="form" novalidate>
          <h1 class="h1"><strong class="text--bold">Info</strong>rmación básica</h1>
          <form-group :error="errors.has('nombre') && submitted">
            <input
              name="nombre"
              class="form__input"
              v-model="copia.nombre"
              :disabled="!editando"
              required
              v-validate="'required'" >
            <label class="form__label">Nombre</label>
          </form-group>
          <form-group :error="errors.has('apellidos') && submitted">
            <input
              name="apellidos"
              class="form__input"
              v-model="copia.apellidos"
              :disabled="!editando"
              required
              v-validate="'required'" >
            <label class="form__label">Apellidos</label>
          </form-group>

          <form-group :error="errors.has('correo') && submitted">
            <input class="form__input"
                   v-model="copia.correo"
                   :disabled="!editando"
                   v-validate="'required|email'"
                   required
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
              v-model="copia.costoHora"
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
              v-model="copia.horaExtra"
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
                v-model="copia.horarios.lunes.desde"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="copia.horarios.lunes.hasta"
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
                v-model="copia.horarios.martes.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="copia.horarios.martes.hasta"
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
                v-model="copia.horarios.miercoles.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="copia.horarios.miercoles.hasta"
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
                v-model="copia.horarios.jueves.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="copia.horarios.jueves.hasta"
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
                v-model="copia.horarios.viernes.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="copia.horarios.viernes.hasta"
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
                v-model="copia.horarios.sabado.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="copia.horarios.sabado.hasta"
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
                v-model="copia.horarios.domingo.desde"
                :disabled="!editando"
                :options="horarios"
                :custom-label="opt => aHora(opt)"/>
            </div>
            <div class="lista__item__cell">
              <multiselect
                placeholder="Seleccione una hora"
                v-model="copia.horarios.domingo.hasta"
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
import isNil from "lodash/isNil";
import cloneDeep from "lodash/cloneDeep";

const debug = D("ciris:EmpleadoForm.vue");

export default {
  name: "EmpleadoForm",
  data,
  computed: {
    horarios,
    empleado() {
      return this.$store.state.storeEmpleado.empleado;
    },
  },
  watch: {
    empleado: {
      handler(newV) {
        this.copia = cloneDeep(newV);
        this.copia.horarios = verificarHorarios(newV.horarios);
      },
      immediate: true,
      deep: true,
    },
  },
  beforeDestroy() {
    this.$store.commit("storeEmpleado/resetEmpleado");
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
    copia: { horarios: {} },
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
  debug("Iniciar guardado");
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return this.$store.dispatch("storeEmpleado/guardar", { empleado, conservar: true, aLista: true })
        .then((resp) => {
          debug("Guardado exitoso");
          this.$toastr("success", "Empleado guardado exitosamente", "Éxito");
          this.editando = false;
          return resp;
        })
        .catch((err) => {
          debug(err);
          if (err.response.status === 409) {
            return this.$toastr(
              "error",
              "El correo del empleado ya fue registrado anteriormente por alguien más",
              "No se puede crear",
            );
          }
          return this.$toastr("error", err, "Error");
        });
    }
    return this.$toastr("error", "Hay campos requeridos sin completar", "Error");
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
  next((vm) => {
    if (!isNil(to.params.edit)) vm.editando = to.params.edit;
  });
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
