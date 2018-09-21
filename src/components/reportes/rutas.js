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
    path: "/reportes/:tipo",
    name: "reportetareas",
    component: ReporteTareas,
    meta: {
      esconder: true,
    },
  },
];
