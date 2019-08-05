<template>
  <div>
    <headcom title="我的"></headcom>
    <div class="conter">

      <mine></mine>

    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import { TabContainer, TabContainerItem, Indicator,MessageBox,Toast} from 'mint-ui';
  import mine from "../../components/verification/mine"
  export default{
    //组件
    components: {
      headcom,
      mine
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

    } ,
    //进入页面加载
    mounted () {


    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {
      selected:function(v){
        for(var i=0;i<this.list.length;i++){
          this.list[i] = true
        }
        this.list[v-1] = false;
        if(v==1){
          this.month = true;
          this.name="宝宝动态"
        }else if(v==2){
          this.month = false;
          this.name="学生费用"
        }else if(v==3){
          this.month = false;
          this.name="我的"
        }
      }
    }

  }
</script>

<style lang="less" scoped>
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
    margin: 0 auto;
    margin-bottom: .05rem;
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
