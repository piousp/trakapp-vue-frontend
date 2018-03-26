<template lang="html">
  <section>
    <h1 class="titulo">Checks, switchs y radios</h1>
    <div class="grid">
      <div class="col-md-auto">
        <pre class="html">
          <code style="display: block;">
            Para un checkbox regular
            El id del input y el for del label DEBEN ser iguales!
            &lt;div class="checkbox"&gt;
            &lt;input type="checkbox" id="checkbox" checked="true"&gt;
            &lt;label class="form__label" for="checkbox"&gt;
            Input form normal
            &lt;/label&gt;
            &lt;/div&gt;

            Para un checkbox de color, la clase es checkbox--color
            &lt;div class="checkbox checkbox--morado"&gt;
            &lt;input type="checkbox" id="checkbox" checked="true"&gt;
            &lt;label class="form__label" for="checkbox"&gt;
            Input form normal
            &lt;/label&gt;
            &lt;/div&gt;
          </code>
        </pre>
      </div>
      <div class="col-md-auto">
        <pre class="html">
          <code style="display: block;">
            Para un switch regular
            El id del input y el for del label DEBEN ser iguales!
            &lt;div class="switch"&gt;
            &lt;input type="checkbox" id="checkbox" checked="true"&gt;
            &lt;label class="form__label" for="checkbox"&gt;
            Input form normal
            &lt;/label&gt;
            &lt;/div&gt;

            //Para un switch de color, la clase es switch--color
            &lt;div class="switch switch--morado"&gt;
            &lt;input type="checkbox" id="checkbox" checked="true"&gt;
            &lt;label class="form__label" for="checkbox"&gt;
            Input form normal
            &lt;/label&gt;
            &lt;/div&gt;
          </code>
        </pre>
      </div>
      <div class="col-md-auto">
        <pre class="html">
          <code style="display: block;">
            Para un radio-button regular
            El id del input y el for del label DEBEN ser iguales!
            Los radio buttons deben llevar el mismo <code>name</code> para que sea un grupo

            &lt;div class="radio"&gt;
            &lt;input type="radio" name="grupo" id="radio" checked="true"&gt;
            &lt;label class="form__label" for="radio"&gt;
            Input form normal
            &lt;/label&gt;
            &lt;/div&gt;

            //Para un radio de color, la clase es radio--color
            &lt;div class="radio radio--morado"&gt;
            &lt;input type="radio" id="radio" checked="true"&gt;
            &lt;label class="form__label" for="radio"&gt;
            Input form normal
            &lt;/label&gt;
            &lt;/div&gt;
          </code>
        </pre>
      </div>
    </div>
    <div class="grid">
      <div class="col-md-auto">

        <div class="checkbox">
          <input type="checkbox" id="checkbox" checked="true">
          <label class="form__label" for="checkbox">Input form normal</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="checkbox-dis" checked="true" :disabled="true">
          <label class="form__label" for="checkbox-dis">Deshabilitado</label>
        </div>
        <div class="checkbox checkbox--lila">
          <input type="checkbox" id="checkboxlila" checked="true">
          <label class="form__label" for="checkboxlila">checkbox--lila</label>
        </div>
        <div class="checkbox checkbox--morado">
          <input type="checkbox" id="checkboxmorado" checked="true">
          <label class="form__label" for="checkboxmorado">checkbox--morado</label>
        </div>
        <div class="checkbox checkbox--indigo">
          <input type="checkbox" id="checkboxindigo" checked="true">
          <label class="form__label" for="checkboxindigo">checkbox--indigo</label>
        </div>
        <div class="checkbox checkbox--azul">
          <input type="checkbox" id="checkboxazul" checked="true">
          <label class="form__label" for="checkboxazul">checkbox--azul</label>
        </div>
        <div class="checkbox checkbox--celeste">
          <input type="checkbox" id="checkboxceleste" checked="true">
          <label class="form__label" for="checkboxceleste">checkbox--celeste</label>
        </div>
        <div class="checkbox checkbox--cyan">
          <input type="checkbox" id="checkboxcyan" checked="true">
          <label class="form__label" for="checkboxcyan">checkbox--cyan</label>
        </div>
        <div class="checkbox checkbox--turquesa">
          <input type="checkbox" id="checkboxtru" checked="true">
          <label class="form__label" for="checkboxtru">checkbox--turquesa</label>
        </div>
        <div class="checkbox checkbox--verde">
          <input type="checkbox" id="checkboxverde" checked="true">
          <label class="form__label" for="checkboxverde">checkbox--verde</label>
        </div>
        <div class="checkbox checkbox--kiwi">
          <input type="checkbox" id="checkboxkiwi" checked="true">
          <label class="form__label" for="checkboxkiwi">checkbox--kiwi</label>
        </div>
        <div class="checkbox checkbox--lima">
          <input type="checkbox" id="checkboxlima" checked="true">
          <label class="form__label" for="checkboxlima">checkbox--lima</label>
        </div>
        <div class="checkbox checkbox--amarillo">
          <input type="checkbox" id="checkboxamarillo" checked="true">
          <label class="form__label" for="checkboxamarillo">checkbox--amarillo</label>
        </div>
        <div class="checkbox checkbox--ambar">
          <input type="checkbox" id="checkboxambar" checked="true">
          <label class="form__label" for="checkboxambar">checkbox--ambar</label>
        </div>
        <div class="checkbox checkbox--naranja">
          <input type="checkbox" id="checkboxnaranaj" checked="true">
          <label class="form__label" for="checkboxnaranaj">checkbox--naranja</label>
        </div>
        <div class="checkbox checkbox--tomate">
          <input type="checkbox" id="checkboxtomate" checked="true">
          <label class="form__label" for="checkboxtomate">checkbox--tomate</label>
        </div>
        <div class="checkbox checkbox--rojo">
          <input type="checkbox" id="checkboxrojo" checked="true">
          <label class="form__label" for="checkboxrojo">checkbox--rojo</label>
        </div>
        <div class="checkbox checkbox--rosado">
          <input type="checkbox" id="checkboxrosado" checked="true">
          <label class="form__label" for="checkboxrosado">checkbox--rosado</label>
        </div>
      </div>
      <div class="col-md-auto">
        <div class="switch">
          <input type="checkbox" id="switch">
          <label class="form__label" for="switch">Input form normal</label>
        </div>
        <div class="switch">
          <input type="checkbox" id="switch-dis" :disabled="true">
          <label class="form__label" for="switch-dis">Deshabilitado</label>
        </div>
        <div class="switch">
          <input type="checkbox" id="switch-dis2" :disabled="true" checked="true">
          <label class="form__label" for="switch-dis2">Deshabilitado activado</label>
        </div>
        <div class="switch switch--lila">
          <input type="checkbox" id="switchld" checked="true" :disabled="true">
          <label class="form__label" for="switchld">Deshabilitado activado con color</label>
        </div>
        <div class="switch switch--lila">
          <input type="checkbox" id="switchl" checked="true">
          <label class="form__label" for="switchl">switch--lila</label>
        </div>
        <div class="switch switch--morado">
          <input type="checkbox" id="switchm" checked="true">
          <label class="form__label" for="switchm">switch--morado</label>
        </div>
        <div class="switch switch--indigo">
          <input type="checkbox" id="switchi" checked="true">
          <label class="form__label" for="switchi">switch--indigo</label>
        </div>
        <div class="switch switch--azul">
          <input type="checkbox" id="switcha" checked="true">
          <label class="form__label" for="switcha">switch--azul</label>
        </div>
        <div class="switch switch--celeste">
          <input type="checkbox" id="switchce" checked="true">
          <label class="form__label" for="switchce">switch--celeste</label>
        </div>
        <div class="switch switch--cyan">
          <input type="checkbox" id="switchcy" checked="true">
          <label class="form__label" for="switchcy">switch--cyan</label>
        </div>
        <div class="switch switch--turquesa">
          <input type="checkbox" id="switchtu" checked="true">
          <label class="form__label" for="switchtu">switch--turquesa</label>
        </div>
        <div class="switch switch--verde">
          <input type="checkbox" id="switchv" checked="true">
          <label class="form__label" for="switchv">switch--verde</label>
        </div>
        <div class="switch switch--kiwi">
          <input type="checkbox" id="switchk" checked="true">
          <label class="form__label" for="switchk">switch--kiwi</label>
        </div>
        <div class="switch switch--lima">
          <input type="checkbox" id="switchli" checked="true">
          <label class="form__label" for="switchli">switch--lima</label>
        </div>
        <div class="switch switch--amarillo">
          <input type="checkbox" id="switcham" checked="true">
          <label class="form__label" for="switcham">switch--amarillo</label>
        </div>
        <div class="switch switch--ambar">
          <input type="checkbox" id="switchmb" checked="true">
          <label class="form__label" for="switchmb">switch--ambar</label>
        </div>
        <div class="switch switch--naranja">
          <input type="checkbox" id="switchna" checked="true">
          <label class="form__label" for="switchna">switch--naranja</label>
        </div>
        <div class="switch switch--tomate">
          <input type="checkbox" id="switchto" checked="true">
          <label class="form__label" for="switchto">switch--tomate</label>
        </div>
        <div class="switch switch--rojo">
          <input type="checkbox" id="switchro" checked="true">
          <label class="form__label" for="switchro">switch--rojo</label>
        </div>
        <div class="switch switch--rosado">
          <input type="checkbox" id="switchrs" checked="true">
          <label class="form__label" for="switchrs">switch--rosado</label>
        </div>
      </div>
      <div class="col-md-auto">
        <div class="radio">
          <input type="radio" name="grupo" id="radio">
          <label class="form__label" for="radio">Input form normal</label>
        </div>
        <div class="radio">
          <input type="radio" name="grupo" id="radio-dis" :disabled="true">
          <label class="form__label" for="radio-dis">Deshabilitado</label>
        </div>
        <div class="radio radio--lila">
          <input type="radio" name="grupo" id="radiol" >
          <label class="form__label" for="radiol">radio--lila</label>
        </div>
        <div class="radio radio--morado">
          <input type="radio" name="grupo" id="radiom" >
          <label class="form__label" for="radiom">radio--morado</label>
        </div>
        <div class="radio radio--indigo">
          <input type="radio" name="grupo" id="radioi" >
          <label class="form__label" for="radioi">radio--indigo</label>
        </div>
        <div class="radio radio--azul">
          <input type="radio" name="grupo" id="radioa" >
          <label class="form__label" for="radioa">radio--azul</label>
        </div>
        <div class="radio radio--celeste">
          <input type="radio" name="grupo" id="radioce" >
          <label class="form__label" for="radioce">radio--celeste</label>
        </div>
        <div class="radio radio--cyan">
          <input type="radio" name="grupo" id="radiocy" >
          <label class="form__label" for="radiocy">radio--cyan</label>
        </div>
        <div class="radio radio--turquesa">
          <input type="radio" name="grupo" id="radiotu" >
          <label class="form__label" for="radiotu">radio--turquesa</label>
        </div>
        <div class="radio radio--verde">
          <input type="radio" name="grupo" id="radiov" >
          <label class="form__label" for="radiov">radio--verde</label>
        </div>
        <div class="radio radio--kiwi">
          <input type="radio" name="grupo" id="radiok" >
          <label class="form__label" for="radiok">radio--kiwi</label>
        </div>
        <div class="radio radio--lima">
          <input type="radio" name="grupo" id="radioli" >
          <label class="form__label" for="radioli">radio--lima</label>
        </div>
        <div class="radio radio--amarillo">
          <input type="radio" name="grupo" id="radioam" >
          <label class="form__label" for="radioam">radio--amarillo</label>
        </div>
        <div class="radio radio--ambar">
          <input type="radio" name="grupo" id="radiomb" >
          <label class="form__label" for="radiomb">radio--ambar</label>
        </div>
        <div class="radio radio--naranja">
          <input type="radio" name="grupo" id="radiona" >
          <label class="form__label" for="radiona">radio--naranja</label>
        </div>
        <div class="radio radio--tomate">
          <input type="radio" name="grupo" id="radioto" >
          <label class="form__label" for="radioto">radio--tomate</label>
        </div>
        <div class="radio radio--rojo">
          <input type="radio" name="grupo" id="radioro" >
          <label class="form__label" for="radioro">radio--rojo</label>
        </div>
        <div class="radio radio--rosado">
          <input type="radio" name="grupo" id="radiors" checked="true">
          <label class="form__label" for="radiors">radio--rosado</label>
        </div>
      </div>
    </div>
  </section>
</template>
