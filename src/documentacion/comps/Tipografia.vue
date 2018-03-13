<template lang="html">
  <section>
    <h1 class="titulo">Tipografía</h1>
    <div class="grid grid--bleed">
      <div class="col-sm-auto">
        <h2 class="h2">Texto regular</h2>
        <p class="text">
          El texto regular, puede ir en un <code>p</code>,
          un <code>span</code>, un <code>label</code> o cualquier otro elemento para textos.
        </p>
        <p class="text">
          La clase para texto genérico es <code>text</code>.
          <span class="text--bold text--uppercase">TODO</span>
          texto debe tener una clase o de lo contrario se va a ver feo
        </p>
      </div>
      <div class="col-sm-auto">
        <h2 class="h2">Alineamiento</h2>
        <p class="text text--left">Alineado a la izquierda <code>text--left</code></p>
        <p class="text text--center">Alineado al centro <code>text--center</code></p>
        <p class="text text--right">Alineado a la derecha <code>text--right</code></p>
        <p class="text text--justify">Justificado <code>text--justify</code></p>
      </div>
    </div>
    <div class="grid grid--bleed">
      <div class="col-sm-auto">
        <h2 class="h2">Tamaños</h2>
        <p class="text text--extra-big">Extra Grande <code>text--extra-big</code></p>
        <p class="text text--big">Extra Grande <code>text--big</code></p>
        <p class="text">Tamaño regular <code>text</code></p>
        <p class="text text--small">Pequeño <code>text--extra-small</code></p>
        <p class="text text--extra-small">Extra Pequeño <code>text--extra-small</code></p>
      </div>
      <div class="col-sm-auto">
        <h2 class="h2">Modificadores</h2>
        <p class="text text--bold">Esto es un texto en negrita <code>text--bold</code></p>
        <p class="text text--italic">Esto es un texto en itálica <code>text--italic</code></p>
        <p class="text text--capitalize">
          Esto es un texto capitalizado <code>text--capitalize</code>
        </p>
        <p class="text text--uppercase">
          Esto es un texto en mayúsculas <code>text--uppercase</code>
        </p>
      </div>
    </div>
    <div class="grid grid--bleed">
      <div class="col-sm-auto">
        <h2 class="h2">Colores</h2>
        <div class="grid__cell">
          <span class="text text--lila">text--lila</span>
          <span class="text text--morado">text--morado</span>
          <span class="text text--indigo">text--indigo</span>
          <span class="text text--azul">text--azul</span>
          <span class="text text--celeste">text--celeste</span>
          <span class="text text--cyan">text--cyan</span>
          <span class="text text--turquesa">text--turquesa</span>
          <span class="text text--verde">text--verde</span>
          <span class="text text--kiwi">text--kiwi</span>
          <span class="text text--amarillo">text--amarillo</span>
          <span class="text text--ambar">text--ambar</span>
          <span class="text text--naranja">text--naranja</span>
          <span class="text text--tomate">text--tomate</span>
          <span class="text text--rojo">text--rojo</span>
          <span class="text text--rosado">text--rosado</span>
          <span class="text text--lila">text--lila</span>
          <span class="text text--lila">text--lila</span>
        </div>
      </div>
      <div class="col-sm-auto">
        <h2 class="h2">Badges</h2>
        <div class="grid__cell">
          <span class="badge">Badge sin color</span>
          <span class="badge badge--lila">badge--lila</span>
          <span class="badge badge--morado">badge--morado</span>
          <span class="badge badge--indigo">badge--indigo</span>
          <span class="badge badge--azul">badge--azul</span>
          <span class="badge badge--celeste">badge--celeste</span>
          <span class="badge badge--cyan">badge--cyan</span>
          <span class="badge badge--turquesa">badge--turquesa</span>
          <span class="badge badge--verde">badge--verde</span>
          <span class="badge badge--kiwi">badge--kiwi</span>
          <span class="badge badge--amarillo">badge--amarillo</span>
          <span class="badge badge--ambar">badge--ambar</span>
          <span class="badge badge--naranja">badge--naranja</span>
          <span class="badge badge--tomate">badge--tomate</span>
          <span class="badge badge--rojo">badge--rojo</span>
          <span class="badge badge--rosado">badge--rosado</span>
          <span class="badge badge--lila">badge--lila</span>
          <span class="badge badge--lila">badge--lila</span>
        </div>
      </div>
    </div>
    <div>
      <h2 class="h2">Headers</h2>
      <p class="text">
        Las clases de los títulos se pueden aplicar independientemente
        del tipo de texto. Osea, puede ser un <code>p class="h3"</code>
        por ejemplo, y ese <code>p</code> tomará el estilo del h3.
      </p>
      <div class="grid grid--bleed">
        <div class="col-sm-auto">
          <h1 class="h1">Header H1 - Clase:<code>h1</code></h1>
          <h2 class="h2">Header H2 - Clase:<code>h2</code></h2>
          <h3 class="h3">Header H3 - Clase:<code>h3</code></h3>
          <h4 class="h4">Header H4 - Clase:<code>h4</code></h4>
          <h5 class="h5">Header H5 - Clase:<code>h5</code></h5>
        </div>
        <div class="col-sm-auto">
          <p class="text text--extra-small">
            Estos son los estilos por defecto; osea, no tienen la clase
            adecuada. <span class="text--bold">IMPORTANTE</span> recordar poner
            las clases h a los h
          </p>
          <h1>h1</h1>
          <h2>h2</h2>
          <h3>h3</h3>
          <h4>h4</h4>
          <h5>h5</h5>
        </div>
      </div>
    </div>
  </section>
</template>
