<template lang="html">
  <div>
    <!-- Esto es EL HACK para que el autocomplete del browser se confunda y no me joda el form -->
    <input type="text" style="opacity:0;position:absolute;height:0;">
    <input type="password" name="hack-password" id="hack-password"
           style="opacity:0;position:absolute;height:0;">
    <form-group :error="errors.has(ids.password) ||
      (submitted && errors.has(ids.password)) ||
    (submitted && !password)">
      <i class="fa-eye form__icon form__icon--clickeable"
         :class="verPass ? 'fas form__icon--active' : 'fal'"
         @click="verPass =! verPass"/>
      <input
        :type="verPass ? 'text' : 'password'"
        class="form__input form__input--password"
        data-vv-as="Contraseña"
        :id="ids.password"
        :name="ids.password"
        autocomplete="false"
        required
        v-model.trim="password"
        v-validate="{ required: true, regex: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/g }">
      <label for="password" class="form__label">Ingrese su contraseña</label>
    </form-group>
    <form-group :error="errors.has(ids.password2)">
      <input
        :type="verPass ? 'text' : 'password'"
        class="form__input"
        data-vv-as="confirmación de la Contraseña"
        :id="ids.password2"
        :name="ids.password2"
        value=""
        required
        v-model.trim="password2"
        @change="emitirPassword"
        v-validate="{ is: password }">
      <label :for="password2" class="form__label">Confirme su contraseña</label>
    </form-group>
    <p v-if="errors.has(ids.password)" class="form__error-message text--left">
      Debe ser alfanumérica de 8 caracteres
    </p>
    <p v-if="errors.has(ids.password2)" class="form__error-message text--left">
      Las contraseñas no coinciden
    </p>
  </div>
</template>

<script>
import D from "debug";
import id from "../ids.js";

const debug = D("ciris:Password.vue");

export default {
  name: "Password",
  props: {
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  data,
  created,
  methods: {
    emitirPassword,
  },
};

function data() {
  return {
    ids: {},
    verPass: false,
    password: "",
    password2: "",
  };
}

function created() {
  this.ids = {
    password: `password-${id()}`,
    password2: `password2-${id()}`,
  };
}

function emitirPassword() {
  debug("Verificando antes de emitir");
  this.$validator.validateAll().then((valido) => {
    if (valido) {
      debug("Emitiendo el password", this.password);
      return this.$emit("password", this.password);
    }
    return this.$emit("password", null);
  })
    .catch(err => debug(err));
}
</script>
