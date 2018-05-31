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
        v-validate="'required|passwordBueno'">
      <label for="password" class="form__label">Ingrese su contraseña</label>
      <meter max="4" class="password-strength-meter" :value="calidadPassword.score"/>
    </form-group>
    <div v-if="password">
      <p class="form__help text--gris8">Fuerza de la contraseña: {{ textoCalidadPassword }}</p>
      <p class="form__help text--extra-small text--ambar" v-if="calidadPassword.feedback.warning">
        Advertencia: {{ advertencia(calidadPassword.feedback.warning) }}
      </p>
    </div>
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
    <p v-if="errors.has(ids.password)" class="form__error-message">
      La contraseña debe ser buena o fuerte
    </p>
    <p v-if="errors.has(ids.password2)" class="form__error-message">
      Las contraseñas no coinciden
    </p>
  </div>
</template>

<script>
import D from "debug";
import { Validator } from "vee-validate";
import zxcvbn from "zxcvbn";
import id from "../ids.js";

const debug = D("ciris:Password.vue");

Validator.extend("passwordBueno", value => zxcvbn(value).score > 2);

export default {
  props: {
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  data,
  computed: {
    calidadPassword,
    textoCalidadPassword,
  },
  created,
  methods: {
    advertencia,
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

function calidadPassword() {
  return zxcvbn(this.password);
}

function emitirPassword() {
  this.$validator.validateAll().then((valido) => {
    if (valido) {
      debug("Emitiendo el password", this.password);
      this.$emit("password", this.password);
    }
    return this.$emit("password", null);
  })
    .catch(err => debug(err));
}

function advertencia(text) {
  const te = {
    "Short keyboard patterns are easy to guess":
      "Patrones cortos de teclado son muy fáciles de adivinar",
    "Sequences like abc or 6543 are easy to guess":
      "Secuencias como 'abc' o '6543' son muy fáciles de adivinar",
    "This is a top-100 common password":
      "Esta es una de las contraseñas más usadas y por ende, muy fácil de adivinar",
    "This is similar to a commonly used password":
      "Es muy similar a las contraseñas más usadas y por ende, muy fácil de adivinar",
    "Names and surnames by themselves are easy to guess":
      "Nombres y apellidos por sí mismos son muy fáciles de adivinar",
    "This is a very common password":
      "Esta es una contraseña muy común y por ende, muy fácil de adivinar",
    "Repeats like \"aaa\" are easy to guess":
      "Repeticiones como 'aaa' son muy fáciles de adivinar",
    "Common names and surnames are easy to guess":
      "Nombres y apellidos comunes son muy fáciles de adivinar",
    "Straight rows of keys are easy to guess":
      "Una fila de teclas seguidas es muy simple",
    "A word by itself is easy to guess":
      "Una palabra por sí sola es muy simple",
    "Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\"":
      "Repeticiones como `abcabcabc` son sólo un poco más fáciles de adivinar que `abc`",
  };
  return te[text] ? te[text] : text;
}

function textoCalidadPassword() {
  const fuerza = {
    0: "Muy Mala",
    1: "Mala",
    2: "Regular",
    3: "Buena",
    4: "Muy Buena",
  };
  return fuerza[this.calidadPassword.score];
}
</script>

<style lang="scss" scoped="scoped">

@import "../../sass/base/colores";
@import "../../sass/tema/colores";

.form__help{
}

.password-strength-meter{
  position: absolute;
  bottom: -4px;
  left: 0;
}

meter {
  /* Reset the default appearance */
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;

  margin: 0;
  width: 100%;
  height: 0.5em;

  /* Applicable only to Firefox */
  background: none;
  background-color: transparentize($blanco, .8);
  border: 1px solid $negro4;
}

meter::-webkit-meter-bar {
  background: none;
  background-color: transparentize($blanco, .8);
}

meter[value="1"]::-webkit-meter-optimum-value { background: $rosado-vivo; }
meter[value="2"]::-webkit-meter-optimum-value { background: $ambar-vivo; }
meter[value="3"]::-webkit-meter-optimum-value { background: $kiwi-vivo; }
meter[value="4"]::-webkit-meter-optimum-value { background: $indigo-vivo; }

/* Gecko based browsers */
meter[value="1"]::-moz-meter-bar { background: $rosado-vivo; }
meter[value="2"]::-moz-meter-bar { background: $ambar-vivo; }
meter[value="3"]::-moz-meter-bar { background: $kiwi-vivo; }
meter[value="4"]::-moz-meter-bar { background: $indigo-vivo; }
</style>
