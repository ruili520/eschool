<template>
  <div class="page">
    <navigationBar title="小小银行家" v-if="true" :menu=true>
      <div class="pop">
        <div class="popLi" @click="menuLiClick(item.code)" v-for="item in menuUl">
          <img :src="item.img" alt="" />
          <span>{{item.name}}</span>
        </div>
      </div>
    </navigationBar>
    <p class="location"><span>小小银行家</span> <span>广州</span></p>
    <!-- 轮播图 -->
    <div class="swipe">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in bannerData">
          <img :src="item.bannerImg" alt="图片" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <list :childArray='activityList' :childObject='active'></list>
    <list :childArray='reviewList' :childObject='review'></list>
    <list :childArray='group' :childObject='groupData' style="margin-bottom: 0"></list>
  </div>
</template>
<script>
  import navigationBar from "../../components/wisdomCampusIndex/navigationBar";
  import list from "../../components/binkIndex";
  import { Swipe, SwipeItem, Indicator, MessageBox, Toast} from 'mint-ui';
  import {getBinkMenuAndClassList,getTSmallbankerActivityList,getTSmallbankerActivityByHistoryList} from "../../apis/app.api"
  export default {
    data() {
      return {
        bannerData: [{
          id: 2,
          gameId: 2,
          gameName: "切菜大师",
          gameUrl: "https://m.xuebank.com/eduboot/duiba/redirect_special_url/aHR0cHM6Ly9hY3Rpdml0eS5tLmR1aWJhLmNvbS5jbi9saXR0bGVHYW1lL3N0YXJ0P2xpdHRsZUdhbWVJZD0xMzA=",
          gameImg: "https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_pro/banner/20180208/201802080932289880_20180207_切菜大师.png",
          type: "1",
          amount: "10",
          buyoutType: "1",
          bannerName: "切菜大师",
          bannerImg: "https://xuebankoss.oss-cn-shanghai.aliyuncs.com/smart_campus/smallbanker/banner20180716.jpg",
          seq: 2,
          createDate: 1518053905000,
          remark: "兑吧小游戏-切菜大师"
        }],
        menuUl: [
          {
            name: "我的身份",
            code: "identity",
            img: require("../../assets/img/wisdomCampusIndex/add.png")
          },
          {
            name: "我参与过",
            code: "takePartIn",
            img: require("../../assets/img/history.png")
          },
        ],
        activityList:[],
        active:{
          index:1,
          name:'报名活动',
          img:require("../../assets/img/apply/apply.png")
        },
        reviewList:[],
        review:{
          index:2,
          name:'往期回顾',
          img:require("../../assets/img/apply/review.png")
        },
        group:[],
        groupData:{
          index:3,
          name:'',
          img:''
        }
      }
    },
    components: {
      navigationBar,
      list
    },
    mounted(){
      this.getTSmallbankerActivityList();
      this.getTSmallbankerActivityByHistoryList()
    },
    methods: {
      //返回首页
      back() {
        window.native.PopViewController();
      },
      //更多菜单点选
      menuLiClick(code) {
        if (code == "takePartIn") {
          this.$router.push('/takePartIn');
        } else if (code == "identity") {
          this.$router.push({name: "identity"});
        }
      },
      // 跳转到我参与过的
      linkTakePartIn() {
        this.$router.push('/takePartIn');
      },
      //请求活动的列表数据
      getTSmallbankerActivityList() {
        Indicator.open({ spinnerType: 'fading-circle' });
        getTSmallbankerActivityList({page:1, size:3}).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            this.activityList=[];
            let list = data.data.result.list;
            this.activityList = this.activityList.concat(list);
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      //请求我参与活动的列表数据
      getTSmallbankerActivityByHistoryList(){
        Indicator.open({ spinnerType: 'fading-circle' });
        getTSmallbankerActivityByHistoryList({page:1, size:3}).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            let item = data.data.result.list
            this.reviewList=[];
            this.reviewList = this.reviewList.concat(item);
            this.getHomeMenuAndClassList()
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      getHomeMenuAndClassList(){
        Indicator.open({
          spinnerType: "fading-circle"
        });
        getBinkMenuAndClassList({}).then(
          data => {
            Indicator.close();
            if (data.data.code == "000001") {
              this.group = data.data.result[0].homeMenuList;
              this.groupData.img=data.data.result[0].classIcon;
              this.groupData.name='校园';
            } else {
              MessageBox("提示", data.data.message);
            }
          },
          () => {
            Indicator.close();
            MessageBox("提示", "数据请求失败");
          }
        );
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page {
  .pop{
  .popLi {
    color: #424242;
  img {
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: middle;
  }
  span {
    font-size: 0.14rem;
    line-height: 0.3rem;
    vertical-align: middle;
    display: inline-block;
    width: 0.7rem;
    margin-left: 0.1rem;
  }
  }
  }
  .location{
    border-top:1px solid #ebecee;
    padding: 0 0.12rem;
    height:45px;
    line-height:45px;
  span{
  &:nth-of-type(1){
     font-size: 19px;
     color: #2d2c2c;
   }
  &:nth-of-type(2){
     padding-left: 17px;
     font-size: 14px;
     color: #999;
     float: right;
     background: url("../../assets/img/location.png") no-repeat center left;
     background-size:18px;
   }
  }
  }
  .swipe {
    padding: 0 0.12rem;
    margin: 0 0 .12rem 0;
    height: 1.5rem;
  img {
    width: 100%;
    height: 100%;
  }
  }
  }
</style>
