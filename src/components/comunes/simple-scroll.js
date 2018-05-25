import Vue from "vue";
import SimpleBar from "simplebar";

const dir = {
  componentUpdated(el) {
    return new SimpleBar(el);
  },
};

Vue.directive("simplebar", dir);
export default dir;
