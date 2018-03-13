<template lang="html">
  <section>
    <h1 class="titulo">Tablas</h1>
    <h3 class="h3">Bloque</h3>
    <p class="text">
      La tabla más básica es un <code>table class="tabla"</code>
    y tiene como mínimo 2 hijos:</p>
    <h4 class="h4">Elementos</h4>
    <ul class="list">
      <li class="list__elem"><code>thead class="tabla__header"</code></li>
      <li class="list__elem"><code>tbody class="tabla__body"</code></li>
    </ul>
    <table class="tabla">
      <thead class="tabla__header">
        <tr>
          <th>Campo 1</th>
          <th>Campo 2</th>
          <th>Campo 3</th>
          <th>Campo 4</th>
        </tr>
      </thead>
      <tbody class="tabla__body">
        <tr>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
        </tr>
        <tr>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
        </tr>
        <tr>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
        </tr>
      </tbody>
    </table>
    <h4 class="h4">Modificadores</h4>
    <h5 class="h5"><code>table--responsive</code></h5>
    <p class="text">Es un modificador global de la tabla.
    Lo que hace es "desarmar" las columnas de la tabla
    hacia abajo en dispositivos pequeños (como si fuera una lista),
    con el fin de mejorar la legibilidad de la tabla.</p>
    <table class="tabla tabla--responsive">
      <thead class="tabla__header">
        <tr>
          <th>Campo 1</th>
          <th>Campo 2</th>
          <th>Campo 3</th>
          <th>Campo 4</th>
        </tr>
      </thead>
      <tbody class="tabla__body">
        <tr>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
        </tr>
        <tr>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
        </tr>
        <tr>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
          <td>Esto es un texto de la tabla</td>
        </tr>
      </tbody>
    </table>

    <h4 class="h4">Modificadores de Elementos</h4>
    <div class="grid">
      <div class="col-sm-auto">
        <h5 class="h5"><code>tabla__body--clickable</code></h5>
        <p class="text">
          Agrega un estilo para los
          <code>hover</code> de cada fila (<code>tr</code>)
        </p>
        <table class="tabla">
          <thead class="tabla__header">
            <tr>
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
              <th>Campo 4</th>
            </tr>
          </thead>
          <tbody class="tabla__body tabla__body--clickable">
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-auto">
        <h5 class="h5"><code>tabla__body--striped</code></h5>
        <p class="text">Agrega un estilo diferente para cada fila inpar</p>
        <table class="tabla">
          <thead class="tabla__header">
            <tr>
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
              <th>Campo 4</th>
            </tr>
          </thead>
          <tbody class="tabla__body tabla__body--striped">
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="grid">
      <div class="col-sm-auto">
        <h5 class="h5"><code>tabla__body--bordered</code></h5>
        <p class="text">Agrega bordes a cada fila</p>
        <table class="tabla">
          <thead class="tabla__header">
            <tr>
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
              <th>Campo 4</th>
            </tr>
          </thead>
          <tbody class="tabla__body tabla__body--bordered">
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-auto">
        <h5 class="h5"><code>tabla__body--grid</code></h5>
        <p class="text">Agrega bordes a cada fila y columna</p>
        <table class="tabla">
          <thead class="tabla__header">
            <tr>
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
              <th>Campo 4</th>
            </tr>
          </thead>
          <tbody class="tabla__body tabla__body--grid">
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>
                <ul class="tabla__opciones">
                  <li class="tabla__opciones__elem" tooltip="Editar">
                    <i class="text--cyan fa fa-fw fa-edit"/>
                  </li>
                  <li class="tabla__opciones__elem" tooltip="Eliminar">
                    <i class="text--tomate fa fa-fw fa-trash"/>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h4 class="h4">Otros Modificadores</h4>
    <div class="grid">
      <div class="col-sm-auto">
        <h5 class="h5"><code>tr--color</code></h5>
        <p class="text">
          Pinta una fila completa de un color.
          <router-link to="/colores">
            <i class="fa fa-fw fa-link"/><span>Ver Colores</span>
          </router-link>
        </p>
        <table class="tabla">
          <thead class="tabla__header">
            <tr>
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
            </tr>
          </thead>
          <tbody class="tabla__body">
            <tr class="tr--lila">
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
            </tr>
            <tr class="tr--ambar">
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
            </tr>
            <tr class="tr--verde">
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-auto">
        <h5 class="h5"><code>td--color</code></h5>
        <p class="text">
          Pinta una celda de un color.
          <router-link to="/colores">
            <i class="fa fa-fw fa-link"/><span>Ver Colores</span>
          </router-link>
        </p>
        <table class="tabla">
          <thead class="tabla__header">
            <tr>
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
            </tr>
          </thead>
          <tbody class="tabla__body">
            <tr>
              <td class="tr--morado">Esto es un texto de la tabla</td>
              <td class="tr--indigo">Esto es un texto de la tabla</td>
              <td class="tr--azul">Esto es un texto de la tabla</td>
            </tr>
            <tr>
              <td>Esto es un texto de la tabla</td>
              <td class="tr--tomate">Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
            </tr>
            <tr>
              <td class="tr--cyan">Esto es un texto de la tabla</td>
              <td>Esto es un texto de la tabla</td>
              <td class="tr--turquesa">Esto es un texto de la tabla</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
