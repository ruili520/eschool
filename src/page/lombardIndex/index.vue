<template>
  <div class="lombardIndex">
    <!-- 小小银行家首页 -->
    <headcom title="活动报名" :callbackTrue="true" :callback="back"></headcom>
    <!-- 我参加过的 -->
    <div class="history" @click="linkTakePartIn" >我参加过的</div>

    <!-- 轮播图 -->
    <div class="swipe" style="margin-top: .45rem">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in bannerData">
          <img :src="item.bannerImg" alt="图片" >
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 活动条 -->
    <div class="activeItemCon"
         v-infinite-scroll="loadBottom"
         infinite-scroll-disabled="allLoaded"
         infinite-scroll-distance="10">
      <activeItem v-for="item in activityList" :data="item"></activeItem>
    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import activeItem from "../../components/lombardIndex/activeItem"
  import {
    Swipe,
    SwipeItem,
    Indicator,
    MessageBox,
    Toast
  } from 'mint-ui';
  import {getTSmallbankerActivityList} from "../../apis/app.api"
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
        bannerData: [{
          "id": 2,
          "gameId": 2,
          "gameName": "切菜大师",
          "gameUrl": "https://m.xuebank.com/eduboot/duiba/redirect_special_url/aHR0cHM6Ly9hY3Rpdml0eS5tLmR1aWJhLmNvbS5jbi9saXR0bGVHYW1lL3N0YXJ0P2xpdHRsZUdhbWVJZD0xMzA=",
          "gameImg": "https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_pro/banner/20180208/201802080932289880_20180207_切菜大师.png",
          "type": "1",
          "amount": "10",
          "buyoutType": "1",
          "bannerName": "切菜大师",
          "bannerImg": "https://xuebankoss.oss-cn-shanghai.aliyuncs.com/smart_campus/smallbanker/banner20180716.jpg",
          "seq": 2,
          "createDate": 1518053905000,
          "remark": "兑吧小游戏-切菜大师"
        }],
        page:1,//分页
        activityList:[], //活动数据
        allLoaded:true,//是否全部加载完毕
      }
    },
    //方法
    methods: {
      //返回上级页面
      back() {
        window.history.go(-1);
      },
      // 跳转到我参与过的
      linkTakePartIn: function () {
        this.$router.push({
          "name": "takePartIn"
        });
      },
      loadBottom:function () {
        if(!thsi.allLoaded){
          console.log("触发到底加载");
          this.page++;
          this.getTSmallbankerActivityList();
        }
      },
      //请求活动的列表数据
      getTSmallbankerActivityList: function (params) {
        Indicator.open({ spinnerType: 'fading-circle' });
        getTSmallbankerActivityList({
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
      this.getTSmallbankerActivityList();
    },
    //计算属性
    computed: {},
    //监控数据变化
    watch: {

    }
  }

</script>
<style lang="less" scoped>
  .swipe {
    margin: 0 0 .12rem 0;
    height: 1.5rem;
  img {
    width: 100%;
    height: 100%;
  }
  }
  .history {
    position: absolute;
    top: .12rem;
    right: .22rem;
    height: .25rem;
    z-index: 9999;
    color: #aeaeae;
    font-size: .12rem;
    line-height: .25rem;
  }

  .activeItemCon{
    margin-top: .12rem;
    background-color: #fff;

  }

</style>
