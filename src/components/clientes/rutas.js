import ClienteList from "./ClienteList.vue";
import ClienteForm from "./ClienteForm.vue";

export default [
  {
    path: "/clientes",
    name: "clientelist",
    component: ClienteList,
    meta: {
      titulo: "Clientes",
      icono: "fal fa-fw fa-user-tie",
    },
  },
  {
    path: "/clientes/form/:id?",
    name: "clienteform",
    component: ClienteForm,
    meta: {
      titulo: "Formulario",
      icono: "fal fa-fw fa-file",
      esconder: true,
    },
  },
];
