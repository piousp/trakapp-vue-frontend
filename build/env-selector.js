var config = require("../config");

module.exports = selectFile;

function selectFile(env){
  switch(env){
    case "production":
      return config.build;
    case "staging":
      return config.stage;
    default:
      return config.dev;
  }
}
