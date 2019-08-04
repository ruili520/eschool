
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
      path: '/bankIndex',
      name: 'bankIndex',
      meta: {
        title: '小小银行家'
      },
      component: r => require.ensure([], () => r(require('@/page/bankIndex/index')), 'bankIndex'),
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
      path: '/videoMonitoring',
      name: 'videoMonitoring',
      meta: {
        title: '校园监控'
      },
      component: r => require.ensure([], () => r(require('@/page/videoMonitoring/index')), 'studentFees'),
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
      path: '/information',
      name: 'information',
      meta: {
        title: '信箱历史'
      },
      component: r => require.ensure([], () => r(require('@/page/information/index')), 'information'),
    },
    {
      path: '/Album',
      name: 'Album',
      meta: {
        title: '班级相册'
      },
      component: r => require.ensure([], () => r(require('@/page/classAlbum')), 'classAlbum'),
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
      path: '/vacate',
      name: 'vacate',
      meta: {
        title: '请假'
      },
      component: r => require.ensure([], () => r(require('@/page/vacate/index')), 'vacate'),
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
