<template>
  <div>
    <headcom title="学校收费"></headcom>
    <div class="content" style="margin-top: .4rem">
      <div class="payment">
        <div class="top">
          <span><img src="../../assets/img/schoolPay/pay.png"></span>
          <p>支付成功</p>
        </div>
        <div class="bottom">
          <p>订单编号：<span>{{this.$route.query.orderId}}</span></p>
          <p>账单名称：<span>{{decodeURI(this.$route.query.taskName) }}</span></p>
          <p>交费学生：<span>{{decodeURI(this.$route.query.studentName) }}</span></p>
          <p>所属班级：<span>{{decodeURI(this.$route.query.className) }}</span></p>
          <p>交付金额：<span>{{this.$route.query.orderAmount}}元</span></p>
          <p>交易时间：<span>{{this.$route.query.updateDate}}</span></p>
        </div>
      </div>
      <p class="btn" @click="finsh">完成</p>
      <p class="roul">缴费前请确认学生信息，如信息有误，请联系班主任老师.</p>
    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import {Swipe, SwipeItem, TabContainer, TabContainerItem, Indicator,MessageBox,Toast} from 'mint-ui';

  export default {
    //组件
    components: {
      headcom,
    } ,
    //父组件传入的数据
    props: {

    } ,
    //本地数据
    data(){
      return {

      }
    } ,

    //方法
    methods: {
      //缴费
      finsh:function(){
        sessionStorage.setItem('statepay',JSON.stringify("true"));
        this.$router.push({"name":"studentFees"});
      },

    } ,
    //进入页面加载
    mounted () {

    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {
      selected:function(v){

      }
    }

  }
</script>

<style lang="less" scoped>
  img{
    width: 100%;
  }
  .content{
    padding: .12rem;
  }
  .btn{
    line-height: .5rem;
    background: #6ac9ff;
    border-radius: .06rem;
    text-align: center;
    color: #fff;
    font-size: .22rem;
    margin-top: .2rem;
  }
  .roul{
    font-size: .12rem;
    color: #aeaeae;
    line-height: .3rem;
  }
  .payment{
  .top{
    display: flex;
    justify-content: center;
    background:#69c9ff;
    padding:.23rem 0;
    font-size:.27rem;
    color:#f3f7fd;
    border-top-left-radius: .06rem;
    border-top-right-radius: .06rem;
  span{
    display: inline-block;
    width: .42rem;
    height: .42rem;
    border-radius: 50%;
    margin-right: .14rem;
  }
  }
  .bottom{
    padding: .12rem;
    background: #fff;
    border-bottom-left-radius: .06rem;
    border-bottom-right-radius: .06rem;
  p{
    line-height: .25rem;
    font-size: .12rem;
    color: #aeaeae;
  span{
    font-size: .16rem;
    color: #464646;
  }
  }
  }
  }
</style>
