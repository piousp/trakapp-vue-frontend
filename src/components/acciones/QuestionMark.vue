<template>
  <section>
    <div class="text text--negro4">
      <div class="question__menu" v-if="mostrarPopup">
        <div class="question__menu__header">
          <span>¿Qué desea hacer?</span>
          <span class="cerrar" @click="mostrarPopup = false"/>
        </div>
        <hr>
        <ul class="question__menu__list">
          <li @click="reportar">
            <i class="fa fa-fw fa-bug"/>&nbsp;Reportar un fallo
          </li>
          <li @click="tutorial">
            <i class="fa fa-fw fa-sign"/>&nbsp;Ver tutorial
          </li>
        </ul>
      </div>
      <i class="far fa-2x fa-question-circle icono-ayuda" @click="mostrarPopup = !mostrarPopup"/>
    </div>
  </section>
</template>

<script>
import noop from "lodash/noop";
import tour from "../tour";

function reportar() {
  this.$store.commit("modal/showModal", {
    componentName: "ModalBug",
  });
  this.mostrarPopup = false;
}

function tutorial() {
  return tour(this.$router, 0, noop);
}

export default {
  name: "QuestionMark",
  data() {
    return {
      mostrarPopup: false,
    };
  },
  methods: {
    reportar,
    tutorial,
  },
};
</script>

<style lang="scss">
.icono-ayuda {
  position: fixed;
  right: 10px;
  bottom: 15px;
  cursor: pointer;
}
.question__menu {
  background: white;
  position: fixed;
  right: 20px;
  min-width: 175px;
  min-height: 96px;
  bottom: 60px;
  z-index: 9;
  border-radius: 5px;
  padding: 10px 0;
  box-shadow: 0 0 10px #888;
  font-size: 14px;
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
