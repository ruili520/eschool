
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '智慧校园'
      },
      component: r => require.ensure([], () => r(require('@/page/index/index')), 'Examination'),
    },
    {
      path: '/StudentFees',
      name: 'studentFees',
      meta: {
        title: '学生缴费'
      },
      component: r => require.ensure([], () => r(require('@/page/studentFees/index')), 'studentFees'),
    },
    {
      path: '/verification',
      name: 'verification',
      meta: {
        title: '选择身份'
      },
      component: r => require.ensure([], () => r(require('@/page/verification/index')), 'verification'),
    },
    {
      path: '/video',
      name: 'video',
      meta: {
        title: '视频'
      },
      component: r => require.ensure([], () => r(require('@/page/video/index')), 'video'),
    },
    {
      path: '/vacateDetails',
      name: 'vacateDetails',
      meta: {
        title: '请假明细页'
      },
      component: r => require.ensure([], () => r(require('@/page/vacateDetails/index')), 'vacateDetails'),
    },
    {
      path: '/bankIndex',
      name: 'bankIndex',
      meta: {
        title: '小小银行家'
      },
      component: r => require.ensure([], () => r(require('@/page/bankIndex/index')), 'bankIndex'),
    },
    {
      path: '/groupApply',
      name: 'groupApply',
      meta: {
        title: '团体报名'
      },
      component: r => require.ensure([], () => r(require('@/page/groupApply/index')), 'groupApply'),
    },
    {
      path: '/shuttle',
      name: 'shuttle',
      meta: {
        title: '宝宝动态、学生费用、我的'
      },
      component: r => require.ensure([], () => r(require('@/page/shuttle/index')), 'shuttle'),
    },
    {
      path: '/identity',
      name: 'identity',
      meta: {
        title: '我的宝贝'
      },
      component: r => require.ensure([], () => r(require('@/page/identity/index')), 'identity'),
    },
    {
      path: '/schoolBell',
      name: 'schoolBell',
      meta: {
        title: 'schoolBell'
      },
      component: r => require.ensure([], () => r(require('@/page/schoolBell/index')), 'schoolBell'),
    },
    {
      path: '/schoolBellInfo',
      name: 'schoolBellInfo',
      meta: {
        title: 'schoolBellInfo'
      },
      component: r => require.ensure([], () => r(require('@/page/schoolBellInfo/index')), 'schoolBellInfo'),
    },
    {
      path: '/integration',
      name: 'integration',
      meta: {
        title: '积分'
      },
      component: r => require.ensure([], () => r(require('@/page/integration/index')), 'integration'),
    },
    {
      path: '/lombardIndex',
      name: 'lombardIndex',
      meta: {
        title: '活动报名'
      },
      component: r => require.ensure([], () => r(require('@/page/lombardIndex/index')), 'lombardIndex'),
    },
    {
      path: '/retrospect',
      name: 'retrospect',
      meta: {
        title: '活动回顾'
      },
      component: r => require.ensure([], () => r(require('@/page/retrospect/index')), 'retrospect'),
    },
    {
      path: '/schoolPay',
      name: 'schoolPay',
      meta: {
        title: '支付详情'
      },
      component: r => require.ensure([], () => r(require('@/page/schoolPay/index')), 'schoolPay'),
    },
    {
      path: '/joinGarten',
      name: 'joinGarten',
      meta: {
        title: '加入幼儿园'
      },
      component: r => require.ensure([], () => r(require('@/page/joinGarten/index')), 'joinGarten'),
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        title: '我的'
      },
      component: r => require.ensure([], () => r(require('@/page/mine/index')), 'mine'),
    },
    {
      path: '/registrants',
      name: 'registrants',
      meta: {
        title: '个人报名'
      },
      component: r => require.ensure([], () => r(require('@/page/registrants/index')), 'registrants'),
    },

    {
      path: '/leave',
      name: 'leave',
      meta: {
        title: '请假'
      },
      component: r => require.ensure([], () => r(require('@/page/leave/index')), 'leave'),
    },
    {
      path: '/memberCentre',
      name: 'memberCentre',
      meta: {
        title: '成员中心'
      },
      component: r => require.ensure([], () => r(require('@/page/memberCentre/index')), 'memberCentre'),
    },
    {
      path: '/agreement',
      name: 'agreement',
      meta: {
        title: '用户协议'
      },
      component: r => require.ensure([], () => r(require('@/page/agreement/index')), 'memberCentre'),
    },
    {
      path: '/applySucceed',
      name: 'applySucceed',
      meta: {
        title: '报名成功'
      },
      component: r => require.ensure([], () => r(require('@/page/applySucceed/index')), 'applySucceed'),
    },
    {
      path: '/videoMonitoring',
      name: 'videoMonitoring',
      meta: {
        title: '校园监控'
      },
      component: r => require.ensure([], () => r(require('@/page/videoMonitoring/index')), 'studentFees'),
    },
    {
      path: '/billingDetails',
      name: 'billingDetails',
      meta: {
        title: '账单详情'
      },
      component: r => require.ensure([], () => r(require('@/page/billingDetails/index')), 'studentFees'),
    },
    {
      path: '/mailParticulars',
      name: 'mailParticulars',
      meta: {
        title: '详情'
      },
      component: r => require.ensure([], () => r(require('@/page/mailParticulars/index')), 'studentFees'),
    },

    {
      path: '/school',
      name: 'school',
      meta: {
        title: '学校列表'
      },
      component: r => require.ensure([], () => r(require('@/page/SchoolSummary/school')), 'schoolList'),
    },
    {
      path: '/schoolSummary',
      name: 'schoolSummary',
      meta: {
        title: '校园简介'
      },
      component: r => require.ensure([], () => r(require('@/page/SchoolSummary/index')), 'SchoolSummary'),
    },
    {
      path: '/schoolFees',
      name: 'schoolFees',
      meta: {
        title: '学校收费'
      },
      component: r => require.ensure([], () => r(require('@/page/schoolFees/index')), 'schoolFees'),
    },
    {
      path: '/information',
      name: 'information',
      meta: {
        title: '信箱历史'
      },
      component: r => require.ensure([], () => r(require('@/page/information/index')), 'information'),
    },
    {
      path: '/activityDetails',
      name: 'activityDetails',
      meta: {
        title: '活动详情'
      },
      component: r => require.ensure([], () => r(require('@/page/activityDetails/index')), 'activityDetails'),
    },
    {
      path: '/Album',
      name: 'Album',
      meta: {
        title: '班级相册'
      },
      component: r => require.ensure([], () => r(require('@/page/classAlbum/index')), 'classAlbum'),
    },
    {
      path: '/monthView',
      name: 'monthView',
      meta: {
        title: '宝宝考勤'
      },
      component: r => require.ensure([], () => r(require('@/page/monthView/index')), 'monthView'),
    },
    {
      path: '/teacherFees',
      name: 'teacherFees',
      meta: {
        title: '缴费完成情况'
      },
      component: r => require.ensure([], () => r(require('@/page/teacherFees/index')), 'teacherFees'),
    },
    {
      path: '/babyDynamic',
      name: 'babyDynamic',
      meta: {
        title: '宝宝考勤'
      },
      component: r => require.ensure([], () => r(require('@/page/babyDynamic/index')), 'SignUp'),
    },
    {
      path: '/recharge',
      name: 'recharge',
      meta: {
        title: '充值记录'
      },
      component: r => require.ensure([], () => r(require('@/page/recharge/index')), 'recharge'),
    },
    {
      path: '/vacate',
      name: 'vacate',
      meta: {
        title: '请假'
      },
      component: r => require.ensure([], () => r(require('@/page/vacate/index')), 'vacate'),
    },
    {
      path: '/takePartIn',
      name: 'takePartIn',
      meta: {
        title: '我参与的'
      },
      component: r => require.ensure([], () => r(require('@/page/takePartIn/index')), 'takePartIn'),
    },
    {
      path: '/Paysess',
      name: 'Paysess',
      meta: {
        title: '学校收费'
      },
      component: r => require.ensure([], () => r(require('@/page/Paysess/index')), 'Paysess'),
    },
    {
      path: '/comment',
      name: 'comment',
      meta: {
        title: '评论'
      },
      component: r => require.ensure([], () => r(require('@/page/comment/index')), 'comment'),
    },
    {
      path: '/schoolMsg',
      name: 'schoolMsg',
      meta: {
        title: '我的消息'
      },
      component: r => require.ensure([], () => r(require('@/page/schoolMsg/index')), 'vacate'),
    },

    {
      path: '/signUp',
      name: 'signUp',
      meta: {
        title: '报名'
      },
      component: r => require.ensure([], () => r(require('@/page/SignUp/index')), 'SignUp'),
    },
    {
      path: '/signUpInput',
      name: 'signUpInput',
      meta: {
        title: '填写信息'
      },
      component: r => require.ensure([], () => r(require('@/page/signUpInput/index')), 'signUpInput'),
    },
    {
      path: '/cookbook',
      name: 'cookbook',
      meta: {
        title: '每日食谱'
      },
      component: r => require.ensure([], () => r(require('@/page/CookBook/index')), 'SignUp'),
    },
    {
      path: '/teacherMessage',
      name: 'teacherMessage',
      meta: {
        title: '教师信息'
      },
      component: r => require.ensure([], () => r(require('@/page/teacherMessage/index')), 'teacherMessage'),
    },
    {
      path: '/service',
      name: 'service',
      meta: {
        title: '园长信箱'
      },
      component: r => require.ensure([], () => r(require('@/page/service/index')), 'Service'),
    },
    {
      path: '/signUpDetails',
      name: 'signUpDetails',
      meta: {
        title: '报名'
      },
      component: r => require.ensure([], () => r(require('@/page/signUpDetails/index')), 'signUpDetails'),
    },
    {
      path: '/badyCard',
      name: 'badyCard',
      meta: {
        title: '宝贝卡'
      },
      component: r => require.ensure([], () => r(require('@/page/babyCard/index')), 'babyCard'),
    },
    {
      path: '/colleges/Examination',
      name: 'Examination',
      meta: {
        title: '助力考'
      },
      component: r => require.ensure([], () => r(require('@/page/Examination/index')), 'Examination'),
    },
    {
      path: '/colleges/Discount',
      name: 'Discount',
      meta: {
        title: '享折扣'
      },
      component: r => require.ensure([], () => r(require('@/page/Discount/index')), 'Discount'),
    },
    {
      path: '/colleges/Blackboard',
      name: 'Blackboard',
      meta: {
        title: '校园黑板报'
      },
      component: r => require.ensure([], () => r(require('@/page/Blackboard/index')), 'Blackboard'),
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: '校园黑板报'
      },
      component: r => require.ensure([], () => r(require('@/page/test/test')), 'Examination'),
    },
  ],
  mode:'history'
})
