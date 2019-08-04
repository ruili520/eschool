// axios公共配置文件
import axios from 'axios';

export default {
  //注册所有方法
  install(Vue, options) {
    function isSuccess(res) {
      if (res.data.code == "000001") {
        return true;
      }
      return false;
    }
    //定义请求方法
    Vue.prototype.UIAxios = function (url, config, callback, error) {
      this.$axios(url, config).then(function (res) {
        if(!res){
          return;
        }
        callback(res.data);
      }).catch(function (res) {
        console.log(res);
        if (error) error(res.response);
      })
    }

    Vue.prototype.Indicator = function (title,type) {
      this.$indicator({
        spinnerType:type==null?'fading-circle':type
      })
    }


  }
}


