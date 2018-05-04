<template lang="html">
  <section>
    <h1 class="titulo">Configuración y Perfil</h1>
    <div class="grid">
      <div class="col-6">
        <h2 class="subtitulo">Datos de usuario</h2>
        <form-group>
          <label for="" class="form__label">Correo</label>
          <p class="form__input">asdasd</p>
        </form-group>
        <form-group>
          <label for="" class="form__label">Nombre</label>
          <input type="text" class="form__input">
        </form-group>
        <form-group>
          <label for="" class="form__label">Apellidos</label>
          <input type="text" class="form__input">
        </form-group>
      </div>

      <div class="col-6">
        <h2 class="subtitulo">Datos de la cuenta</h2>
        <form-group>
          <label for="" class="form__label">Correo</label>
          <p class="form__input">asdasd</p>
        </form-group>
        <form-group>
          <label for="" class="form__label">Nombre</label>
          <input type="text" class="form__input">
        </form-group>
        <form-group>
          <label for="" class="form__label">Cédula</label>
          <input type="text" class="form__input">
        </form-group>
        <form-group>
          <label for="" class="form__label">Dirección</label>
          <textarea class="form__input"/>
        </form-group>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data,
};

function data() {
  return {
    perfil: {},
  };
}
</script>

<style lang="scss">
</style>
