const { defineConfig } = require('@vue/cli-service')
const proxyFHIR = require("webpack-proxy-fhir")

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)
const port = args.port || process.env.PORT


// Proxy
const proxy = {}

// FHIR proxy on /fhir
if (process.env.FHIR_PROXY_URL) {
  Object.assign(proxy, proxyFHIR(process.env.FHIR_PROXY_URL))
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system'
    },
    devServer: {
      // port to make HMR and Live Reload work with single-spa
      client: {
        webSocketURL: {
          port
        }
      },
      proxy
    }
  }
})
