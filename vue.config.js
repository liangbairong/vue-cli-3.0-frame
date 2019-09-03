/*
 * @Author: 梁栢荣
 * @Date: 2019-08-29 14:01:16
 * @Description: file content
 */

console.log(process.env.VUE_APP_TITLE)
module.exports = {
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
  // baseUrl: '/online/',
  lintOnSave: false, //关闭eslint
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 75
          }), // 换算的基数
        ]
      }
    },
    extract: process.env.NODE_ENV == 'production' ? true : false,   //是否分离css
  },
  productionSourceMap: process.env.NODE_ENV == 'production' ? false : true, // 是否生产map文件
  outputDir: process.env.VUE_APP_TITLE == '正式环境' ? 'dist_pro' : 'dist_test',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true, //  新增该配置项
    // port: 4000

    // 跨域
    proxy: {
      '/api': {
        target: 'https://partner-wx.mijila.com/api', //源地址 
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //改变源 
        pathRewrite: {
          '^/api': '' //路径重写 
        }
      }
    }
  },
  // 第三方库加cdn配置
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'mint-ui': 'MINT',
    }
  },
  chainWebpack(config) {
    const cdn = {
      css: [
        // element-ui css
        // 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      js: [
        // vue must at first!
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/mint-ui/2.2.13/index.js'
      ]
    }

    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })

    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
  }

}