
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
        extract:process.env.VUE_APP_TITLE == '正式环境' ? true:false,
    },
    productionSourceMap:true,  // 生产环境下css 分离文件
    outputDir: process.env.VUE_APP_TITLE == '正式环境' ? 'dist_pro':'dist_test',
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true, //  新增该配置项
        // port: 4000
      },

}