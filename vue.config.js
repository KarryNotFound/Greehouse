const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        net: false,
        tls: false,
      },
    },
  },
};
