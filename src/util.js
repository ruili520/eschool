export default {
  // 截取url
  getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
  },
  // 验证银行卡号
  checkBank (val) {
    if (val.match(/^\d{16}|\d{19}$/)) {
      return true
    } else {
      return false
    }
  },
  // 验证身份证号
  checkCardID (val) {
    if (val.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
      return true
    } else {
      return false
    }
  },
  // 验证手机号码
  checkPhone (val) {
    if (val.match(/^1[345789]{1}[0-9]{9}$/)) {
      return true
    } else {
      return false
    }
  },
  formatDate (value) {
    const padDate = function (value) {
      return value < 10 ? '0' + value : value
    }
    let date = new Date(value)
    let year = date.getFullYear()
    let month = padDate(date.getMonth() + 1)
    let day = padDate(date.getDate())
    return year + '-' + month + '-' + day
  },
  FormatDate (value) {
    const padDate = function (value) {
      return value < 10 ? '0' + value : value
    }
    let date = new Date(value)
    let year = date.getFullYear()
    let month = padDate(date.getMonth() + 1)
    let day = padDate(date.getDate())
    return year + '-' + month + '-' + day
  },
  // 图片转码
  convertBase64UrlToBlob (urlData) {
    let path = urlData.split(',').pop()
    let bytes = window.atob(path) // 去掉url的头，并转换为byte
    // 处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length)
    let ia = new Uint8Array(ab)
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ab], { type: 'image/png' })
  }
}
