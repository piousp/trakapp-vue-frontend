import Main from "./Main.vue";
import TareasRealizadas from "./TareasRealizadas.vue";
import TareasPendientes from "./TareasPendientes.vue";

export default [
  {
    path: "/reportes",
    name: "reportes",
    component: Main,
    meta: {
      titulo: "Reportes",
      icono: "fal fa-fw fa-chart-bar",
    },
  },
  {
    path: "/reportes/realizadas",
    name: "tareasrealizadas",
    component: TareasRealizadas,
    meta: {
      titulo: "Tareas realizadas",
      esconder: true,
    },
  },
  {
    path: "/reportes/pendientes",
    name: "tareaspendientes",
    component: TareasPendientes,
    meta: {
      titulo: "Tareas pendientes",
      esconder: true,
    },
  },
];
