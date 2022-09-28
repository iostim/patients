const { defineConfig } = require('@vue/cli-service')

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)
const port = args.port || process.env.PORT

// Proxy
const proxy = {}

// FHIR proxy on /fhir
if (process.env.FHIR_TARGET) {
  proxy['fhir'] = {
    target: process.env.FHIR_TARGET
  }
  if (process.env.FHIR_PATH) {
    proxy['fhir']['pathRewrite'] = {
      '^/fhir': process.env.FHIR_PATH
    }
  }
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
