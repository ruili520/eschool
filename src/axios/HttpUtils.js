function getUrl (url) { return '/smart-campuskdg/' + url }
function getEDUUrl (url) {return '/eduboot/' + url}

var install = function (Vue) {
  if (install.installed) return // 如果已经注册过了，就跳过
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    //获取黑板报流程
      $getBlackBoard:{
            value:function (params, success, fail) {
              this.UIAxios(getEDUUrl('campusBlackboard/getLocHotnewsList'), {
                method: "post",
                data: params
              }, success, fail);
            }
      },
    //获取学校列表
    $getSchoolList:{
        value:function (params, success, fail) {
          this.UIAxios(getUrl('homepage/getSchoolList'), {
            method: "post",
            data: params
          }, success, fail);
        }
    }
  })
}
export default install;
