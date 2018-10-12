<template>
  <section>
    <div class="modal__body">
      <p class="h4">Digite una nueva contraseña</p>
      <password
      @password="claveNueva = $event"/>
    </div>
    <div class="modal__footer">
      <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
      <button type="button" class="boton boton--verde" @click="actualizarContrasena(claveNueva)">
        <i class="fa fal fa-lock-alt"/>
        <span>Cambiar contraseña</span>
      </button>
    </div>
  </section>
</template>
<script>
import D from "debug";

const debug = D("ciris:ModalPassword.vue");

export default {
  name: "ModalPassword",
  props: ["params"],
  data() {
    return {
      claveNueva: "",
    };
  },
  methods: {
    cerrarModal,
    actualizarContrasena,
  },
};

function cerrarModal() {
  this.$store.commit("storeModal/hideModal");
}

function actualizarContrasena(pass) {
  debug("actualizarContrasena");
  return this.$validator.validateAll()
    .then((valido) => {
      if (valido) {
        return this.$auth.actualizarContrasena(pass)
          .then(() => {
            this.$toastr("success", "Se ha modificado su contraseña", "Contraseña Cambiada");
            this.$store.commit("storeModal/hideModal");
            if (this.params.aceptar) this.params.aceptar();
            return null;
          })
          .catch((err) => {
            debug(err);
            this.$toastr("error", "Error al cambiar la contraseña", "Error");
          });
      }
      return null;
    });
}
</script>
