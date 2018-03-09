import Vue from "vue";
import Router from "vue-router";
import _ from "lodash";
import D from "debug";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import RutasMapa from "../components/mapa/rutas.js";
import RutasEmpleados from "../components/empleados/rutas.js";
// import RutasAgenda from "../components/agenda/rutas.js";
import RutasDocumentacion from "../documentacion/rutas.js";

const debug = D("ciris:config/router.js");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: _.union(RutasDocumentacion, RutasMapa, RutasEmpleados),
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

router.afterEach((to) => {
  setTimeout(() => {
    debug("afterEach");
    const barra = document.getElementsByClassName("navbar__right__botones")[0];
    if (barra) {
      if (!to.meta.heredarBotones) {
        debug("Limpiando los botones anteriores");
        removeElementsByClass(barra, "botones-pagina");
      }
      moverBotones(barra);
    }
  }, 50);
});

function moverBotones(barra) {
  debug("moverBotones", barra);
  const divBotones = document.getElementsByClassName("botones-pagina")[0];
  debug("divBotones", divBotones);
  if (divBotones) {
    debug("Agregando los botones a", barra);
    barra.appendChild(divBotones);
  }
}

function removeElementsByClass(padre = document, clase) {
  const elementos = padre.getElementsByClassName(clase);
  while (elementos.length > 0) {
    elementos[0].parentNode.removeChild(elementos[0]);
  }
}

export default router;
