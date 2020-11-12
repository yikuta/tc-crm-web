const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  runtimeCompiler: false,
  productionSourceMap: process.env.NODE_ENV === 'development',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'crm管理系统'
        return args
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        __STATIC__: resolve('public')
      }
    }
  },
  css: {
    extract: process.env.NODE_ENV !== 'development',
    sourceMap: process.env.NODE_ENV === 'development'
  },
  devServer: {
    port: 8087,
    open: false,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://10.10.25.85:8040',
        // target: 'http://192.168.255.95:8040',
        // target: 'http://crm-webapi-dev.meiweigx.com', // 开发环境
        // target: 'https://crm-webapi-pre.meiweigx.com', // 测试环境
        ws: true, // 支持websocket
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
}
