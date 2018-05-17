import Perfil from "./Perfil.vue";
import Cuenta from "./Cuenta.vue";

export default [
  {
    path: "/perfil",
    name: "perfil",
    component: Perfil,
    meta: {
      titulo: "Perfil",
      icono: "fal fa-fw fa-user-cog",
      esconder: true,
    },
  },
  {
    path: "/cuenta",
    name: "cuenta",
    component: Cuenta,
    meta: {
      titulo: "Cuenta",
      icono: "fal fa-fw fa-warehouse-alt",
      esconder: true,
    },
  },
];
