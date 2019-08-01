<template>
  <div class="pay" style="margin-top: .1rem;">
    <main>
      <div class="content" style="color:#434343;" v-if="item.status!='1'" :class="{backY:item.status!='1'}">
        <p class="icon">
          {{item.taskName}}
        </p>
        <p class="name">缴费宝贝：<span>{{item.studentName}}</span></p>
        <p class="name">所属班级：<span>{{item.className}}</span></p>
        <p class="name">缴费截止日期：{{item.endDate | timeFormatting}}</p>
        <p class="price">
          <span>￥{{item.amount|currency}}</span>
          <span style="display: inline-block;float: right;" @click="payCallback(item)">去支付</span>
        </p>
      </div>
      <div style="margin-top: .1rem;" v-else>
        <p>{{ item.month | date }}</p>
        <div class="content content2" v-for="(t,i) of item.feeRespDtos " @click="billDetails(t)" :key="i">
          <p>{{t.taskName}}</p>
          <p>{{t.studentName}}
            <span style="font-size: .18rem;float: right;">￥{{t.amount|currency}}</span></p>
          <p>{{t.createDate | timeFormatting}}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { MessageBox } from "mint-ui";
  export default{
    //组件
    components: {} ,
    //父组件传入的数据
    props: {
      item:Object,
      index:Number,
      payCallback:{
        type:Function,
        default:()=>{}
      }
    },
        //过滤器
    filters: {
      timeFormatting(value,type) {
        //元素的补零计算
        function addZero(val){if(val < 10){return "0" +val;}else{return val;}};
        var data = new Date();
        data.setTime(value);
        var year   =  data.getFullYear();
        var month  =  addZero(data.getMonth() + 1);
        var day    =  addZero(data.getDate());
        var hour   =  addZero(data.getHours());
        var minute =  addZero(data.getMinutes());
        var second =  addZero(data.getSeconds());
        return year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
        // return year + "-"+month + "-" + day + " " ;

       //将格式化后的字符串输出到前端显示
      },
      date(value){
        return value.substr(0,4)+'年'+value.substr(4)+'月'
      },
      currency(value){
        return value.toFixed(2)
      }
    },
    //本地数据
    data(){
      return {
        studentName:"涵涵",
        stopTime:"2018-3-18",
        studentId:'',
        taskName:'',
        itemId:""
      }
    } ,

    //方法
    methods: {
      billDetails(studentId){
          this.$router.push({
            path:'/billingDetails',
            query:{
              // studentId:studentId.taskId,
              taskName:studentId.taskName,
              itemId: studentId.taskId
            }
          })
      }
    } ,
    //进入页面加载
    mounted () {},
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  img{
      width: 100%;
  }
  main{
      padding: 10px .12rem;
  }
  .content{
    padding:.12rem 0 0 0;
    height: 1.4rem;
    background: #00A0E9;
    border-radius: .06rem;
    color: #fff;
    .name{
      padding:0 .12rem ;
      font-size: .13rem;
      margin-top: .07rem;
      span{
        font-size: .13rem;
      }
    }
    .price{
      font-size: .2rem;
      color: #fff;
      height: .35rem;
      line-height: .35rem;
      background-color: #ff9c9c;
      margin-top: .12rem;
      padding: 0 .08rem;
      border-bottom-left-radius: .05rem;
      border-bottom-right-radius: .05rem;
    }
  }
  .content2{
    padding:.06rem .12rem;
    height:.8rem;
    margin: .08rem 0;
    &:nth-of-type(1){
      margin-top: 0;
    }
    p{
      font-size: .14rem;
      padding-top: .04rem;
      &:nth-of-type(1){
        padding-top: 0;
      }
    }
  }
  .icon{
    background: url("../../../assets/img/book.png")no-repeat center left;
    background-size: .13rem .15rem;
    padding: 0 .12rem 0 .18rem;
    margin-left: .12rem;
    overflow: hidden;
    margin-bottom: .05rem;
    font-size: .16rem;
    line-height: .2rem;
    span{
        display: inline-block;
        width: .21rem;
        vertical-align: middle;
        margin-right: .08rem;
    }
    .seek{
      font-size: .1rem;
      text-align: right;
      color: #fff;
      float: right;
      width: 30%;
    }
  }
  .backY{
      background: #fff;
  }
</style>
