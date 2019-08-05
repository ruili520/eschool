<template>
  <div class="registrants">
    <!-- 个人报名 -->
    <headcom title="报名成功" ></headcom>

    <div class="secceed" style="margin-top: .5rem">
      <img src="../../assets/img/apply/succeed.png" alt="">
      <p>报名成功</p>
    </div>


    <div class="btnCon">
      <div class="submitBtn" >邀请好友一起参加吧</div>
    </div>







  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import {
    Indicator,
    MessageBox,
    Toast
  } from 'mint-ui';
  import {} from "../../apis/app.api"

  export default {
    //组件
    components: {
      headcom
    },
    //父组件传入的数据
    props: {},
    //本地数据
    data() {
      return {


      }
    },
    //方法
    methods: {


    },
    //进入页面加载
    mounted() {

    },
    //计算属性
    computed: {},
    //监控数据变化
    watch: {

    }

  }

</script>

<style lang="less" scoped>
  .secceed{
    margin: .12rem;
    text-align: center;

  img{
    width:1rem;
    height: 1rem;
  }
  p{
    line-height: .4rem;
  }
  }

  .btnCon{
  .submitBtn{
    width: 3.51rem;
    line-height: 0.4rem;
    background-color: #ff3442;
    border-radius: 0.04rem;
    margin: 0 auto;
    text-align: center;
    font-size: 0.15rem;
    color: #fff;
  }
  }


</style>
