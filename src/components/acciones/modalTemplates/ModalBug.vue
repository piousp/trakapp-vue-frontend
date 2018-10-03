<template>
  <section>
    <div class="modal__header text--center">
      <div class="modal__header__titulo">Reporte de fallo</div>
    </div>
    <div class="modal__body">
      <form-group id="subject" :error="errors.has('subject') && submitted">
        <input class="form__input"
               name="subject"
               v-model="bug.subject"
               required
               v-validate="'required'">
        <label class="form__label">Asunto</label>
      </form-group>
      <form-group id="message" :error="errors.has('message') && submitted">
        <textarea class="form__input"
                  name="message"
                  v-model="bug.message"
                  required
                  v-validate="'required'"/>
        <label class="form__label">Mensaje</label>
      </form-group>
    </div>
    <div class="modal__footer">
      <button type="button" class="boton boton--cancelar" @click="hideModal"/>
      <button type="button" class="boton boton--enviar" @click="enviar"/>
    </div>
  </section>
</template>

<script>
import perfilAPi from "../../perfil/perfilApi.js";

export default {
  name: "ModalBug",
  data,
  methods: {
    enviar,
    hideModal,
  },
};

function hideModal() {
  return this.$store.commit("modal/hideModal");
}

function data() {
  return {
    bug: {},
    submitted: false,
  };
}

function enviar() {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      const creds = this.$auth.usuario;
      this.bug.usuario = {
        nombre: creds.nombre,
        apellidos: creds.apellidos,
        correo: creds.correo,
      };
      return perfilAPi
        .reportarBug(this.bug)
        .then(() => {
          this.hideModal();
          return this.$toastr("success", "Su mensaje ha sido enviado", "Gracias");
        });
    }
    return null;
  });
}
</script>
