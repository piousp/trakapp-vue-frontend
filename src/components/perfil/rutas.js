import Perfil from "./Perfil.vue";
import Cuenta from "./Cuenta.vue";
import DatosCuenta from "./sub/DatosCuenta.vue";

const rutasCuenta = [
  {
    path: "/datos",
    name: "cuenta-datos",
    component: DatosCuenta,
    meta: {
      titulo: "Datos de la cuenta",
      icono: "fal fa-fw fa-database",
    },
  },
];

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
    children: rutasCuenta,
    meta: {
      titulo: "Cuenta",
      icono: "fal fa-fw fa-warehouse-alt",
      esconder: true,
    },
  },
];
