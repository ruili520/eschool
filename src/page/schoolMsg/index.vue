<!--我的消息页面-->
<template>
  <div class="information">
    <headcom title="我的消息"></headcom>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" :class="{action:selected == 1}">请假反馈
        <span class="add"></span>
        <i :class="{hint:hint1}"></i>
      </mt-tab-item>
      <mt-tab-item id="2" :class="{action:selected == 2}">园长回复
        <span class="add"></span>
        <i :class="{hint:hint2}"></i>
      </mt-tab-item>
    </mt-navbar>

    <mt-tab-container :swipeable=true v-model="selected">
      <mt-tab-container-item id="1">
        <LeaveNotify v-for='info of leaveNotifyList'
                     :key='info.id' :info="info"
                     @detail-router='detailLeaveNotify($event)'></LeaveNotify>
        <nodata v-if="!table1"></nodata>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <information v-for='info of list'
                     :key='info.id' :info="info"
                     @detail-router='detailRouter($event)'></information>
        <nodata v-if="!table2"></nodata>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import headcom from '../../components/headcom'
  import information from "../../components/schoolMsg/information"
  import LeaveNotify from "../../components/schoolMsg/LeaveNotify"
  import nodata from "../../components/schoolMsg/noData"
  import {
    TabContainer,
    TabContainerItem,
    Indicator,
    MessageBox,
    Toast
  } from 'mint-ui';
  import {
    lonIn
  } from "../../static/js/logIn";

  export default {
    name: '',
    components: {
      headcom, information, LeaveNotify, nodata
    },
    data() {
      return {
        list: [], //校长回复的数据
        leaveNotifyList: [], //请假的数据
        selected: "1",
        table1: false,
        table2: true,
        hint1: false,
        hint2: false,
      }
    },
    methods: {
      getCampusMessageListByUser: function () {
        var vm = this;
        this.$getTMailboxList({}, function (res) {
          if (res.code == '000001') {
            vm.list = res.result;
            let mailData = [];
            for (const mail of vm.list) {
              if (mail.status == 2) {
                mailData.push(mail);
              }
            }
            vm.list = mailData;
            if (vm.list.length > 0) {
              vm.table2 = true;
            } else {
              vm.table2 = false;
            }
            for (const item of vm.list) {
              if (item.isRead == 0) {
                vm.hint2 = true;
              }
            }
          } else {
            Toast(res.body.message);
          }
        }, function (res) {
        })
      },
      //获取院长回复消息列表
      getLeaveNotifyList: function () {
        var vm = this;
        this.$getLeaveNotifyList({},function (res) {
          if (res.code == '000001') {
            vm.leaveNotifyList = res.result;
            if (vm.leaveNotifyList.length > 0) {
              vm.table1 = true;
            } else {
              vm.table1 = false;
            }
            for (const item of vm.leaveNotifyList) {
              if (item.isRead == 0) {
                vm.hint1 = true;
              }
            }
          } else {
            Toast(res.body.message);
          }
        },function (res) {
          vm.table = false;
          MessageBox({
            title: '提示',
            message: '获取数据失败',
          })
        })
      },

      //格式化时间
      formattingDate: function (timedata) {
        var date = new Date(timedata);
        var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return Month + "-" + d + " " + h + ":" + m;
      },
      detailRouter(mailId) {
        var vm =this;
        this.$readTMailbox(mailId,function (res) {
          console.log(res);
          vm.$router.push({
            name: 'mailParticulars',
            query: {
              mailId: mailId
            }
          });
        },function (res) {
        });
      },
      detailLeaveNotify(Id) {
        this.$router.push({
          name: 'leave',
          query: {
            id: Id
          }
        });
      }

    },

    //进入页面加载
    mounted() {
      //关闭二级页面时刷新数据
      window.native.RecoderRefresh();
      $("body").scrollTop("0px");


      lonIn(() => {
        this.getCampusMessageListByUser();
        this.getLeaveNotifyList();
      });
     }
    }
</script>

<style lang="less" scoped>
  .information .mint-navbar {
    width: 100%;
    position: fixed;
    top: .44rem;
    left: 0;
    background: #fff;
    z-index: 2;
  }

  .information .mint-navbar .mint-tab-item {
    color: #8f8f8f;
    position: relative;
    font-size: .12rem;
  }

  .information .mint-navbar .action {
    color: #000;
    font-size: .15rem;
  }

  .action .add {
    display: block;
    width: .12rem;
    height: .02rem;
    background: #ff3442;
    position: absolute;
    bottom: .1rem;
    left: .85rem;
    border-radius: .02rem;
  }

  .hint {
    display: block;
    width: .04rem;
    height: .04rem;
    background: #ff3442;
    border-radius: 50%;
    position: absolute;
    top: .15rem;
    left: 1.3rem;
  }

  .mint-tab-container-item {
    margin-top: .44rem;
  }

</style>
<style>
  .information .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    margin-bottom: 0px;
  }

</style>

