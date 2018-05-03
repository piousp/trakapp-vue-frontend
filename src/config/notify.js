import D from "debug";

const debug = D("ciris:notify.js");

const Notificacion = {
  install(Vue) {
    permiso();
    Vue.notify = notificar;

    Object.defineProperties(Vue.prototype, {
      $notify: {
        get() {
          return Vue.notify;
        },
      },
    });
  },
};

function notificar(mensaje, cuerpo) {
  debug("notificando");
  if (document.hasFocus() === false) {
    const options = {
      body: cuerpo || "Trakapp",
      icon: "/static/icono.png",
    };
    return new Notification("Prueba de notificación", options);
  }
  return debug("La página tiene el foco, no hace falta hacer una notificación");
}

function permiso() {
  debug("Permiso para Notification?", Notification.permission);
  if (Notification.permission !== "granted") {
    Notification.requestPermission(() => {
      const c = new Notification("Hi there!");
      debug(c);
    });
  }
}

export default Notificacion;
