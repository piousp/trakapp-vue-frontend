<template>
  <section>
    <div>
      <h1 class="titulo"><strong class="text--bold">Tare</strong>as pendientes</h1>
    </div>
    <filtros @exportarFiltro="buscar"/>
    <br>
    <div v-if="primeraBusqueda">
      <p class="no-results text--center">
        <i class="fa fa-fw fa-arrow-up"/>
        <span>Realice una busqueda para obtener resultados</span>
      </p>
    </div>
    <div v-else>
      <table class="tabla tabla--responsive" v-if="lista.length > 0">
        <thead class="tabla__header text--center">
          <tr>
            <th/>
            <th/>
            <th/>
            <th colspan="2">Hora Programada</th>
            <th colspan="2">Horas Trabajadas</th>
          </tr>
          <tr>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Empleado</th>
            <th>Incio</th>
            <th>Fin</th>
            <th>Incio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody class="tabla__body tabla__body--striped">
          <tr v-for="item in lista" :key="item._id">
            <td>{{ item.title }}</td>
            <td>{{ item.descripcion }}</td>
            <td>
              {{ item.empleado ?
                `${item.empleado.nombre} ${item.empleado.apellidos}` :
              "Sin empleado" }}
            </td>
            <td>{{ item.start | fecha("DD-MM-YYYY HH:mm a") }}</td>
            <td>{{ item.end | fecha("DD-MM-YYYY HH:mm a") }}</td>
            <td>{{ item.horaInicio | fecha("DD-MM-YYYY HH:mm a") }}</td>
            <td>Pendiente</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p class="no-results text--center">
          <i class="fa fa-fw fa-list"/>
          <span>No hay información disponible para los días especificados</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import D from "debug";
import api from "./reporteAPI";
import Filtros from "./util/Filtros.vue";

const debug = D("ciris:ReporteTareasRealizadas.vue");

export default {
  name: "ReporteTareasRealizadas",
  components: {
    Filtros,
  },
  data() {
    return {
      lista: [],
      primeraBusqueda: true,
    };
  },
  methods: {
    buscar,
  },
};

function buscar(filtro) {
  this.primeraBusqueda = false;
  api.getTareasPendientes(filtro)
    .then((resp) => { this.lista = resp.docs; return resp; })
    .catch(debug);
}
</script>

<style lang="css">
</style>
