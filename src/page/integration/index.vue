<template>
  <div class="page">
    <headcom title="积分"></headcom>
    <p class="share"><img src="../../assets/img/share.png" alt="" ></p>
    <div class="sky" style="margin-top: .4rem">
      <div class="list"><p>积分：<span>0</span></p><p>年度账单</p></div>
      <p class="tree">
        <img src="../../assets/img/tree1.png" alt="">
      </p>
    </div>
    <div class="history">
      <p><span>历史记录</span><span>更多</span></p>
      <div style="text-align: center">
        <img src="../../assets/img/noData.png" alt="" style="width: 1rem;height: .96rem;margin-top: .4rem">
      </div>
    </div>
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  export default {
    data() {
      return {};
    },
    components: {
      headcom
    },
    mounted(){

    },
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page{
  .share{
    width: .23rem;
    height: .23rem;
    position: fixed;
    top:.1rem;
    right: .2rem;
    z-index: 10000;
  img{
    width: .23rem;
    height: .23rem;
  }
  }
  .sky{
    width: 100%;
    height:4rem;
    background: url("../../assets/img/sky.png") no-repeat;
    background-size: 100% 100%;
  .list{
    width: 100%;
    height: .45rem;
    padding-top: .2rem;
    background-color: transparent;
  p{
    width: .8rem;
    padding: .15rem;
    text-align: left;
    float: left;
    font-size: .15rem;
    font-weight: bold;
    color: #4db72c;
    background-color: rgba(255,255,255,.8);
  &:nth-of-type(1){
     border-bottom-right-radius: .4rem;
     border-top-right-radius: .4rem;
   }
  &:nth-of-type(2){
     float: right;
     text-align:right;
     background: rgba(255,255,255,.8) url("../../assets/img/integration-record.png") no-repeat center left .13rem;
     background-size: .17rem .22rem;
     border-bottom-left-radius: .4rem;
     border-top-left-radius: .4rem;
   }
  }
  }
  .tree{
    width: 1.63rem;
    height: .8rem;
    margin:2rem auto 0 auto;
  img{
    width:100% ;
  }
  }
  }
  .history{
    padding:7px 10px;
  p{
    width: 100%;
    background: url("../../assets/img/verifica/2_icon_3.png")no-repeat right center;
    background-size: .2rem .2rem;
    font-size: .13rem;
  span{
  &:nth-of-type(1){
     color: #464646;
     border-left: solid 2px #5fd33b;
     display: inline-block;
     padding-left: .06rem;
   }
  &:nth-of-type(2){
     float: right;
     padding-right: .2rem;
     color: #aeaeae;
   }
  }
  }
  }
  }
</style>
