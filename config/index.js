'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
var chost = "http://sckdg.xuebank.com";//

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/smart-campuskdg': {
        target: chost,
        changeOrigin: true,
        pathRewrite: {},
        onProxyRes(proxyRes, req, res){
          //setCookie(proxyRes, req, res);
        }
      },
      '/eduboot': {
        target:'http://m.xuebank.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {

        },
        onProxyReq(proxyReq, req, res) {
          // console.log("1.Origin:",proxyReq);
          //proxyReq.setHeader("origin","http://xuebank.com");

          // console.log("1.Origin.headers:",proxyReq._headers);
        },
        onProxyRes(proxyRes, req, res) {
          //set-cookie:JSESSIONID=6F766ED2EEEBEAA9245F7F908A848857; Path=/webserver/; HttpOnly
          // console.log("1.Origin:",req.headers.origin);


          var oldCookie = proxyRes.headers['set-cookie']
          if(oldCookie== null || oldCookie.length==0){
            delete proxyRes.headers['set-cookie']
            return
          }
          // console.log(oldCookie)
          var oldCookieItems = oldCookie[0].split(';')
          var newCookie = ''
          for(var i=0; i < oldCookieItems.length; ++i){
            if(newCookie.length >0)
              newCookie += ';'
            if(oldCookieItems[i].indexOf('Domain=') >= 0)
              newCookie += 'Domain=localhost'
            else
              newCookie += oldCookieItems[i]
          }
          // console.log(newCookie);

          proxyRes.headers['set-cookie'] = [newCookie];



          //proxyRes.headers['x-addedygc'] = 'foobar';     // add new header to response
          //delete proxyRes.headers['connection'];       // remove header from response
        }
      }
    },

    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    host: '192.168.1.100', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
