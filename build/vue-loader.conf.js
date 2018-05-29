var utils = require("./utils")
var config = require("../config");

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMap(),
    extract: isProdOStage()
  }),
  transformToRequire: {
    video: "src",
    source: "src",
    img: "src",
    image: "xlink:href"
  }
}

function sourceMap(){
  switch(process.env.NODE_ENV){
    case "production":
      return config.build.productionSourceMap;
    case "staging":
      return config.stage.productionSourceMap;
    default:
      return config.dev.cssSourceMap;
  }
}

function isProdOStage(){
  return (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging")
}
