<template lang="html">
  <section>
    <h1 class="titulo">Botones</h1>
    <div>
      <h2 class="h2">Bloque</h2>
      <p class="text">La clase de básica de todo botón es <code>boton</code> </p>
      <p class="text">Esta clase puede ser usada en cualquier tag html (button, input, a, etc)</p>
      <button class="boton">
        Esto es un boton feo
      </button>
      <p class="text">Los botones, tienen un comportamiento
      por defecto: desaparecen cualquier <code>span</code>
      dentro de ellos en dispositivos móbiles.</p>
      <button class="boton">
        <i class="fa fa-fw fa-phone"/>
        <span>Este texto desaparece en celulares</span>
      </button>
    </div>
    <div >
      <h2 class="h2">Modificadores</h2>
      <div class="grid grid--bleed">
        <div class="col-sm-auto">
          <h3 class="h3">Colores</h3>
          <div class="grid__cell">
            <button class="boton boton--morado">
              <i class="fa fa-fw fa-download"/>
              <span>boton--morado</span>
            </button>
            <button class="boton boton--indigo">
              <i class="fa fa-fw fa-download"/>
              <span>boton--indigo</span>
            </button>
            <button class="boton boton--azul">
              <i class="fa fa-fw fa-download"/>
              <span>boton--azul</span>
            </button>
            <button class="boton boton--celeste">
              <i class="fa fa-fw fa-download"/>
              <span>boton--celeste</span>
            </button>
            <button class="boton boton--cyan">
              <i class="fa fa-fw fa-download"/>
              <span>boton--cyan</span>
            </button>
            <button class="boton boton--turquesa">
              <i class="fa fa-fw fa-download"/>
              <span>boton--turquesa</span>
            </button>
            <button class="boton boton--verde">
              <i class="fa fa-fw fa-download"/>
              <span>boton--verde</span>
            </button>
            <button class="boton boton--kiwi">
              <i class="fa fa-fw fa-download"/>
              <span>boton--kiwi</span>
            </button>
            <button class="boton boton--lima">
              <i class="fa fa-fw fa-download"/>
              <span>boton--lima</span>
            </button>
            <button class="boton boton--amarillo">
              <i class="fa fa-fw fa-download"/>
              <span>boton--amarillo</span>
            </button>
            <button class="boton boton--ambar">
              <i class="fa fa-fw fa-download"/>
              <span>boton--ambar</span>
            </button>
            <button class="boton boton--naranja">
              <i class="fa fa-fw fa-download"/>
              <span>boton--naranja</span>
            </button>
            <button class="boton boton--tomate">
              <i class="fa fa-fw fa-download"/>
              <span>boton--tomate</span>
            </button>
            <button class="boton boton--rojo">
              <i class="fa fa-fw fa-download"/>
              <span>boton--rojo</span>
            </button>
            <button class="boton boton--rosado">
              <i class="fa fa-fw fa-download"/>
              <span>boton--rosado</span>
            </button>
          </div>
        </div>
        <div class="col-sm-auto">
          <h3 class="h3">Colores Alternados</h3>
          <div class="grid__cell fondo--negro2">
            <button class="boton boton--lila-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--lila-o</span>
            </button>
            <button class="boton boton--morado-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--morado-o</span>
            </button>
            <button class="boton boton--indigo-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--indigo-o</span>
            </button>
            <button class="boton boton--azul-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--azul-o</span>
            </button>
            <button class="boton boton--celeste-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--celeste-o</span>
            </button>
            <button class="boton boton--cyan-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--cyan-o</span>
            </button>
            <button class="boton boton--turquesa-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--turquesa-o</span>
            </button>
            <button class="boton boton--verde-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--verde-o</span>
            </button>
            <button class="boton boton--kiwi-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--kiwi-o</span>
            </button>
            <button class="boton boton--lima-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--lima-o</span>
            </button>
            <button class="boton boton--amarillo-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--amarillo-o</span>
            </button>
            <button class="boton boton--ambar-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--ambar-o</span>
            </button>
            <button class="boton boton--naranja-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--naranja-o</span>
            </button>
            <button class="boton boton--tomate-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--tomate-o</span>
            </button>
            <button class="boton boton--rojo-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--rojo-o</span>
            </button>
            <button class="boton boton--rosado-o">
              <i class="fa fa-fw fa-download"/>
              <span>boton--rosado-o</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="h3">Tamaños</h3>
      <button class="boton boton--lila boton--xs">
        <i class="fa fa-fw fa-download"/>
        <span>boton--xs</span>
      </button>
      <button class="boton boton--s boton--lila">
        <i class="fa fa-fw fa-download"/>
        <span>boton--s</span>
      </button>
      <button class="boton boton--lila">
        <i class="fa fa-fw fa-download"/>
        <span>Sin Tamaño</span>
      </button>
      <button class="boton boton--l boton--lila">
        <i class="fa fa-fw fa-download"/>
        <span>boton--l</span>
      </button>
      <button class="boton boton--xl boton--lila">
        <i class="fa fa-fw fa-download"/>
        <span>boton--xl</span>
      </button>
    </div>
    <div>
      <h3 class="h3">Rendondos</h3>
      <p class="text">Se puede añadir la clase <code>boton--redondo</code>
      a un botón para volverlo redondo.</p>
      <p class="text">Se pueden combinar los modificadores a gusto</p>
      <button class="boton boton--redondo boton--morado-o boton--xs">
        <i class="fa fa-fw fa-download"/>
      </button>
      <button class="boton boton--redondo boton--morado boton--s">
        <i class="fa fa-fw fa-download"/>
      </button>
      <button class="boton boton--redondo boton--verde">
        <i class="fa fa-fw fa-download"/>
      </button>
      <button class="boton boton--redondo boton--verde-o boton--l">
        <i class="fa fa-fw fa-download"/>
      </button>
      <button class="boton boton--redondo boton--rosado boton--xl">
        <i class="fa fa-fw fa-download"/>
      </button>
    </div>
    <div>
      <h2 class="h2">Grupos</h2>
      <p class="text">Sirven para juntar varios botones y que parezcan un
      sólo componente. Nada más con meter los botones dentro de un
      <code>div class="boton-group"</code></p>
      <div class="boton-group">
        <button class="boton boton--negro4"><i class="fa fa-fw fa-download"/></button>
        <button class="boton boton--negro4"><i class="fa fa-fw fa-ban"/></button>
        <button class="boton boton--negro4"><i class="fa fa-fw fa-flask"/></button>
      </div>
      <p class="text">Los botones dentro del group pueden tener cualquier
      modificador, aunque no todas las combinaciones deberían usarse juntas</p>
      <div class="boton-group">
        <button class="boton boton--guardar"/>
        <button class="boton boton--rosado"><i class="fa fa-fw fa-ban"/></button>
      </div>
      <br><br>
      <div class="boton-group">
        <button class="boton boton--verde boton--s">Operación</button>
        <button class="boton boton--rosado boton--s"><i class="fa fa-fw fa-ban"/></button>
        <button class="boton boton--azul boton--s"><i class="fa fa-fw fa-flask"/></button>
        <button class="boton boton--ambar boton--s"><i class="fa fa-fw fa-cog"/></button>
        <button class="boton boton--kiwi boton--s"><i class="fa fa-fw fa-cube"/> Otra</button>
      </div>
      <br><br>
      <div class="boton-group">
        <button class="boton boton--verde boton--xs">Operación</button>
        <button class="boton boton--rosado boton--xs"><i class="fa fa-fw fa-ban"/></button>
      </div>
    </div>
  </section>
</template>
