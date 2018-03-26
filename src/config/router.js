import Vue from "vue";
import Router from "vue-router";
import union from "lodash/union";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import RutasMapa from "../components/mapa/rutas.js";
import RutasEmpleados from "../components/empleados/rutas.js";
import RutasDocumentacion from "../documentacion/rutas.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: union(RutasDocumentacion, RutasMapa, RutasEmpleados),
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        esPublica: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (Vue.auth.usuario.estaAutenticado) {
    if (to.name === "login") {
      next({ name: "/" });
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
