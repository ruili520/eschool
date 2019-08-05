<template>
  <div class="retrospect">
    <!-- 小小银行家首页 -->
    <headcom title="活动回顾" :callbackTrue="true" :callback="back"></headcom>
    <!-- 活动条 -->
    <div class="activeItemCon"
         v-infinite-scroll="loadBottom"
         infinite-scroll-disabled="allLoaded"
         infinite-scroll-distance="10">
      <activeItem :buttonTrue="false" v-for="item in activityList" :data="item"></activeItem>
    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import activeItem from "../../components/lombardIndex/activeItem"
  import {Swipe, SwipeItem, Indicator, MessageBox, Toast} from 'mint-ui';
  import {getTSmallbankerActivityByHistoryList} from "../../apis/app.api"
  export default {
    //组件
    components: {
      headcom,
      activeItem
    },
    //父组件传入的数据
    props: {},
    //本地数据
    data() {
      return {
        page:1,//分页
        activityList:[], //活动数据
        allLoaded:true, //是否全部加载完毕
      }
    },
    //方法
    methods: {
      //返回上级页面
      back() {
        window.history.go(-1);
      },
      //触发到底加载
      loadBottom:function () {
        if(!thsi.allLoaded){
          this.page++;
          this.getTSmallbankerActivityByMyList();
        }
      },
      //请求我参与活动的列表数据
      getTSmallbankerActivityByHistoryList: function (params) {
        Indicator.open({ spinnerType: 'fading-circle' });
        getTSmallbankerActivityByHistoryList({
          page:this.page,
          size:10
        }).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            console.log(data.data.result);
            let list = data.data.result.list;
            if(list.length<10){
              this.allLoaded = true;
            }else{
              this.allLoaded = false;
            }
            this.activityList = this.activityList.concat(list);
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      }
    },
    //进入页面加载
    mounted() {
      this.getTSmallbankerActivityByHistoryList();
    },
    //计算属性
    computed: {},
    //监控数据变化
    watch: {

    }

  }

</script>

<style lang="less" scoped>


  .activeItemCon{
    margin-top: .12rem;
    background-color: #fff;

  }

</style>
