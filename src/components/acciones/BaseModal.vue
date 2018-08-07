<template lang="html">
  <div class="backdrop" v-if="visible">
    <div class="modal">
      <component :is="component"/>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import D from "debug";
import SelectCuenta from "./modalTemplates/SelectCuenta.vue";
import InvitarUsuarios from "./modalTemplates/InvitarUsuarios.vue";

const debug = D("ciris:BaseModal.vue");

const modales = {
  SelectCuenta,
  InvitarUsuarios,
};

export default {

  name: "AppModal",
  data() {
    return {
      component: null,
    };
  },
  computed: {
    visible() { return this.$store.state.modal.modalVisible; },
    modalComponent() { return this.$store.state.modal.modalComponent; },
  },
  watch: {
    modalComponent(componentName) {
      debug(`Cargando: ${componentName}`);
      if (!componentName) return;

      Vue.component(componentName, modales[componentName]);

      this.component = componentName;
    },
  },
};
</script>
