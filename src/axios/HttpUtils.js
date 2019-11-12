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

    $deleteCardBind:{
      value:function (params,success,faild) {
        this.UIAxios(getUrl('cardManager/deleteCardBind'),{
          method: "post",
          data: params
        }, success, faild);
      }
    },

    //商城登录
    $MallLogin:{
      value:function (params,success,faild) {
        this.UIAxios(getEDUUrl('neigou/login'), {
          method: "get",
          params: params
        }, success, faild);
      }
    },
    //商城登录
    $MallLogin1:{
      value:function (params,success,faild) {
        this.UIAxios(getEDUUrl('neigou/loginVersion'), {
          method: "get",
          params: params
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
    //解绑
    $unbind:{
      value:function (params,success,faild) {
        this.UIAxios(getUrl('userProperty/unBind'),{
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

    // 切换选中的孩子
    $switchDefaultStatus:{
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
    //投递园长信箱信息
    $addTMailbox:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('tmailbox/addTMailbox'), {
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
    //获取园长信箱历史记录
    $getTMailboxList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('tmailbox/getTMailboxList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 请假页面时长计算
    $calculateDaytime:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('leave/calculateDaytime'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 提交请假信息
    $leaveSubmit:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('leave/submit'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 获取请假的当月报表
    $getLeaveDetail:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('leave/getLeaveDetail'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },


    // 获取校园消息的请假列表
    $getLeaveNotifyList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('leave/getLeaveNotifyList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //点赞
    $addInfoGardenAgreewith:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/addInfoGardenAgreewith'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 查询点赞
    $selectInfoGardenAgreewith:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/selectInfoGardenAgreewith'), {
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
    //查询活动报名列表
    $getActivityList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('activity/getActivityList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 查询活动报名基本详情
    $getActivityDetail:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('activity/getActivityDetail'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //获取打卡缴费列表
    $getFeeList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/getFeeList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 获取缴费项目信息
    $getFeeDetail:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/getFeeDetail'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 获取缴费项目详情
    $getFeeItemDetail:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('homepage/getFeeItemDetail'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 创建学校收费订单
    $createOrderSchool:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('icbcPersonalPay/createOrder'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 获取学校收费订单支付信息
    $payInfoSchool:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('icbcPersonalPay/payInfo/'+params), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 获取学校收费订单支付信息(对公)
    $icbcPublicPayPayInfo:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('icbcPublicPay/payInfo/'+params), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 创建学校收费订单（对公）
    $icbcPublicPayCreateOrder:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('icbcPublicPay/createOrder'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },

    // 改变邮件已读状态
    $readTMailbox:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('tmailbox/readTMailbox'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },

    //获取班级相册
    $getTSchoolPhotoList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('photo/getTSchoolPhotoList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //class albums
    $checkFollowToThumb:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('photo/checkFollow'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 根据场景id获取设备信息（视频页使用）
    $getKdgIpcBySceneId:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('userProperty/getKdgIpcBySceneId/'+params), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 扣减用户的观看视频时间
    $deductRemainderTime:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('userProperty/deductRemainderTime'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 获取用户数据（视频页使用）
    $getUserPropertyByUserId:{
        value:function (params, success, fail) {
          this.UIAxios(getUrl('userProperty/getUserPropertyByUserId'), {
            method: "post",
            data: params
          }, success, fail);
        }
    },
    // 获取会员信息
    $selectKdgVipUserInfo:{
      value:function ( success, fail) {
        this.UIAxios(getUrl('userProperty/selectKdgVipUserInfo'), {
          method: "post",
        }, success, fail);
      }
    },
    // 获取会员列表
    $getKdgVipItemListBySchoolId:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('userProperty/getKdgVipItemListBySchoolId/'+params.id), {
          method: "post",
        }, success, fail);
      }
    },
// 创建学校收费订单（对公）
    $createOrder:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('orderVip/createOrder'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
// 根据订单获取工银e支付信息
    $payInfo:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('icbcV6/payInfo/' + params + '/1/kdg'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
// 根据订单获取微信支付信息
    $wechatpayInfo:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('wechat/payInfo'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
// 获取支付列表
    $getKdgVipOrderList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('userProperty/getKdgVipOrderList'), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    //查询活动详情详情
    $getTSmallbankerActivityInfo:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('bankActivity/getTSmallbankerActivityInfo'+params.id), {
          method: "post",
          data: params
        }, success, fail);
      }
    },
    // 查询活动留言信息
    $getTSmallbankerMessageList:{
      value:function (params, success, fail) {
        this.UIAxios(getUrl('bankActivity/getTSmallbankerMessageList'), {
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

  })
};
export default install;
