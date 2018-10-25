import Vue from "vue";
import Router from "vue-router";
import union from "lodash/union";
import Home from "./components/Home.vue";
import RutasIngreso from "./components/ingreso/rutas.js";
import RutasMapa from "./components/mapa/rutas.js";
import RutasEmpleados from "./components/empleados/rutas.js";
import RutasAgenda from "./components/agenda/rutas.js";
import RutasChat from "./components/chat/rutas.js";
import RutasPerfil from "./components/perfil/rutas.js";
import RutasCliente from "./components/clientes/rutas.js";
import RutasReportes from "./components/reportes/rutas.js";
import RutasRutas from "./components/rutas/rutas.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: union([
    {
      path: "/",
      name: "home",
      component: Home,
      children: union(
        RutasMapa,
        RutasAgenda,
        RutasCliente,
        RutasChat,
        RutasEmpleados,
        RutasPerfil,
        RutasReportes,
        RutasRutas,
      ),
      redirect: "/agenda",
    },
  ], RutasIngreso),
});

router.beforeEach((to, from, next) => {
  if (Vue.prototype.$store.state.usuario.usuarioActivo.estaAutenticado) {
    if (to.name === "login") {
      next({ name: "agenda" });
    } else {
      next();
    }
  } else if (to.meta.esPublica) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
