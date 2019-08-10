<!--学生缴费页面-->
<template>
  <div class="page" style="width: 100%;height: 100%;">
    <headcom :title="titleName" :callbackTrue="true" :callback="back"></headcom>
    <p v-if="status== '0' " class="payCard" @click="swtich">缴费记录</p>
    <div class="conter" style="margin-top: .4rem ">
      <div v-for="item in allList.nonpay">
        <card :payCallback="linkPay" :item="item"></card>
      </div>
      <div v-for="item in allList.payIng">
        <card :item="item" :payCallback="linkPay"></card>
      </div>
      <div v-for="item in allList.paidList">
        <card :item="item"></card>
      </div>
    </div>

    <nodata v-if="allList.nonpay.length == 0&&allList.payIng.length == 0&&allList.paidList.length == 0"></nodata>
    <p v-if="status!= '0' " style="font-size: 12px;text-align: center;padding-bottom: .1rem">仅展示一年的记录</p>
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  import nodata from "../../components/informatio/noData"
  import {TabContainer, TabContainerItem, Indicator, MessageBox, Toast} from 'mint-ui';
  import card from "../../components/schoolPag/card/index.vue"
  import {getFeeList, getsession} from "../../apis/app.api"
  export default {
    //组件
    components: { headcom, card, nodata },
    //父组件传入的数据
    props: {},
    //本地数据
    data() {
      return {
        status:'0',
        allList: {
          "nonpay":[],
          "paidList":[],
          "payIng":[]
        }, //支付和未支付分组数据
      }
    },
    //方法
    methods: {
      shortLogIn(){
        console.log('到底有没有！')
      },
      //返回首页
      back() {
        if(this.status!='0'){
          this.status='0';
          this.getFeeList()
        }else {
          this.$router.push({
            "name": "index",
            "query": {
              mode: "open"
            }
          });
        }
      },
      //获取缴费列表
      getFeeList() {
        var vm = this;
        this.$getFeeList({status:this.status},function (res) {
          console.log(res);
          if (res.code == "000001") {
            var list = res.result;
            console.log(res.result)
            var paid = []; //已支付
            var pay = []; //未支付
            var payIng = []; //支付待确认
            $.each(list, function (i) {
              if (list[i].status == "1") {
                paid.push(list[i]);
              } else if (list[i].status == "4") {
                payIng.push(list[i]);
              } else {
                pay.push(list[i]);
              }
            });
            vm.allList.nonpay = pay;
            console.log(vm.allList.nonpay+"===============================");
            vm.allList.paidList = paid;
            console.log(vm.allList.paidList+"--------------------------------");
            vm.allList.payIng = payIng;
            console.log(vm.allList.payIng+"000000000000000000000000000000000");
          } else {
            MessageBox({
              title: "请求数据失败"
            });
          }
        },function (res) {
        });
      },
      swtich(){
        this.status='1';
        this.getFeeList()
      },
      //跳转到支付详情页面
      linkPay(value) {
        console.log(value);
        this.$store.dispatch('setpayData', value);
        this.$router.push({
          name: "schoolPay",
          query: {
            "itemId": value.itemId,
            "taskId":value.taskId,
          }
        })
      }
    },
    //进入页面加载
    mounted() {
      this.getFeeList();
    },
    //计算属性
    computed: {
      titleName(){
        return this.status=='0'?'宝贝费用':'缴费账单'
      },
    },
    //监控数据变化
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .payCard{
    position: fixed;
    top: 0;
    right: .12rem;
    width: .7rem;
    text-align: center;
    line-height: .44rem;
    height: .44rem;
    z-index: 9999;
    color: #000;
    font-size: .14rem;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    height: .49rem;
    width: 100%;

    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: none;
      color: none;
    }
    .icon {
      width: .22rem;
      height: .22rem;
      margin: 0 auto;
      margin-bottom: .05rem;
      img {
        width: 100%;
      }

    }
    .mint-navbar .mint-tab-item {
      padding-top: .04rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
      color: #ff3442;
    }
    .mint-tab-item-label {
      color: #9b9b9b;
    }
  }

  .conter {
    margin-bottom: .12rem;
  }

</style>
<style>
  .conter .stufees:nth-child(even) .portrait span {
    background: #ffc600;
  }

</style>

