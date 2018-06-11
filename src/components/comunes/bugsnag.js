import bugsnag from "bugsnag-js";

const { version } = require("../../../package.json");

const inst = bugsnag({
  apiKey: "c237c08021e14e4df9bc4b476f9f53ac",
  appVersion: version,
});
export default inst;
