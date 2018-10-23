<template>
  <section>
    <div class="modal__header text--center">
      <div class="modal__header__titulo">Enviar invitaciones</div>
    </div>
    <div class="modal__body">
      <p class="h4">Ingrese los correos que desea invitar</p>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :validation="validation"
        placeholder="usuario@dominio.com"
        @tags-changed="newTags => tags = newTags"
      />
    </div>
    <div class="modal__footer">
      <button type="button" class="boton boton--cancelar" @click="hideModal"/>
      <button type="button" class="boton boton--verde" @click="invitarUsuarios()">
        <i class="fa fal fa-thumbs-up"/>
        <span>Enviar</span>
      </button>
    </div>
  </section>
</template>
<script>
import VueTagsInput from "@johmun/vue-tags-input";
import map from "lodash/map";
import D from "debug";

const debug = D("ciris:InvitarUsuarios.vue");

export default {
  name: "ModalInvitarUsuarios",
  components: {
    VueTagsInput,
  },
  computed: {
    usuario() {
      return this.$store.state.usuario.usuarioActivo;
    },
    cuenta() {
      return this.$store.state.cuenta.cuentaActiva;
    },
  },
  data,
  methods: {
    invitarUsuarios,
    hideModal() { return this.$store.commit("modal/hideModal"); },
  },
};

function data() {
  return {
    tag: "",
    tags: [],
    validation: [
      {
        type: "error",
        rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        disableAdd: true,
      },
    ],
  };
}

function invitarUsuarios() {
  debug("invitarUsuarios");
  const comp = this;
  const correos = map(this.tags, "text");
  debug(`Enviando invitaciones a ${correos.length} correos`);
  return this.$store.dispatch("cuenta/invitarUsuarios", {
    usuario: this.usuario,
    cuenta: this.cuenta,
    correos,
  })
    .then(() => {
      comp.tag = "";
      comp.tags = [];
      this.hideModal();
      return comp;
    });
}
</script>
