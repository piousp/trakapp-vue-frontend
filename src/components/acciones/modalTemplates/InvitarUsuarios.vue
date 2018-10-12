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
import cloneDeep from "lodash/cloneDeep";
import map from "lodash/map";
import D from "debug";

const debug = D("ciris:InvitarUsuarios.vue");

export default {
  name: "ModalInvitarUsuarios",
  components: {
    VueTagsInput,
  },
  data,
  methods: {
    invitarUsuarios,
    hideModal() { return this.$store.commit("storeModal/hideModal"); },
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
  const comp = this;
  const correos = map(this.tags, "text");
  const usuario = cloneDeep(this.usuario);
  usuario.cuenta = cloneDeep(this.cuenta);
  debug(`Enviando invitaciones a ${correos.length} correos`);
  return this.$store.dispatch("storeCuenta/invitarUsuarios", { usuario, correos })
    .then(() => {
      comp.tag = "";
      comp.tags = [];
      return comp;
    });
}
</script>
