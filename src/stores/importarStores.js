import camelCase from "lodash/camelCase";
import D from "debug";

const debug = D("ciris:importarStores.js");

const requireModule = require.context(".", false, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === "./importarStores.js") return;
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ""));
  debug(`Importando: ${moduleName}`);
  modules[moduleName] = requireModule(fileName).default;
});

export default modules;
