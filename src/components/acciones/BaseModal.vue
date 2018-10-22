<template lang="html">
  <div class="backdrop" v-if="visible">
    <div class="modal" :class="{'modal--l' : params && params.grande}">
      <component :is="component" :params="params"/>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import D from "debug";
import modales from "./modalTemplates/importarModales";

const debug = D("ciris:BaseModal.vue");

export default {
  name: "AppModal",
  data() {
    return {
      component: null,
    };
  },
  computed: {
    visible() { return this.$store.state.storeModal.modalVisible; },
    modalComponent() { return this.$store.state.storeModal.modalComponent; },
    params() { return this.$store.state.storeModal.params; },
  },
  watch: {
    modalComponent(componentName) {
      debug(`Cargando: ${componentName}`);
      if (!componentName) return;

      Vue.component(componentName, modales[componentName]);

      this.component = componentName;
    },
    /* visible(newV) {
      if (newV) {
        debug("Se agrega un evento para oir ESC para cerrar el modal");
        return window.addEventListener("keydown", this.listener);
      }
      debug("Se remueve el evento para oir ESC para cerrar el modal");
      return window.removeEventListener("keydown", this.listener);
    }, */
  },
  /* methods: {
    listener(e) {
      if (e.key === "Escape") {
        this.$store.commit("storeModal/hideModal");
      }
    },
  }, */
};
</script>
