<template>
  <div>
    <headcom
      :title="name"
      :month = "month"></headcom>
    <div class="conter">
      <div class="bottom">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1" :class="{action:selected == 1}">
            <p class="icon" v-if="list[0]"><img src="../../assets/img/verifica/date1.png"></p>
            <p class="icon" v-if="!list[0]"><img src="../../assets/img/verifica/date.png"></p>
            <p>宝宝动态</p>
          </mt-tab-item>
          <mt-tab-item id="2" :class="{action:selected == 2}">
            <p class="icon" v-if="list[1]"><img src="../../assets/img/verifica/cost1.png"></p>
            <p class="icon" v-if="!list[1]"><img src="../../assets/img/verifica/cost.png"></p>
            <p>学生费用</p>
          </mt-tab-item>
          <mt-tab-item id="3" :class="{action:selected == 3}">
            <p class="icon" v-if="list[2]"><img src="../../assets/img/verifica/mine1.png"></p>
            <p class="icon" v-if="!list[2]"><img src="../../assets/img/verifica/mine.png"></p>
            <p>我的</p>
          </mt-tab-item>
        </mt-navbar>
      </div>

      <mt-tab-container :swipeable=true v-model="selected">
        <mt-tab-container-item id="1">
          <weekpage></weekpage>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <cost></cost>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mine></mine>
        </mt-tab-container-item>
      </mt-tab-container>

    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import { TabContainer, TabContainerItem, Indicator,MessageBox,Toast} from 'mint-ui';
  import weekpage from "../../components/verification/weekPage"
  import cost from "../../components/verification/cost"
  import mine from "../../components/verification/mine"
  export default{
    //组件
    components: {
      headcom,
      weekpage,
      cost,
      mine
    } ,
    //父组件传入的数据
    props: {

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
