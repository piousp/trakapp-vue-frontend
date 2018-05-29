<template lang="html">
  <div>
    <form-group :error="errors.has('password') && submitted">
      <input
        type="password"
        :id="ids.password"
        :name="ids.password"
        value=""
        required
        v-model="password"
        v-validate="{ length: 6 }">
      <label for="password" class="form__label">Ingrese su contraseña</label>
      <p class="form__help">Debe contener un mínimo de 6 caracteres</p>
    </form-group>
    <form-group :error="errors.has('password2') && submitted">
      <input
        type="password"
        :id="ids.password2"
        :name="ids.password2"
        value=""
        required
        v-model="password2"
        v-validate="{ is: password }">
      <label :for="password2" class="form__label">Confirme su contraseña</label>
    </form-group>
  </div>
</template>

<script>
import id from "../ids.js";

export default {
  data,
  created,
};

function data() {
  return {
    ids: {},
    password: "",
    password2: "",
    submitted: false,
  };
}

function created() {
  this.ids = {
    password: `password-${id()}`,
    password2: `password2-${id()}`,
  };
}
</script>

<style lang="scss">
</style>
