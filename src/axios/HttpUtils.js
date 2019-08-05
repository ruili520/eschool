function getUrl (url) { return '/smart-campuskdg/' + url }
function getEDUUrl (url) {return '/eduboot/' + url}

var install = function (Vue) {
  if (install.installed) return // 如果已经注册过了，就跳过
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    //测试使用
    //存session
    $setsession:{
      value:function (params,success,faild) {
        this.UIAxios(getUrl('setsession'),{
          method: "post",
          data: params
        }, success, faild);
      }
    },
    //用户长登陆信息解密
    $loginICBCLONG:{
      value:function (params,success,faild) {
        this.UIAxios(getEDUUrl('loginICBCLONG'), {
          credentials: true,
          method: "get",
          data: params
        }, success, faild);
      }
    },
    //商城登录
    $MallLogin:{
      value:function (params,success,faild) {
        this.UIAxios(getEDUUrl('neigou/login'), {
          method: "get",
          data: params
        }, success, faild);
      }
    },
    //获取用户绑定信息
    $getBindedInfo:{
      value:function (params,success,faild) {
        this.UIAxios(getUrl('homepage/getBindedInfo'),{
          method: "post",
          data: params
        }, success, faild);
      }
    },
    // 切换选中的孩子
    $switchDefaultInfo:{
      value:function (params,success,faild) {
        this.UIAxios(getUrl('homepage/switchDefaultStatus'),{
          method: "post",
          data: params
        }, success, faild);
      }
    },
    //校验权限，查看跳转链接
    $checkAuthority:{
      value:function (params,success,faild) {
        this.UIAxios(getUrl('homepage/checkAuthority'),{
          method: "post",
          data: params
        }, success, faild);
      }
    },
    //获取首页幼儿园图标
    $getHomeMenuAndClassList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/getHomeMenuAndClassList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 绑定儿童
    $toBind:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/toBind'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //获取首页banner图
    $getHomeBannerList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/getHomeBannerList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //获取考勤列表
    $getInfoStuStaticList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/selectInfoStuStaticCountList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //通过日期获取该天考勤记录
    $getAttendanceByDate:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/getAttendanceByDate'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //宝贝卡功能
    //卡片绑定
    $cardBind:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('cardManager/cardBind'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //获取宝贝卡列表
    $getCardList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('cardManager/getCardList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
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
    },
    //获取学校简介
    $getSchoolInfo:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/selectInfoGardenIntroduce'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //获取班级相册
    $getPhotoList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('photo/getTSchoolPhotoList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //获取每日食谱
    $getCook:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('cook/getCook/' + params), {
          method: "post",
          data: {}
        }, success, fail);
      }
    },
  })
};
export default install;
