<template>
  <div class="leave">
    <headcom title="请假详情"></headcom>

    <div class="title" style="margin-top: .5rem">
      <p>审批</p>
      <div class="leaveName">
        <p>{{info.studentName}}的请假</p>
        <p class="consent" v-if="info.status == 1">已同意</p>
        <p class="refuse" v-if="info.status == 0">待审核</p>
        <p class="refuse" v-if="info.status == 2">被拒绝</p>
      </div>
      <p>
        <span class="name">请假类型：</span>
        <span>{{info.leaveType == 2?"事假":"病假"}}</span>
      </p>
      <p>
        <span class="name">开始时间：</span>
        <span>{{info.startDateStr}} {{info.startAmPm}}</span>
      </p>
      <p>
        <span class="name">结束时间：</span>
        <span>{{info.endDateStr}} {{info.endAmPm}}</span>
      </p>
    </div>
    <div class="line"></div>
    <div v-if="info.status == 2" class="refuseTitle">
      <span>拒绝理由</span>
    </div>
    <div class="refusetext" v-if="info.status == 2">
      {{reply}}
    </div>
  </div>
</template>

<script>
  // import HeaderComponent from './components/header.vue';
  import headcom from "../../components/headcom"

  import {
    getLeaveNotifyDetail
  } from "../../apis/app.api.js";
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    //引入的组件
    components: {
      headcom
    },
    //父组件传入的值
    props: {

    },
    data() {
      return {
        info:{}
      }
    },
    //方法
    methods: {
      getLeaveNotifyDetail: function () {
        var vm = this;
        vm.$getLeaveNotifyDetail({
          id: vm.$route.query.id
        },function (res) {
          console.log("99999")
          console.log(res)
          console.log("99999")
          if (res.code === "000001") {
            vm.info = res.result;
          } else {
            MessageBox({
              title: '提示',
              message: res.message,
            })
          }
        },function (res) {
          MessageBox({
            title: '提示',
            message: '数据请求失败'
          })
        })
      }
    },
    //进入页面加载
    mounted() {
      this.getLeaveNotifyDetail();
    },
    //计算属性
    computed: {},
    //监控数据变化
    watch: {}
  }

</script>

<style scoped lang="less">
  .title{
    line-height: .26rem;
    padding: 0 .12rem;
    background-color: #fff;
    border-top: 1px solid #f6f6f6;
  .name{
    color: #aeaeae;
  }
  }
  .line{
    height: .12rem;
    background: #f6f6f6;
  }
  .leaveName{
    display: flex;
    justify-content: space-between;
  .consent{
    color: #31df7f;
  }
  .refuse{
    color: #ff3442;
  }
  }
  .refuseTitle{
    padding: .12rem;
    background: #fff;
  span{
    border-left:1px solid #ff3442;
    color: #aeaeae;
    padding-left: .06rem;
  }
  }
  .refusetext{
    padding:0 .12rem .12rem;
    background: #fff;
  }


</style>
