import D from "debug";
import modernizr from "modernizr";

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
  if (modernizr.notification) {
    debug("notificando", document.hasFocus());
    if (document.hasFocus() === false) {
      const options = {
        body: cuerpo || "Trakapp",
        icon: "/static/icono.png",
      };
      return new Notification(mensaje, options);
    }
    return debug("La página tiene el foco, no hace falta hacer una notificación");
  }
  return null;
}

function permiso() {
  if (modernizr.notification) {
    debug("Permiso para Notification?", Notification.permission);
    if (Notification.permission !== "granted") {
      Notification.requestPermission(() => {
        const c = new Notification("Ahora recibirás notificaciones");
        return c;
      });
    }
  }
}

export default Notificacion;
