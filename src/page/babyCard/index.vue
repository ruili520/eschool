<template>
  <div class="page">
    <headcom title='考勤卡'></headcom>
    <div class="child">
      <child :callBack="modification"></child>
    </div>
    <slide :state="state"></slide>
    <div style="margin-top: .44rem"><p @click="active = false " class="bind"><i class=""></i>+ 绑定考勤卡</p></div>
    <div v-if="!active" class="popup" @click="active = true "></div>
    <div v-if="!active" class="popupVisible">
      <p><span>请输入考勤卡号</span> <img @click="active = true " src="../../assets/img/babyCard-close.png" alt=""></p>
      <p style="margin-top:0;">
        <input type="tel" v-model="cardNo" maxlength="10" />
        <img src="../../assets/img/slide.png" alt="" style="display: inline-block;width: 100%;height: .02rem">
        <span class="tip">考勤卡号是卡片上的10位数字号码哦</span>
      </p>
      <p style="margin-top: .06rem"><mt-button :disabled="isDis" @click="bindCard" size="large" type="danger">绑定考勤卡</mt-button></p>
    </div>
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  import child from "../../components/child"
  import slide from "../../components/bodyCard"
  import { MessageBox,Indicator } from "mint-ui";
  export default {
    data() {
      return {
        state:false,
        active:true,
        cardNo:''
      }
    },
   /* computed: {
      isDis(){
        return this.cardNo.length!=10 ? true : false
      }
    },*/
    components: {
      headcom,
      slide,
      child
    },
    methods: {
      getCardList(){
        var vm=this;
        var data = {};
        this.$getCardList(data
          ,function (res) {
            console.log(res);
          },function (res) {
            console.log(res)
          })
      },
      modification(){
        this.state = !this.state;
      },
      bindCard(){
        var vm =this;
        if(this.cardNo==''){
          MessageBox("提示",'请输入考勤卡号！');
          return false
        }
        // Indicator.open({ spinnerType: 'fading-circle' });
        this.$cardBind({cardNo:this.cardNo},function (res) {
          if(res.code == "000001"){
            window.location.reload()
          }else{
            vm.$messagebox("提示",res.message);
          }
        },function (res) {
           vm.$messagebox({title: "请求数据失败"});
        })
      }
    },
    mounted(){
      this.getCardList;
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page {
    background-color: #f5f5f5;
    height: 100%;
  .child{
    position: absolute;
    top: .12rem;
    right: .22rem;
    width: .25rem;
    height: .25rem;
    z-index: 9999;
  }
  .bind {
    width: 96%;
    margin-left: 2%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #fff;
    border: 0.003rem dashed #bbb;
    margin-top: 10px;
  }
  .popup{
    width: 100%;
    height: 100%;
    background-color: rgba(54,55,56,.4);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10000;
  }
  .popupVisible{
    width: 90%;
    padding:10px 0;
    height:155px;
    background-color:#fff;
    border-radius: .1rem;
    position: fixed;
    left: 5%;
    top: 50%;
    margin-top: -75px;
    z-index: 10001;
  p{
    padding: 0.05rem 0.25rem;
    font-size: 0.18rem;
    text-align: center;
  img{
    width:14px;
    height:14px;
    display: inline-block;
    float: right;
    vertical-align: middle;
  }
  input{
    height: 30px;
    width: 100%;
    display: inline-block;
    line-height: 30px;
    border: none;
    letter-spacing: 0.19rem;
    padding-left: .07rem;
    outline:none;
  }
  &:nth-of-type(2){
  span{
    background: url("../../assets/img/tip.png") left center no-repeat;
    background-size: .1rem .1rem;
    color: #707070;
    display: block;
    padding-left: .15rem;
    margin-top: .1rem;
    font-size: .1rem;
    text-align: left;
          }
        }
      }
    }
  }
</style>
