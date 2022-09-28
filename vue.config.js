const { defineConfig } = require('@vue/cli-service')

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv);
const port = args.port || process.env.PORT;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system'
    },
    devServer: {
      client: {
        webSocketURL: {
          port
        }
      }
    }
  }
})
