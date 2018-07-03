import Tareas from "./Tareas.vue";
import Agenda from "./Agenda.vue";
import TareaList from "./TareaList.vue";

export default [{
  path: "/tareas",
  name: "tareas",
  component: Tareas,
  meta: {
    titulo: "Agenda Tareas",
    icono: "fal fa-fw fa-calendar",
  },
  children: [
    {
      path: "/agenda",
      name: "agenda",
      component: Agenda,
      meta: {
        titulo: "Agenda Tareas",
        icono: "fal fa-fw fa-calendar",
      },
    },
    {
      path: "/listado",
      name: "tarealist",
      component: TareaList,
      meta: {
        titulo: "Tareas",
        icono: "fal fa-fw fa-tasks",
      },
    },
  ],
}];
