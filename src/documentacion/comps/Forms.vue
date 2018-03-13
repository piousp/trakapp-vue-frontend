<template lang="html">
  <div class="grid">
    <div class="col-md-6">
      <h1 class="titulo">Forms</h1>
      <h2 class="h2">Por defecto, los forms toman el 100% del espacio</h2>
      <div class="form">
        <div class="form__group">
          <label class="form__label" for="prueba">Input form normal</label>
          <input type="text" id="prueba" class="form__input" :required="true">
        </div>
        <div class="form__group">
          <label class="form__label" for="prueba1">Select form normal</label>
          <select name="" id="prueba1" class="form__input">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div class="form__group form__group--error">
          <label class="form__label" for="otro">Input form con error</label>
          <input type="text" id="otro" class="form__input">
        </div>
        <div class="form__group">
          <label class="form__label" for="otro2">Input deshabilitado</label>
          <input type="text" id="otro2" class="form__input" :disabled="true">
        </div>
        <div class="form__group">
          <label class="form__label" for="prueba2">Textarea form normal</label>
          <textarea id="prueba2" name="prueba2" rows="8" cols="40" class="form__input"/>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <pre class="html" >
        <code style="display:block;" >
          <h2>Ejemplo Básico</h2>
          &lt;section class="form"&gt;  &lt;!-- TODO form debe empezar con la clase form --&gt;
          &lt;div class="form__group"&gt;
          &lt;!-- form__group delimita un conjunto de input + label --&gt;
          &lt;label class="form__label" for="prueba"&gt;
          Input form normal&lt;/label&gt;  &lt;!-- form__label --&gt;
          &lt;input type="text" id="prueba" class="form__input"
          :required="true"&gt;  &lt;!-- form__input es el
          estilo de cualquier elemento input, select, textarea --&gt;
          &lt;/div&gt;
          &lt;/section&gt;
        </code>
      </pre>
      <pre class="html" >
        <code style="display:block;">
          <h2>Ejemplo de input con error</h2>
          &lt;section class="form"&gt;
          &lt;div class="form__group <strong>form__group--error</strong>"
          &gt;  &lt;!-- form__group--error es la clase mágica --&gt;
          &lt;label class="form__label" for="prueba"&gt;Input form normal&lt;/label&gt;
          &lt;input type="text" id="prueba" class="form__input" :required="true"&gt;
          &lt;/div&gt;
          &lt;/section&gt;
        </code>
      </pre>
    </div>
  </div>
</template>
