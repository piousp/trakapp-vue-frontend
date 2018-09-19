import Main from "./Main.vue";
import ReporteTareas from "./ReporteTareas.vue";

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
    component: ReporteTareas,
    props: {
      tipoReporte: "Realizadas",
    },
    meta: {
      titulo: "Tareas realizadas",
      esconder: true,
    },
  },
  {
    path: "/reportes/pendientes",
    name: "tareaspendientes",
    component: ReporteTareas,
    props: {
      tipoReporte: "Pendientes",
    },
    meta: {
      titulo: "Tareas pendientes",
      esconder: true,
    },
  },
  {
    path: "/reportes/atrasadas",
    name: "tareasatrasadas",
    component: ReporteTareas,
    props: {
      tipoReporte: "Atrasadas",
    },
    meta: {
      titulo: "Tareas atrasadas",
      esconder: true,
    },
  },
];
