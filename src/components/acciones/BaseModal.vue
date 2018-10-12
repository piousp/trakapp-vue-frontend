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
  },
};
</script>
