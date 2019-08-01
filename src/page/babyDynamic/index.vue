<!--宝贝打卡记录-->
<template>
  <div :style="{ height: contentHeight }">
    <headcom title="宝宝考勤" :month = "true"></headcom>
    <div class="child">
      <child :callBack="modification"></child>
    </div>
    <div class="conter">
      <weekpage :state="state"></weekpage>
    </div>
    <div class="fot">
      <span style="margin: 0 10px;display: inline-block;">友情提示：考勤数据基于考勤记录计数，请规范考勤行为，避免判断错误</span>
    </div>
  </div>
</template>

<script>
  import headcom from '../../components/headcom'
  import child from '../../components/child'
  import weekpage from '../../components/headcom'
  export default {
    name:'',
    components:{
      headcom, child,weekpage
    },
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .child{
    position: absolute;
    top: .12rem;
    right: .22rem;
    width: .25rem;
    height: .25rem;
    z-index: 9999;
  }
  .fot{
    position: absolute;
    bottom: .2rem;
    // height: .4rem;
    width: 90%;
    left: 5%;
    padding: .1rem 0;
    font-size: .15rem;
    color: #666;
    background-color: #eee;
  }
</style>
