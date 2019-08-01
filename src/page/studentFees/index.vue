<!--学生缴费页面-->
<template>
  <div class="page" style="width: 100%;height: 100%;">
    <headcom :title="titleName" :callbackTrue="true" :callback="back"></headcom>
    <p v-if="status== '0' " class="payCard" @click="swtich">缴费记录</p>
    <div class="conter" style="margin-bottom:10px">
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
  import headcom from '../../components/headcom/index'
  import nodata from '../../components/informatio/noData'
  import card from "../../components/schoolPag/card/index.vue"
  export default {
    name:'',
    components:{
      headcom,nodata,card
    },
    data(){
      return{
        status:"0",
        allList: {
          "nonpay":[],
          "paidList":[],
          "payIng":[]
        }
      }
    },
    //计算属性
    computed: {
      titleName(){
        return this.status=='0'?'宝贝费用':'缴费账单'
      },
    },
    methods:{
      //缴费查询
      swtich(){
        this.status="1"
      },
      //返回栏返回
      back(){
        if(this.status!='0'){
          this.status='0';
          this.getFeeList()
        }else {
          this.$router.push({
            "name": "index",
            // "query": {
            //   mode: "open"
            // }
          });
        }
      },
    }
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

