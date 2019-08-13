/**
 * Created by 新思 on 2017/3/3.
 */
import Vue from 'vue'
import axios from 'axios';
function getUrl (url) { return '/smart-campuskdg/' + url }
function getEDUUrl (url) {
  console.log(location.href.indexOf('http://localhost') > -1)
  if (location.href.indexOf('http://localhost') > -1) {
    return '/eduboot/' + url
  } else if (location.href.indexOf('sckdg.xuebank.com') > -1) {
    return 'https://m.xuebank.com/eduboot/' + url
  } else if (location.href.indexOf('ajaxTest') > -1) {
    return 'http://101.132.104.158/eduboot/' + url
  } else {
    return 'https://test.xuebank.com/eduboot/' + url
  }
}
//综合商城接口
export function neigouLogin (data){
  return axios.get("/eduboot/neigou/login",{params:data});
}
// 登录接口
export function getSessionId (data) {
  return axios.post('/eduboot/getSessionId', data, { credentials: true})
}
// 登录接口回调（应该由app做此操作）
export function logInCallBack (data) {
  return Vue.http.post(getEDUUrl('callBack') + data)
}
// 用户长登陆信息解密
export function loginICBCLONG (data) {
  return axios.post('/eduboot/loginICBCLONG',data,{ credentials: true})
}
// 获取用户是否登录getUserLogin
export function getUserLogin (data) {
  return Vue.http.post(getEDUUrl('getUserLogin'), data)
}
// 查询是否绑定过
export function isExist (data) {
  return Vue.http.post(getUrl('identityCheck/isExist'), data)
}
// 绑定
export function toBind (data) {
  return Vue.http.post(getUrl('homepage/toBind'), data)
}
// 解绑
export function unBind (data) {
  return Vue.http.post(getUrl('userProperty/unBind'), data)
}
// 学校列表
export function getSchoolList (data) {
  return Vue.http.post(getUrl('homepage/getSchoolList'), data)
}
// 获取首页icon跳转列表
export function getHomeMenuAndClassList (data) {
  return Vue.http.post(getUrl('homepage/getHomeMenuAndClassList'), data)
}
// 校验用户有没有权限进入该项服务
export function checkAuthority (data) {
  return Vue.http.post(getUrl('homepage/checkAuthority'), data)
}
// 获取首页banner图
export function getHomeBannerList (data) {
  return Vue.http.post(getUrl('homepage/getHomeBannerList'), data)
}
// 获取用户数据（视频页使用）
export function getUserPropertyByUserId (data) {
  return Vue.http.post(getUrl('userProperty/getUserPropertyByUserId'), data)
}
// 根据场景id获取设备信息（视频页使用）
export function getKdgIpcBySceneId (data) {
  return Vue.http.post(getUrl('userProperty/getKdgIpcBySceneId/' + data))
}
// 获取打卡缴费列表
export function getFeeList (data) {
  return Vue.http.post(getUrl('homepage/getFeeList'), data)
}
// 获取打卡缴费列表
export function getCook (data) {
  return Vue.http.post(getUrl('cook/getCook/' + data), {})
}
// 通过日期获取该天考勤记录
export function getAttendanceByDate (data) {
  return Vue.http.post(getUrl('homepage/getAttendanceByDate'), data)
}
//获取考勤列表
export function selectInfoStuStaticList (data) {
  return Vue.http.post(getUrl('homepage/selectInfoStuStaticCountList'), data)
}
// 扣减用户的观看视频时间
export function deductRemainderTime (data) {
  return Vue.http.post(getUrl('userProperty/deductRemainderTime'), data)
}
// 获取会员信息
export function selectKdgVipUserInfo (data) {
  return Vue.http.post(getUrl('userProperty/selectKdgVipUserInfo'), data)
}
// 获取会员列表
export function getKdgVipItemListBySchoolId (data) {
  return Vue.http.post(getUrl('userProperty/getKdgVipItemListBySchoolId/' + data.id))
}
// 获取支付列表
export function getKdgVipOrderList (data) {
  return Vue.http.post(getUrl('userProperty/getKdgVipOrderList'))
}
// 创建学校收费订单
export function createOrderSchool (data) {
  return Vue.http.post(getUrl('icbcPersonalPay/createOrder'), data)
}
// 创建学校收费订单（对公）
export function icbcPublicPayCreateOrder (data) {
  return Vue.http.post(getUrl('icbcPublicPay/createOrder'), data)
}
// 获取学校收费订单支付信息
export function payInfoSchool (data) {
  return Vue.http.post(getUrl('icbcPersonalPay/payInfo/' + data), {})
}
// 获取学校收费订单支付信息(对公)
export function icbcPublicPayPayInfo (data) {
  return Vue.http.post(getUrl('icbcPublicPay/payInfo/' + data), {})
}
// 老师查看缴费接口
export function getFeeClassList (data) {
  return Vue.http.post(getUrl('homepage/getTeaFeeList'), data)
}
// 班级
export function getTeaFeeClassList (data) {
  return Vue.http.post(getUrl('homepage/getTeaFeeClassList'), data)
}
// 获取缴费项目信息
export function getFeeDetail (data) {
  return Vue.http.post(getUrl('homepage/getFeeDetail'), data)
}
// 获取缴费项目详情
export function getFeeItemDetail (data) {
  return Vue.http.post(getUrl('/homepage/getFeeItemDetail'), data)
}
// 创建VIP会员订单
export function createOrder (data) {
  return Vue.http.post(getUrl('orderVip/createOrder'), data)
}
// 根据订单获取工银e支付信息
export function payInfo (orderId) {
  return Vue.http.post(getUrl('icbcV6/payInfo/' + orderId + '/1/kdg'))
}
// 根据订单获取微信支付信息
export function wechatpayInfo (data) {
  return Vue.http.post(getUrl('wechat/payInfo'), data)
}
// 获取用户绑定的所有的孩子
export function getBindedInfo (data) {
  return Vue.http.post(getUrl('homepage/getBindedInfo'), data)
}
// 切换选中的孩子
export function switchDefaultStatus (data) {
  return Vue.http.post(getUrl('homepage/switchDefaultStatus'), data)
}
// 测试用
export function setsession (data) {
  return Vue.http.post(getUrl('setsession'), data)
}
// 测试用
export function getsession (data) {
  return Vue.http.post(getUrl('getsession'), data)
}

// service - upload image
export function uploadOSS (formData) {
  return Vue.http.post(getUrl('ossFile/uploadOSS'), formData)
}
export function uploadOSSUrl () {
  return getUrl('ossFile/uploadOSS')
}

// information - tmailbox
export function addTMailbox (params) {
  return Vue.http.post(getUrl('tmailbox/addTMailbox'), params)
}
export function getTMailboxList (params) {
  return Vue.http.post(getUrl('tmailbox/getTMailboxList'), params)
}
export function getTMailboxInfo (mailId) {
  return Vue.http.post(`${getUrl('tmailbox/getTMailboxInfo')}/${mailId}`)
}

// school notification
export function getTSchoolNoticeList (params) {
  return Vue.http.post(getUrl('notice/getTSchoolNoticeList'), params)
}

// class albums
export function getTSchoolPhotoList (params) {
  return Vue.http.post(getUrl('photo/getTSchoolPhotoList'), params)
}
export function checkFollowToThumb (albumId) {
  return Vue.http.post(`${getUrl('/photo/checkFollow')}/${albumId}`)
}

// 改变邮件已读状态
export function readTMailbox (mailId) {
  return Vue.http.post(`${getUrl('tmailbox/readTMailbox')}/${mailId}`)
}

// 请假页面时长计算
export function calculateDaytime (data) {
  return Vue.http.post(getUrl('leave/calculateDaytime'), data)
}
// 提交请假信息
export function leaveSubmit (data) {
  return Vue.http.post(getUrl('leave/submit'), data)
}
// 获取请假的当月报表
export function getLeaveDetail (data) {
  return Vue.http.post(getUrl('leave/getLeaveDetail'), data)
}
// 获取校园消息的请假列表
export function getLeaveNotifyList (data) {
  return Vue.http.post(getUrl('leave/getLeaveNotifyList'), data)
}
// 请假详情
export function getLeaveNotifyDetail (data) {
  return Vue.http.post(getUrl('leave/getLeaveNotifyDetail'), data)
}
// 九宫格（小小银行家）
export function getBinkMenuAndClassList (data) {
  return Vue.http.post(getUrl('smallBank/getHomeMenuAndClassList'), data)
}
// 获取活动列表（小小银行家）
export function getTSmallbankerActivityList (data) {
  return Vue.http.post(getUrl('bankActivity/getTSmallbankerActivityList'), data)
}
// 获取我参与过的活动列表（小小银行家）
export function getTSmallbankerActivityByMyList (data) {
  return Vue.http.post(getUrl('bankActivity/getTSmallbankerActivityByMyList'), data)
}
// 获取历史活动列表（小小银行家）
export function getTSmallbankerActivityByHistoryList (data) {
  return Vue.http.post(getUrl('bankActivity/getTSmallbankerActivityByHistoryList'), data)
}
// 报名接口（小小银行家）
export function addEnroll (data) {
  return Vue.http.post(getUrl('bankActivity/addEnroll'), data)
}
// 查询活动详情详情
export function getTSmallbankerActivityInfo (data) {
  return Vue.http.post(getUrl('bankActivity/getTSmallbankerActivityInfo/' + data.id), data)
}
// 查询活动留言信息
export function getTSmallbankerMessageList (data) {
  return Vue.http.post(getUrl('bankActivity/getTSmallbankerMessageList'), data)
}
// 新增用户评论
export function addMessage (data) {
  return Vue.http.post(getUrl('bankActivity/addMessage'), data)
}
// 查询活动报名列表
export function getActivityList (data) {
  return Vue.http.post(getUrl('activity/getActivityList'), data)
}
// 查询活动报名基本详情
export function getActivityDetail (data) {
  return Vue.http.post(getUrl('activity/getActivityDetail'), data)
}
// 查询活动报名所填的信息
export function getActivityData (data) {
  return Vue.http.post(getUrl('activity/getActivityData'), data)
}
// 活动报名
export function activitySign (data) {
  return Vue.http.post(getUrl('activity/activitySign'), data)
}
// 获取卡片(考勤卡)列表
export function getCardList (data) {
  return Vue.http.post(getUrl('cardManager/getCardList'), data)
}
// 获取卡片(考勤卡)列表
export function cardBind (data) {
  return Vue.http.post(getUrl('cardManager/cardBind'), data)
}
// 获取卡片(考勤卡)列表
export function deleteCardBind (data) {
  return Vue.http.post(getUrl('cardManager/deleteCardBind'), data)
}
// 校园简介
export function selectInfoGardenIntroduce (data) {
  return Vue.http.post(getUrl('homepage/selectInfoGardenIntroduce'), data)
}
export function addInfoGardenIntroduceTotal (data) {
  return Vue.http.post(getUrl('homepage/addInfoGardenIntroduceTotal/' + data.id), data)
}
// 查询点赞
export function selectInfoGardenAgreewith (data) {
  return Vue.http.post(getUrl('homepage/selectInfoGardenAgreewith'), data)
}
// 点赞
export function addInfoGardenAgreewith (data) {
  return Vue.http.post(getUrl('homepage/addInfoGardenAgreewith'), data)
}

//获取校园行黑板报
export function getLocHotnewsList (data){
  return Vue.http.post(getEDUUrl('campusBlackboard/getLocHotnewsList'),data).then(t,e)
}
