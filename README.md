# Trakapp
Frontend para clientes

## Instalar todo
``` bash
npm install
```


## Scripts de ejecución
### Bump
Realiza un aumento de version (major, minor, patch) y hace un commit
``` bash
npm version major|minor|patch
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

### Lint
Verifica todos los archivos javascript dentro de `src` con las reglas definas en el linter.
``` bash
npm run lint
```

### Tests (Unidad)
Ejecuta todos los tests que se encuentren dentro de `src`. Los archivos debe tener un nombre que cumpla con el siguiente regex: `\w+\.spec\.js`, o humanamente: `xxxx.spec.js`
``` bash
npm run test:unit
```

### PWA
Sólo sirven en producción con HTTPS. Para probarlo en desarrollo:

1. Instalar librería para hacer un túnel a localhost
``` bash
npm install -g ngrok
```
2. Compilar para producción
``` bash
npm run build
```
3. Servir la carpeta dist
``` bash
npx serve dist
```
4. Crear el túnel
``` bash
ngrok http 5000
```
5. Ingresar desde el celular al link https creado por ngrok
