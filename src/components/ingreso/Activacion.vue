<template>
  <section class="cuadro-ingreso">
    <div class="cuadro-ingreso__body text--center">
      <div class="text--center">
        <img src="/static/logo-peq-contra.png" class="logo-login img--center" alt="Trakapp Logo">
      </div>
      <div v-if="cargando">
        <i class="fa fa-spinner fa-spin fa-5x text--blanco"/>
        <p class="text text--blanco text--center">Activando cuenta...</p>
      </div>
      <div v-if="exito && !cargando">
        <h1 class="h3 text--lima text--center"><i class="fal fa-exclamation-circle fa-2x"/></h1>
        <p class="text text--blanco text--center">{{ resultado }}</p>
      </div>
      <div v-if="!exito && !cargando">
        <h1 class="h3 text--rojo text--center"><i class="fal fa-times-circle fa-2x"/></h1>
        <p class="text text--blanco text--center">
          Ha ocurrido un error al tratar de activar su cuenta.
        </p>
      </div>
      <div class="text--center">
        <button class="boton boton--celeste-tema" type="submit"
                @click="$router.replace({name: 'login'})">
          <i class="fa fa-fw fa-home"/>Ir a Inicio
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import D from "debug";
import axios from "../../config/axios";

const debug = D("ciris:Activacion.vue");

export default {
  name: "Activacion",
  data,
  mounted,
};

function data() {
  return {
    cargando: false,
    resultado: false,
    exito: false,
  };
}

function mounted() {
  const { id } = this.$router.currentRoute.params;
  this.cargando = true;
  return axios
    .get(`${axios.defaults.baseUrl}/api/auth/activacion/${id}`)
    .then((resp) => {
      this.resultado = resp.data;
      this.exito = true;
      return resp;
    })
    .catch((err) => {
      this.exito = false;
      debug("Error de verificación", err);
    })
    .finally(() => {
      this.cargando = false;
    });
}
</script>
<style src="./login.scss" lang="scss"/>
