<template>
  <div class="activityDetails">
    <!-- 小小银行家首页 -->
    <headcom title="活动详情" :callbackTrue="true" :callback="back"></headcom>
    <!-- 活动条 -->
    <div class="activityShow" style="margin-top: .5rem">
      <activityShow :datail="datailData"></activityShow>
    </div>
    <div class="comment">
      <comment
        v-infinite-scroll="loadBottom"
        infinite-scroll-disabled="allLoaded"
        infinite-scroll-distance="10"
        :data="activityList"
        :discuss="discuss"
        :urlId = "urlId"></comment>
    </div>
    <div class="applyCon" v-if="this.datailData.enrollCount == 0">
      <div @click="linkApply('registrants')">立即报名(个人)</div>
      <div @click="linkApply('groupApply')">立即报名(团体)</div>
    </div>
    <div class="applyCon" v-if="this.datailData.enrollCount == 1 && this.datailData.signStatus == 0">
      <div @click="applyQrcode">查看报名码</div>
    </div>
    <mt-popup
      class="popup"
      v-model="popupVisible"
      position="bottom">
      <div id="">
        <img :src="qrcodeUrl" alt="">
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import headcom from "../../components/headcom";
  import QRCode from 'qrcode'
  import activityShow  from "../../components/activityDetails/activityShow";
  import comment  from "../../components/activityDetails/comment";
  import {Swipe, SwipeItem, Indicator, MessageBox, Popup, Toast} from 'mint-ui';
  import {getTSmallbankerActivityInfo,getTSmallbankerMessageList} from "../../apis/app.api"
  export default {
    //组件
    components: {
      headcom,
      comment,
      activityShow
    },
    //父组件传入的数据
    props: {},
    //本地数据
    data() {
      return {
        urlId:this.$route.query.id,
        datailData:{},
        allLoaded:true, //是否全部加载完毕
        page:1,//分页
        activityList:[],
        popupVisible:false,
        qrcodeUrl:"" //二维码链接
      }
    },
    //方法
    methods: {
      //返回链接
      back() {
        window.history.go(-1);
      },
      loadBottom(){
        if(!thsi.allLoaded){
          console.log("触发到底加载");
          this.page++;
          this.getTSmallbankerMessageList();
        }
      },
      //查询活动详情详情
      getTSmallbankerActivityInfo() {
        Indicator.open({ spinnerType: 'fading-circle' });
        getTSmallbankerActivityInfo({
          id:this.urlId
        }).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            this.datailData = data.body.result;
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      //查询活动详情详情
      getTSmallbankerMessageList() {
        Indicator.open({ spinnerType: 'fading-circle' });
        getTSmallbankerMessageList({
          "activityId":this.urlId,
          "page":this.page,
          "size":10
        }).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            let list = data.data.result.list;
            if(list.length<10){
              this.allLoaded = true;
            }else{
              this.allLoaded = false;
            }
            this.activityList = this.activityList.concat(list);
            console.log(this.activityList);
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      //跳转到报名页面
      linkApply(type) {
        this.$router.push({
          name:type,
          query:{
            activityId:this.$route.query.id
          }
        })
      },
      //写评论
      discuss(){
        if(this.datailData.enrollCount == 0){
          Toast("请先报名活动");
          return;
        }
        this.$router.push({
          "name": "comment",
          "query": {
            id: this.urlId
          }
        });
      },
      //签到的二维码显示
      applyQrcode() {
        QRCode.toDataURL(location.origin+'/html/smartCampuskdg/signIn/index.html?enrollId='+this.datailData.enrollId)
          .then(url => {
            console.log(url)
            this.qrcodeUrl = url;
            this.popupVisible = true;
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    //进入页面加载
    mounted() {
      this.getTSmallbankerActivityInfo();
      this.getTSmallbankerMessageList();
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  .activityDetails{
    padding-bottom: .64rem;
  }
  .applyCon{
    background: #fff;
    padding: .12rem .06rem;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    text-align: center;
    bottom: 0;
  div{
    flex: 1;
    color: #fff;
    background-color: #ff3442;
    margin: 0 .06rem;
    line-height: .4rem;
    border-radius: .06rem;
  }

  }
  .popup{
    width: 100%;
  img{
    display: block;
    margin: .2rem auto;
  }
  }


</style>
