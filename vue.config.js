const { defineConfig } = require('@vue/cli-service')

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)
const port = args.port || process.env.PORT

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
      // /fhir proxy
      proxy: {
        '/fhir': {
          target: process.env.FHIR_TARGET,
          pathRewrite: { '^/fhir': process.env.FHIR_PATH }
        }
      }
    }
  }
})
