const { defineConfig } = require('@vue/cli-service')
const port = process.env.port || process.env.npm_config_port || 8088 //端口

module.exports = defineConfig({
  transpileDependencies: ['swiper'],
  devServer: {
    host: '127.0.0.1',
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.veujs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8080`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  }
})
