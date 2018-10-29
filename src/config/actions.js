import assign from "lodash/assign";

const app = {
  toggleAuthCargado: "app/toggleAuthCargado",
};

const cliente = {
  buscarCliente: "cliente/buscar",
  resetCliente: "cliente/resetCliente",
  guardarCliente: "cliente/guardar",
  getBaseCliente: "cliente/getBase",
  deleteIDCliente: "cliente/deleteID",
  setCliente: "cliente/setCliente",
};

const cuenta = {
  invitarUsuarios: "cuenta/invitarUsuarios",
  getIDCuenta: "cuenta/getID",
  cargarBulkCuenta: "cuenta/cargarBulk",
  guardarCuenta: "cuenta/guardar",
  migrarEmpresarial: "cuenta/migrarEmpresarial",
};

const empleado = {
  getBaseEmpleado: "empleado/getBase",
  setEmpleado: "empleado/setEmpleado",
  eliminarEmpleado: "empleado/eliminarEmpleado",
  guardarEmpleado: "empleado/guardar",
  resetEmpleado: "empleado/resetEmpleado",
  listaEmpleadosSinNuevos: "empleado/listadoSinNuevos",
  modificarEmpleado: "empleado/modificarEmpleado",
};

const mensaje = {
  listarMensajePrivado: "mensaje/listarPrivado",
  listarMensajePublico: "mensaje/listarPublico",
  guardarMensaje: "mensaje/guardar",
  resetMensaje: "mensaje/resetMensaje",
  agregarAMensajesPrivados: "mensaje/agregarAMensajesPrivados",
  agregarAMensajesPublicos: "mensaje/agregarAMensajesPublicos",
  marcarMensajesComoVistos: "mensaje/marcarComoVistos",
};

const modal = {
  hideModal: "modal/hideModal",
  showModal: "modal/showModal",
};

const perfil = {
  actualizarDatosUsuario: "perfil/actualizarDatosUsuario",
};

const tarea = {
  resetTarea: "tarea/resetTarea",
  setTarea: "tarea/setTarea",
  guardarTarea: "tarea/guardar",
  listarTareaXFecha: "tarea/listarXFecha",
  deleteIDTarea: "tarea/deleteID",
  getTareasPopuladas: "tarea/getTareasPopuladas",
};

const usuario = {
  reportarBug: "usuario/reportarBug",
  guardarUsuario: "usuario/guardar",
  setUsuarioActivo: "usuario/setUsuarioActivo",
  resetUsuarioActivo: "usuario/resetUsuarioActivo",
};

const ruta = {
  buscarRuta: "ruta/buscar",
  resetRuta: "ruta/resetRuta",
  guardarRuta: "ruta/guardar",
  getBaseRuta: "ruta/getBase",
  deleteIDRuta: "ruta/deleteID",
  setRuta: "ruta/setCliente",
};

export default assign(app, cliente, cuenta, empleado, mensaje, modal, perfil, tarea, usuario, ruta);
