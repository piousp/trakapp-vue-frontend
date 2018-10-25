import RutaList from "./RutaList.vue";
import RutaForm from "./RutaForm.vue";

export default [
  {
    path: "/rutas",
    name: "rutalist",
    component: RutaList,
    meta: {
      titulo: "Rutas",
      icono: "fal fa-fw fa-route",
    },
  },
  {
    path: "/rutas/form/:id?",
    name: "rutaform",
    component: RutaForm,
    meta: {
      titulo: "Formulario",
      icono: "fal fa-fw fa-file",
      esconder: true,
    },
  },
];
