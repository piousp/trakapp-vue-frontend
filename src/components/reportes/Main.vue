<template>
  <section>
    <div>
      <h1 class="titulo"><strong class="text--bold">Repo</strong>rtes</h1>
    </div>
    <div class="container">
      <div class="item" v-for="reporte in reportes"
           :key="reporte.nombre + reporte.path" @click="ir(reporte.pathName)">
        <i :class="reporte.icono"/>
        <p class="text text--center">{{ reporte.nombre }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ReportesMain",
  data() {
    return {
      reportes: [
        { nombre: "Tareas realizadas", pathName: "tareasrealizadas", icono: "fal fa-check-circle" },
        { nombre: "Tareas pendientes", pathName: "tareaspendientes", icono: "fal fa-clock" },
        { nombre: "Tareas atrasadas", pathName: "tareasatrasadas", icono: "fal fa-exclamation-circle" },
      ],
    };
  },
  methods: {
    ir,
  },
};

function ir(pathName) {
  this.$router.push({ name: pathName });
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.item {
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  height: 150px;
  width: 150px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  i {
    font-size: 60px;
  }
}
</style>
