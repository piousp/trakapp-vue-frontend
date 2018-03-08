import EmpleadoList from "./EmpleadoList.vue";
import EmpleadoForm from "./EmpleadoForm.vue";

export default [
  {
    path: "/empleados",
    name: "empleadolist",
    component: EmpleadoList,
    meta: {
      titulo: "Empleados",
      icono: "fal fa-fw fa-user",
    },
  },
  {
    path: "/empleados/form/:id?",
    name: "empleadoform",
    component: EmpleadoForm,
    meta: {
      titulo: "Formulario",
      icono: "fal fa-fw fa-file",
      esconder: true,
    },
  },
];
