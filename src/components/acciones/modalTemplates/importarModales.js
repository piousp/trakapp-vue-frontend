import camelCase from "lodash/camelCase";
import D from "debug";

const debug = D("ciris:importarModales.js");

const requireModule = require.context(".", false, /\.vue$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\.vue)/g, ""));
  debug(`Importando: ${moduleName}`);
  modules[moduleName] = requireModule(fileName).default;
});

export default modules;
