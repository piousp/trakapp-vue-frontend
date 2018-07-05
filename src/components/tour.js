export default($router, delayInicio, cbFinal) => {
  function getBotonRuta(ruta) {
    return [{
      click(anno) {
        $router.push({ name: ruta });
        anno.hide();
        setTimeout(() => anno.switchToChainNext(), 1000);
      },
    }];
  }
  function getBotonFinal() {
    return [{
      click(a) {
        if (cbFinal) {
          cbFinal();
        }
        a.hide();
        $router.push({ name: "agenda" });
      },
    }];
  }
  setTimeout(() => {
    const annoTour = new Anno([
      {
        target: "#empleadolist",
        content: "Gestione aquí su personal.",
        buttons: getBotonRuta("empleadolist"),
      },
      {
        target: ".botones-pagina",
        content: "Agregue un nuevo empleado.",
        position: "center-bottom",
        buttons: getBotonRuta("empleadoform"),
      },
      {
        target: ".botones-pagina",
        position: "center-bottom",
        content: "Una vez guardado, el empleado podrá ingresar a la aplicación móvil con los " +
        "credenciales enviados al correo electrónico.",
      },
      {
        target: "#tareas",
        position: "right",
        content: "Gestione aquí las tareas de su personal.",
        buttons: getBotonRuta("tareas"),
      },
      {
        target: ".fc-toolbar",
        content: "Utilice los controles para cambiar los días que se muestran y el tipo de vista " +
        "del calendario.",
        position: "center-bottom",
      },
      {
        target: ".layout__content",
        position: {
          top: "15em",
          left: "25em",
        },
        content: "Para agregar una tarea, arrastre el puntero desde la hora de inicio hasta la " +
        "hora de finalizar la tarea.",
        buttons: [{
          click(a) {
            window.eventBus.$emit("abrirModalTarea");
            a.hide();
            setTimeout(() => {
              a.switchToChainNext();
              document.querySelector("#asignar-tarea").append(document.querySelector(".anno-overlay"));
            }, 500);
          },
        }],
      },
      {
        target: "#asignar-tarea",
        content: "Seleccione el empleado a quien desea asignar esta tarea. Se le enviará una " +
        "notificación sobre esta nueva tarea.",
        buttons: [{
          click(a) {
            a.switchToChainNext();
            document.querySelector("#fecha-tarea").append(document.querySelector(".anno-overlay"));
          },
        }],
      },
      {
        target: "#fecha-tarea",
        content: "Muestra el momento de inicio y fin de la tarea. Puede cambiar estos valores " +
        "desde el calendario simplemente arrastrando el evento hacia otra casilla.",
        buttons: [{
          click(a) {
            a.switchToChainNext();
            document.querySelector("#ubicacion-tarea").append(document.querySelector(".anno-overlay"));
          },
        }],
      },
      {
        target: "#ubicacion-tarea",
        content: "Indique el lugar donde se debe acudir, ya sea escribiendo la dirección o " +
        "colocando un punto en el mapa.",
        position: "left",
        buttons: [{
          click(a) {
            a.hide();
            window.eventBus.$emit("cerrarModalTarea");
            setTimeout(() => {
              a.switchToChainNext();
            }, 500);
          },
        }],
      },
      {
        target: "#mapa",
        content: "Visualice en tiempo real la ubicación geográfica de todo su personal",
      },
      {
        target: "#chat",
        content: "Comuníquese con todo su personal a la vez en tiempo real.",
      },
      {
        target: "#chat-empleados h1",
        content: "Una vez haya agregado empleados, podrá verlos aquí para iniciar conversaciones " +
        "privadas con cada uno.",
        position: "top",
      },
      {
        target: ".navbar__user",
        content: "Gestione la información de su perfil y su cuenta.",
        buttons: getBotonRuta("perfil"),
      },
      {
        target: ".navbar__logo",
        content: "¡Ya está listo para empezar a usar Trakapp!",
        buttons: getBotonFinal(),
      },
    ]);
    annoTour.start();
  }, delayInicio);
};
