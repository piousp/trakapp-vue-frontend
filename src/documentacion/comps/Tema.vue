<template lang="html">
  <section>
    <h1 class="titulo">Opciones de tema</h1>
    <p class="text text--big">
      Estas opciones son para mantener una estructura estándar de colores.
    </p>
    <section>
      <h2 class="subtitulo">Botones</h2>
      <p class="text">
        Estos son los botones basicos para la aplicación.
        Deben tener la clase <code>boton</code> y su modificador correspondiente,
        por ejemplo: <code>boton--guardar</code>
        El texto del boton, el ícono y todo lo demás es provisto a punta de css.
      </p>
      <p class="text">
        <code>&lt;button class="boton boton--guardar"&gt;&lt;/button&gt;</code>
      </p>
      <button class="boton boton--guardar"/>
      <button class="boton boton--nuevo"/>
      <button class="boton boton--cancelar"/>
      <button class="boton boton--eliminar"/>
      <button class="boton boton--editar"/>
      <button class="boton boton--buscar"/>
      <button class="boton boton--siguiente"/>
      <button class="boton boton--anterior"/>
      <button class="boton boton--volver"/>
      <button class="boton boton--excel"/>
    </section>
    <section>
      <h2 class="subtitulo">Títulos</h2>
      <p class="text">
        Los títulos se usan para estructurar con órden los componentes de una página cualquiera.
      </p>
      <p class="text">
        Normalmente, debería haber sólo 1 título por página, ya que representa la acción
        principal o los datos en patalla.
        Por ejemplo, en la pantalla que se muestra la lista de usuarios,
        el título puede ser: <code>&lt;h1 class="titulo"&gt;Lista de Usuarios&lt;/h1&gt;</code>
      </p>
      <h1 class="h1 titulo">Título</h1>
      <h2 class="subtitulo">Sub-Título</h2>
      <h2 class="subtitulo-terciario">Sub-Título de tercer nivel</h2>
    </section>
  </section>
</template>
