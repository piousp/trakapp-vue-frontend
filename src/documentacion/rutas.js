import Documentacion from "./comps/Index.vue";
import Botones from "./comps/Botones.vue";
import Checks from "./comps/Checks.vue";
import Colores from "./comps/Colores.vue";
import Forms from "./comps/Forms.vue";
import Notificaciones from "./comps/Notificaciones.vue";
import Panels from "./comps/Panels.vue";
import Tablas from "./comps/Tablas.vue";
import Tema from "./comps/Tema.vue";
import Tipografia from "./comps/Tipografia.vue";

export default [
  {
    path: "/documentacion",
    name: "doc",
    meta: {
      icono: "fal fa-fw fa-code",
      esconder: false,
      titulo: "Documentación",
    },
    component: Documentacion,
    children: [
      {
        path: "/documentacion/botones",
        name: "botones",
        component: Botones,
        meta: {
          icono: "fas fa-fw fa-square",
          titulo: "Botones",
        },
      },
      {
        path: "/documentacion/checks",
        name: "checks",
        component: Checks,
        meta: {
          icono: "far fa-fw fa-check-square",
          titulo: "Checks/Radios",
        },
      },
      {
        path: "/documentacion/colores",
        name: "colores",
        component: Colores,
        meta: {
          icono: "fas fa-fw fa-paint-brush",
          titulo: "Colores",
        },
      },
      {
        path: "/documentacion/forms",
        name: "forms",
        component: Forms,
        meta: {
          icono: "fal fa-fw fa-th-list",
          titulo: "Forms",
        },
      },
      {
        path: "/documentacion/notificaciones",
        name: "notificaciones",
        component: Notificaciones,
        meta: {
          icono: "far fa-fw fa-bullhorn",
          titulo: "Notificaciones",
        },
      },
      {
        path: "/documentacion/panels",
        name: "panels",
        component: Panels,
        meta: {
          icono: "fas fa-fw fa-window-maximize",
          titulo: "Panels",
        },
      },
      {
        path: "/documentacion/tablas",
        name: "tablas",
        component: Tablas,
        meta: {
          icono: "fal fa-fw fa-table",
          titulo: "Tablas",
        },
      },
      {
        path: "/documentacion/tema",
        name: "tema",
        component: Tema,
        meta: {
          icono: "far fa-fw fa-window-restore",
          titulo: "Tema",
        },
      },
      {
        path: "/documentacion/tipografia",
        name: "tipografía",
        component: Tipografia,
        meta: {
          icono: "fal fa-fw fa-font",
          titulo: "Tipografía",
        },
      },
    ],
  },
];
