<template>
  <section>
    <div class="contenedor grid">
      <div class="col-md-4">
        <form-group id="fecha-desde" :error="errors.has('fecha-desde') && submitted">
          <label class="form__label form__label--required">Desde</label>
          <datetime
            v-model="filtro.inicio"
            v-validate="'required'"
            input-class="form__input"
            name="fecha-desde"
            type="date"
            zone="local"
            value-zone="UTC-6"
            :phrases="frases"/>
        </form-group>
      </div>
      <div class="col-md-4">
        <form-group id="fecha-hasta" :error="errors.has('fecha-hasta') && submitted">
          <label class="form__label form__label--required">Hasta</label>
          <datetime
            v-model="filtro.fin"
            v-validate="'required'"
            input-class="form__input"
            name="fecha-hasta"
            type="date"
            zone="local"
            value-zone="UTC-6"
            :phrases="frases"/>
        </form-group>
      </div>
      <div class="col-md-4">
        <div class="grid v-center">
          <div class="col-md-10">
            <form-group>
              <select class="form__input" v-model="filtro.empleado">
                <option v-for="emp in empleados.docs" :value="emp" :key="emp._id">
                  {{ emp.nombre }} {{ emp.apellidos }}
                </option>
              </select>
              <label class="form__label">Empleado</label>
            </form-group>
          </div>
          <div class="col-md-2">
            <span class="clickable text--center" @click="exportarFiltro">
              <i class="fa fa-fw fa-search"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";

export default {
  data,
  computed: {
    empleados() {
      return this.$store.state.empleados.listado;
    },
  },
  methods: {
    exportarFiltro,
  },
};

function data() {
  return {
    filtro: {
      inicio: moment().startOf("week").add(1, "d").format("YYYY-MM-DD"),
      fin: moment().add(1, "d").format("YYYY-MM-DD"),
    },
    frases: {
      ok: "Ok",
      cancel: "Cancelar",
    },
  };
}

function exportarFiltro() {
  const resp = cloneDeep(this.filtro);
  resp.inicio = moment(resp.inicio).startOf("day").format();
  resp.fin = moment(resp.fin).endOf("day").format();
  resp.empleado = resp.empleado ? resp.empleado._id : null;
  this.$emit("exportarFiltro", resp);
}
</script>

<style lang="scss" scoped>
.form__group--botton {
  padding-top: 10px;
  color: #888888;
  background-color: #eeeeee;
  width: 50px;
  text-align: center;
}

.vdp-datepicker {
  width: 100%;
}

.contenedor {
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: white;
}

.v-center {
  align-items: center;
}
</style>
