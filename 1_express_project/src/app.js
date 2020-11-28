// Głowny plik aplikacji
const { env, port, ip, apiRoot } = require('./config')
const express = require('./services/express')
const api = require('./api')

const app = express(apiRoot, api) // "/api"

app.listen(port, ip, () => {
  console.log(`Express server listening on http://${ip}:${port}, in ${env} mode`)
});


module.exports = app
