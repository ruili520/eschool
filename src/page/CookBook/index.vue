<!--每日食谱-->
<template>
  <div>
    <headcom title="菜谱"></headcom>
    <div class="conter" style="margin-top: .5rem">
      <weekpage></weekpage>
    </div>
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  import { TabContainer, TabContainerItem, Indicator,MessageBox,Toast} from 'mint-ui';
  import weekpage from "../../components/cookbook/weekPage"

  export default{
    //组件
    components: {
      headcom,
      weekpage
    } ,

    //本地数据
    data(){
      return {
        name:"宝宝动态",
        selected:"1",
        month:true,
        list:[false,true,true],
        mate:true,
      }
    } ,

    //方法
    methods: {

      },

    mounted() {

    },

    //计算属性
    /*computed: {} ,*/
    //监控数据变化
   /* watch: {

    }*/

  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    height: .49rem;
    width: 100%;
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: none;
    color: none;
  }
  .icon{
    width: .22rem;
    height: .22rem;
    margin: 0 auto .05rem auto;
  img{
    width: 100%;
  }

  }
  .mint-navbar .mint-tab-item{
    padding-top: .04rem;
  }
  .mint-navbar .mint-tab-item.is-selected{
    color: #ff3442;
  }
  .mint-tab-item-label{
    color: #9b9b9b;
  }
  }
</style>
