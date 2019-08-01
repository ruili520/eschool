/**
 * Created by pb on 2017/10/31.
 */
window.onerror = function (err) {
  // log ('window.onerror: ' + err)
  console.log('window.onerror: ' + err)
}

function connectWebViewJavascriptBridge (callback) {
  function isAndroid () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    console.log(isAndroid, '111212212')
    return isAndroid
  }

  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge, '建立桥连接1')
  }
  if (isAndroid()) {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      console.log('iiii')
      callback(WebViewJavascriptBridge, '建立桥连接2')
    }, false)
  } else {
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
  }
}
var XBK = {};
connectWebViewJavascriptBridge(function (bridge, qiao) {
  var uniqueId = 1
  function log (message, data) {
    var log = document.getElementById('log')
    var el = document.createElement('div')
    el.className = 'logLine'
    el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
    if (log.children.length) {
      log.insertBefore(el, log.children[0])
    } else {
      log.appendChild(el)
    }
  }
  try { // 此处try catch注意  android 有init初始化方法，必须调用 不调用后续注册的事件将无效 而IOS却没有init方法 调用会报错 所以得捕获异常
    bridge.init(function (message, responseCallback) {
      console.log('JS got a message', message)
      var data = {
        'Javascript Responds': '测试中文!'
      }
      console.log('JS responding with', data)
      responseCallback(data)
    })
  } catch (e) {

  }

  bridge.registerHandler('XueBankWebViewNativeBridge', function (message, responseCallback) {
    let messageData = JSON.parse(message)
    if (messageData.action == 'StartRefresh') {
      if (messageData.data.isRefresh == '1') {
        window.that.renovationPage()
      }
    }
    var data = {'state': 'OK！', code: 0}
    responseCallback(data)
  })
})
// 获取定位
XBK.getCity = function (callback) {
  var data = {'data': {}, 'action': 'LocalLocation'}
  console.log('1. js 获取定位发送的数据', data)
  // eslint-disable-next-line
  if(sessionStorage.test == "true"){
    // if(true){
    let city = {
      'ISOcountryCode': 'CN',
      'subAdministrativeArea': '',
      'subLocality': 'Tianhe',
      'longitude': '113.378683',
      'thoroughfare': 'Tangxia Dapian Road',
      'administrativeArea': '广东',
      'latitude': '23.129805',
      'subThoroughfare': 'No.3-2',
      'postalCode': '',
      'country': 'China',
      'locality': '上海',
      'name': 'No.3-2 Tangxia Dapian Road'
    }
    let testData = {
      'error': '',
      'data': city,
      'code': '0'
    }
    callback(JSON.stringify(testData))
  }
  connectWebViewJavascriptBridge(function (bridge, qiao) {
    console.log('2. 定位数据', qiao)
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      callback(responseData)
      console.log('3. JS 接收到的定位数据', responseData)
    })
  })
}
// 修改状态栏颜色
XBK.ManageStatusCololr = function (color, immediately = false) {
  var data = {'data': {'color': color, 'immediately': immediately}, 'action': 'ManageStatusCololr'}
  console.log('1. js 发送的颜色值', data.data)
  connectWebViewJavascriptBridge(function (bridge, qiao) {
    console.log('2. 颜色值', qiao)

    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      console.log('3. JS 接收到的颜色数据', responseData)
    })
  })
}
// 查询数据
XBK.SelectJsonString = function (key, callback) {
  var data = {'data': {'key': key}, 'action': 'SelectJsonString'}
  console.log('1. js 查询数据发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge, qiao) {
    console.log('2. 查询数据', qiao)

    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      callback(responseData)
      console.log('3. JS 接收到的查询数据', responseData)
    })
  })
}
// 新增和修改数据
XBK.UpdateJsonString = function (data) {
  var data = {
    'data': {
      key: data.key,
      json: data.json
    },
    'action': 'UpdateJsonString'
  }
  connectWebViewJavascriptBridge(function (bridge, qiao) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      console.log('3. JS 接收到的新增和修改数据', responseData)
    })
  })
}
// 删除数据
XBK.DeleteJsonString = function (key) {
  var data = {'data': {'key': key}, 'action': 'DeleteJsonString'}
  console.log('js 删除数据发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 删除数据接收到的数据', responseData)
    })
  })
}
// 查询数据是否存在
XBK.QueryKeyJsonString = function (key) {
  var data = {'data': {'key': key}, 'action': 'QueryKeyJsonString'}
  console.log('js 查询数据是否存在发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 查询数据是否存在接收到的数据', responseData)
    })
  })
}
// 关闭二级webview
XBK.PopViewController = function () {
  var data = {'data': {}, 'action': 'PopViewController'}
  console.log('js 关闭二级webview发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      console.log('JS 关闭二级webview接收到的数据', responseData)
    })
  })
}
// 获取用户信息(长登陆)
XBK.LoginStatus = function (callback) {
  var data = {'data': {}, 'action': 'LoginStatus'}
  console.log('1. js 长登陆发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge, qiao) {
    console.log('2. 长登陆', qiao)
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.loginICBCLONG(responseData);
      callback(responseData)
      console.log('3. 长登陆信息返回', responseData)
    })
  })
}
// 分享
XBK.ShareByUI = function (data) {
  var data = {'data': data, 'action': 'ShareByUI'}
  console.log('js 分享发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      console.log('JS 分享接收到的数据', responseData)
    })
  })
}
// 获取网络状态
XBK.NetworkingMonitor = function () {
  var data = {'data': {}, 'action': 'NetworkingMonitor'}
  console.log('js 获取网络状态发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 获取网络状态接收到的数据', responseData)
    })
  })
}
// 获取元宝数量
XBK.IngoteTotal = function () {
  var data = {'data': {}, 'action': 'IngoteTotal'}
  console.log('js 获取元宝数量发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 获取元宝数量接收到的数据', responseData)
    })
  })
}
// 获取元宝数量
XBK.CacheUserInfo = function (data) {
  var data = {'data': data, 'action': 'CacheUserInfo'}
  console.log('js 传送用户信息给native', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 传送用户信息给native接收到的数据', responseData)
    })
  })
}
// 获取操作系统版本
XBK.OSVersion = function () {
  var data = {'data': {}, 'action': 'OSVersion'}
  console.log('js 发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 接收到的数据', responseData)
    })
  })
}
// 获取用户手机唯一性信息
XBK.UUID = function () {
  var data = {'data': {}, 'action': 'UUID'}
  console.log('js 发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 接收到的数据', responseData)
    })
  })
}
// 获取设备的类型
XBK.DeviceType = function () {
  var data = {'data': {}, 'action': 'DeviceType'}
  console.log('js 发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 接收到的数据', responseData)
    })
  })
}
// 获取设备的运营商
XBK.DeviceCarrier = function () {
  var data = {'data': {}, 'action': 'DeviceCarrier'}
  console.log('js 发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 接收到的数据', responseData)
    })
  })
}
// 获取应用的当前版本号
XBK.ApplicationVersin = function () {
  var data = {'data': {}, 'action': 'ApplicationVersin'}
  console.log('js 发送的数据', data)
  // window.that.receivuserData({qqqq:"1111"});
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 接收到的数据', responseData)
    })
  })
}
// 控制是否显示底部按钮
XBK.ManageTabBarHiddenState = function (bool) {
  var data = {'data': {'isShow': bool}, 'action': 'ManageTabBarHiddenState'}
  console.log('js 发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 接收到的数据', responseData)
    })
  })
}
// 获取app缓存html版本
XBK.CacheHTMLVersion = function () {
  var data = {'data': {}, 'action': 'CacheHTMLVersion'}
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 接收到的数据', responseData)
    })
  })
}
// 打开指定的原生页面
XBK.OpenICBCWithID = function (id) {
  var data = {'data': {'type': id}, 'action': 'OpenICBCWithID'}
  console.log('js 打开指定的原生页面发送的数据', data)
  // window.that.receivuserData({qqqq:"1111"});
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 打开指定的原生页面接收到的数据', responseData)
    })
  })
}
// 短登录
XBK.LoginVerification = function (data, callback) {
  if (!callback) {
    callback = function () {}
  }
  var data = {'data': data, 'action': 'LoginVerification'}
  console.log('调用短登录', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      callback(responseData)
      console.log('短登录数据', responseData)
    })
  })
}
// 打开新的webview页面
XBK.OpenNewWebView = function (data) {
  var data = {'data': data, 'action': 'OpenNewWebView'}
  console.log('js 打开新的webview页面发送的数据', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 打开新的webview页面接收到的数据', responseData)
    })
  })
}
// 打开二维码扫描页面
XBK.OpenQRCodeScanner = function (callback) {
  var data = {'data': {}, 'action': 'OpenQRCodeScanner'}
  console.log('js 发送的数据', 'OpenQRCodeScanner 调起二维码扫描')
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      callback(responseData)
    })
  })
}
// 打开二维码相册页面
XBK.OpenQRCodeReader = function (callback) {
  var data = {'data': {}, 'action': 'OpenQRCodeReader'}
  console.log('js 发送的数据', 'OpenQRCodeReader 调起二维码相册扫描')
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      callback(responseData)
    })
  })
}
// 刷新页面
XBK.RecoderRefresh = function () {
  var data = {'data': {'isRefresh': true}, 'action': 'RecoderRefresh'}
  console.log('调用刷新', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      // window.that.receivuserData(responseData);
      console.log('JS 刷新页面接收到的数据', responseData)
    })
  })
}
// 打开一个带头的webview页面
XBK.RetainNavigationBar = function (newWebView) {
  var data = {'data': newWebView, 'action': 'RetainNavigationBar'}
  console.log('新开webview带头部', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      console.log('JS 新开webview带头部接收到的数据', responseData)
    })
  })
}
// 打电话
XBK.OpenTelephone = function (phone) {
  var data = {'data': phone, 'action': 'OpenTelephone'}
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      console.log('JS 打电话接收到的数据', responseData)
    })
  })
}
// 获取工行运行环境
XBK.ObtainICBCEnvironment = function (callback) {
  var data = {'data': {}, 'action': 'ObtainICBCEnvironment'}
  console.log('获取工行运行环境', data)
  if (sessionStorage.test == 'true') {
    let testData = {
      'error': '',
      'data': {'contactType': 2001},
      'code': '0'
    }
    callback(JSON.stringify(testData))
  }
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
      console.log('JS 接收到的工行环境', responseData)
      callback(responseData)
    })
  })
}

// 调用ios工行支付
XBK.PayForICBCWebView = function (url) {
  var data = {
    'webUrl': url
  }
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('PayForICBCWebView', data, function (response) {
      console.log('支付回调', response)
    })
  })
}
// 调用android工行支付
XBK.AndroidPayForICBCWebView = function (url) {
  var data = {
    'data': {
      'webUrl': url
    },
    'action': 'PayForICBCWebView'
  }
  console.log('Android', data)
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('XueBankWebViewJavascriptBridge', data, function (responseData) {
    })
  })
}
export default XBK
