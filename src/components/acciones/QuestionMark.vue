<template>
  <section>
    <modal-bug ref="modalBug"/>
    <div class="text text--negro4">
      <div class="question__menu animated fadeIn" v-if="mostrarPopup">
        <div class="question__menu__header">
          <span>¿Qué desea hacer?</span>
          <span class="cerrar" @click="mostrarPopup = false"/>
        </div>
        <hr>
        <ul class="question__menu__list">
          <li @click="reportar">
            <i class="fa fa-fw fa-bug"/>&nbsp;Reportar un fallo
          </li>
        </ul>
      </div>
      <i class="far fa-2x fa-question-circle" @click="mostrarPopup = !mostrarPopup"/>
    </div>
  </section>
</template>

<script>
import ModalBug from "./ModalBug.vue";

function reportar() {
  this.$refs.modalBug.abrir();
  this.mostrarPopup = false;
}

export default {
  components: { ModalBug },
  data() {
    return {
      mostrarPopup: false,
    };
  },
  methods: {
    reportar,
  },
};
</script>

<style lang="scss">
.fa-question-circle {
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
.question__menu {
  background: white;
  position: absolute;
  right: 20px;
  min-width: 200px;
  height: 103px;
  bottom: 60px;
  z-index: 9;
  border-radius: 5px;
  padding: 10px 0;
  box-shadow: 0 0 10px #888;
}
.question__menu__header {
  margin-bottom: 6px;
  padding: 2px 8px 8px 8px;
  .cerrar {
    position: absolute;
    right: 8px;
    top: 3px;
    cursor: pointer;
    &::before {
      content: "\00d7";
      font-size: 24px;
    }
  }
}
.question__menu__list {
  list-style: none;
  padding-top: 10px;
  li {
    padding: 8px;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
}
</style>
