import camelCase from "lodash/camelCase";
import D from "debug";

const debug = D("ciris:importarStores.js");

const requireModule = require.context("../", true, /\.store\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  const moduleName = camelCase(fileName.replace(/([a-zA-Z0-9-_.]+\/|\.store.js)/g, ""));
  debug(`Importando: ${moduleName}`);
  modules[moduleName] = requireModule(fileName).default;
});

export default modules;
