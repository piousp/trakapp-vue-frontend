import bugsnag from "bugsnag-js";

const { version } = require("../../../package.json");

const inst = bugsnag({
  apiKey: "c237c08021e14e4df9bc4b476f9f53ac",
  appVersion: version,
  releaseStage: process.env.BUGSNAG_STAGE,
});

inst.app.version = version;
inst.app.releaseStage = process.env.BUGSNAG_STAGE;

export default inst;
