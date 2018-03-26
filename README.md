# vue-base
- Contruído con Node 8.9.4
- Contruído con NPM 5.6.0

``` bash
npm install
```

## Cómo clonar el proyecto
Hay 2 opciones: la regular y luego pasos extra, o con bandera.

### Regular
Se clona como siempre:
``` bash
git clone git@gitlab.com:ciris-base/frontend-vuejs.git
```
Y luego de clonado, se deben ejecutar estos pasos dentro del repo:
``` bash
git submodule init
git submodule update
```

### Con bandera
Se clona como siempre pero se agrega una bandera al comando:
``` bash
git clone git@gitlab.com:ciris-base/frontend-vuejs.git --recurse-submodules
```

## Scripts de ejecución
### Bump
Realiza un aumento de version (major, minor, patch) y hace un commit
``` bash
npm version major|minor|patch
```

### Lint
Verifica todos los archivos javascript dentro de `src` con las reglas definas en el linter.
``` bash
npm run lint
```

### Tests (Unidad)
Ejecuta todos los tests que se encuentren dentro de `src`. Los archivos debe tener un nombre que cumpla con el siguiente regex: `\w+\.spec\.js`, o humanamente: `xxxx.spec.js`
``` bash
npm test
```

### Correr para desarrollo
Ejecuta el linter y reinicia el proceso al encontrar cambios en el código
``` bash
npm start
```

### Transpilar para producción
Compila y limpia todas las fuentes para usar en producción. El compilado queda en el directorio `dist`.
Tamibién reduce el código con envify y uglify.
``` bash
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
