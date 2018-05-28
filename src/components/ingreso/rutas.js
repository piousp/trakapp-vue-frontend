import Login from "../ingreso/Login.vue";
import Registro from "../ingreso/Registro.vue";
import Recuperacion from "../ingreso/Recuperacion.vue";
import Activacion from "../ingreso/Activacion.vue";

export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      esPublica: true,
    },
  },
  {
    path: "/registro",
    name: "registro",
    component: Registro,
    meta: {
      esPublica: true,
    },
  },
  {
    path: "/recuperacion/:id",
    name: "recuperacion",
    component: Recuperacion,
    meta: {
      esPublica: true,
    },
  },
  {
    path: "/activacion/:id",
    name: "activacion",
    component: Activacion,
    meta: {
      esPublica: true,
    },
  },
];
