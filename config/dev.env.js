var merge = require("webpack-merge")
var prodEnv = require("./prod.env")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3001"',
  SOCKET_URL: '"http://localhost:3001"',
  BUGSNAG_STAGE: '"development"'
})
