<template>
  <section>
    <div class="contenedor">
      <form-group id="fecha-desde" :error="errors.has('fecha-desde') && submitted">
        <label class="form__label form__label--required">Desde</label>
        <datetime
          v-model="filtro.inicio"
          v-validate="'required'"
          input-class="form__input"
          class="w-25"
          name="fecha-desde"
          type="date"
          zone="local"
          value-zone="UTC-6"
          :phrases="frases"/>
      </form-group>
      <form-group id="fecha-hasta" :error="errors.has('fecha-hasta') && submitted">
        <label class="form__label form__label--required">Hasta</label>
        <datetime
          v-model="filtro.fin"
          v-validate="'required'"
          input-class="form__input"
          class="w-25"
          name="fecha-hasta"
          type="date"
          zone="local"
          value-zone="UTC-6"
          :phrases="frases"/>
      </form-group>
      <span class="form__input-group__addon--color clickable" @click="exportarFiltro">
        <i class="fa fa-fw fa-search"/>
      </span>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";

export default {
  data,
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

.w-25 {
  width: 25vw;
}

.contenedor {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: white;
}
</style>
