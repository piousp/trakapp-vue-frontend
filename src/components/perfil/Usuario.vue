<template lang="html">
  <section>
    <div class="botones-pagina">
      <button class="boton boton--rosado" @click="logout">
        <i class="fal fa-sign-out"/>
        <span>Cerrar sesión</span>
      </button>
    </div>
    <h2 class="h3"><strong class="text--bold">Info</strong>rmación de mi usuario</h2>
    <div class="grid">
      <div class="col-md-6">
        <h3 class="h4">Datos básicos</h3>
        <form novalidate @submit.stop.prevent="guardarUsuario(usuario)">
          <form-group>
            <label for="" class="form__label">Correo</label>
            <p class="form__input">{{ usuario.correo }}</p>
          </form-group>
          <form-group>
            <input type="text" class="form__input" v-model="usuario.nombre" required>
            <label for="" class="form__label">Nombre</label>
          </form-group>
          <form-group>
            <input type="text" class="form__input" v-model="usuario.apellidos" required>
            <label for="" class="form__label">Apellidos</label>
          </form-group>
          <button type="submit" class="boton boton--guardar"/>
        </form>
      </div>
      <div class="col-md-6">
        <h3 class="h4">Cambiar mi contraseña</h3>
        <form novalidate @submit.stop.prevent="mostrarModalCambioClave(claveActual)">
          <form-group>
            <input type="password" class="form__input" v-model="claveActual" required>
            <label for="" class="form__label">Contraseña actual</label>
          </form-group>
          <button type="submit" class="boton boton--azul">
            <i class="fa far fa-key"/>
            <span>Nueva contraseña</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import D from "debug";

const debug = D("ciris:Usuario.vue");

export default {
  name: "Usuario",
  data,
  computed: {
    sUsuario() {
      return this.$store.state.usuario.usuarioActivo;
    },
  },
  watch: {
    sUsuario: {
      handler(newVal) {
        this.usuario = cloneDeep(newVal);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    logout,
    guardarUsuario,
    mostrarModalCambioClave,
    finalizar,
  },
};

function data() {
  return {
    usuario: {},
    claveActual: "",
  };
}

function logout() {
  this.$auth.logout();
  this.$router.push("/login");
}

function mostrarModalCambioClave(claveActual) {
  return this.$auth.verificarPasswordCorrecto(claveActual)
    .then((resp) => {
      debug(resp);
      return this.$store.commit("modal/showModal", {
        componentName: "modalPassword",
        params: {
          aceptar: this.finalizar,
        },
      });
    })
    .catch((error) => {
      debug(error);
      this.$toastr("error", "La contraseña proporcionada no corresponde", "Error");
      return null;
    })
    .finally(() => {
      this.finalizar();
    });
}

function finalizar() {
  this.claveActual = "";
}

function guardarUsuario(usuario) {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      this.$store.dispatch("perfil/actualizarDatosUsuario", usuario)
        .then((resp) => {
          debug(resp);
          this.$toastr("success", "La información ha sido guardada", "Éxito");
          this.usuario = cloneDeep(this.$store.state.perfil.usuario);
          return resp;
        })
        .catch((err) => {
          debug(err);
          this.$toastr("error", "Error al guardar sus datos", "Error");
        });
    }
    return null;
  });
}
</script>

<style lang="scss">
</style>
