<template>
  <div>
    <nodata v-if="!list.length"></nodata>
    <div class="information">
      <headcom title="信箱历史" v-if="headcomShow"></headcom>
      <information
        v-for='info of list' :key='info.id' :info="info" @detail-router='detailRouter($event)'
      ></information>
    </div>
  </div>
</template>

<script>
  import {getTMailboxList } from "../../apis/app.api"
  import headcom from "../../components/headcom"
  import information from "../../components/informatio/information"
  import nodata from "../../components/informatio/noData"
  import { TabContainer, TabContainerItem, Indicator, MessageBox, Toast } from 'mint-ui';
  import { lonIn } from "../../static/js/logIn";

  export default {
    //父组件传入的数据
    props: {
      title: String
    },
    components: {
      headcom,
      information,
      nodata
    },
    //本地数据
    data() {
      return {
        headcomShow: true, //头部是否显示
        allLoaded: true, //是否开启无限加载
        list: []
      }
    },
    //方法
    methods: {
      //无限加载
      loadBottom: function() {
        this.page++;
        this.getCampusMessageListByUser();
        //console.log("触发无限加载");
      },
      //获取消息列表
      getCampusMessageListByUser: function() {
        var vm = this;
        this.$getTMailboxList({
          "page": this.page,
          "size": 20
        },function (res) {
          if (res.code === '000001') {
            vm.list = res.result;
          } else
          {
            Toast(res.message);
          }
        },function (res) {
          MessageBox({
            title: '提示',
            message: '获取数据失败',
          })
        })
      },
      //格式化时间
      formattingDate: function(timedata) {
        var date = new Date(timedata);
        var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return Month + "-" + d + " " + h + ":" + m;
      },
      changSta: function(data) {
        //console.log(this[data.cre]);
        //console.log(this[data.cre][data.index]);
        this[data.cre][data.index].status = data.state;
        //console.log(this[data.cre][data.index].status);
      },
      detailRouter(mailId) {
        this.$router.push({
          name: 'mailParticulars',
          query: {
            mailId: mailId
          }
        });
      }
    },
    //进入页面加载
    mounted() {
      console.log(this.info);
      //关闭二级页面时刷新数据
      window.native.RecoderRefresh();
      $("body").scrollTop("0px");
      lonIn(() => {
        console.log('调用登录');
        this.getCampusMessageListByUser();
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
    color: #ff3442;
    font-size: .15rem;
  }

  .action .add {
    display: block;
    width: .12rem;
    height: .02rem;
    background: #ff3442;
    position: absolute;
    bottom: .1rem;
    left: .55rem;
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
    left: .91rem;
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
