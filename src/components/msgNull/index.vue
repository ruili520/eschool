<template>
    <div v-show="imgShow">
      <div class="msgNull">
        <img src="./../../assets/img/msg-null.png" alt="">
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
    // import HeaderComponent from './components/header.vue'

    export default{
        //父组件传入的数据
        props: {
          title:String,
          imgShow:Boolean
        } ,
        //本地数据
        data(){
            return {

            }
        } ,
        //方法
        methods: {} ,
        //进入页面加载
        mounted () {

        } ,
        //计算属性
        computed: {} ,
        //监控数据变化
        watch: {}

    }
</script>

<style lang="less" scoped>
  .msgNull{
    background-color: #f6f6f6;
    padding:.12rem;
    text-align: center;
    img{
      width:.3rem;
      height: .3rem;
      vertical-align: middle;
      margin-right: .06rem;
    }
    span{
      color: #dbdbdb;
      font-size: .13rem;
      vertical-align: middle;
    }
  }
</style>
