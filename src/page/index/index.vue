<!--幼儿园首页-->
<template>
  <div>
    <!--标题栏-->
    <navigationBar title="智慧校园" v-if="true" :menu=true>
      <div class="menuLiCon"></div>
    </navigationBar>
    <!-- 轮播图 -->
    <div class="swipe">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in banner" :key="item.index">
          <img :src="item.bannerIcon" alt="图片" @click="linkBanner(item)">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--<mt-button @click="test">测试</mt-button>-->
    <!--校园行入口-->
    <!--<div class="page">-->
      <!--<div class="itemCon">-->
        <!--<div class="item" v-for="item in icon " :key="item.index" @click="itemClick(1)">-->
          <!--<div>-->
            <!--<img :src=item.imgUrl alt="">-->
          <!--</div>-->
          <!--<p>{{item.title}}</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="page">
      <div class="itemCon">
        <div class="item" @click="kidedu">
          <div>
            <img src="../../assets/img/kidedu.png" alt="">
          </div>
          <p>少儿教育</p>
        </div>
        <div class="item" @click="baobei">
          <img src="../../assets/img/baobei.png" alt="">
          <p>宝贝权益</p>
        </div>
        <div class="item" @click="shop">
          <div>
            <img src="../../assets/img/gouwu.png" alt="">
          </div>
          <p>购物淘淘</p>
        </div>
      </div>
    </div>
    <!-- 分组展示 -->
    <section v-for="groupData in group" :key="groupData.index">
      <div class="groupTitle">
        <span class="groupTitleIcon"><img :src="groupData.classIcon"></span>
        <span class="groupTitleName">{{groupData.className}}</span>
      </div>
      <div class="groupBody">
				<span class="iconCon" :key="item.index" v-for="item in groupData.homeMenuList" @click="linkSonPage(item)">
          <div class="icon"><img :src="item.menuIcon" alt=""></div>
          <p class="name">{{item.menuName}}</p>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
  import navigationBar from "../../components/navigationBar";
  import { lonIn } from "../../static/js/logIn";
  export default {
    name:'index',
    components:{
      navigationBar
    },
    props:{
    },
    data(){
      return{
        roleId:'',
        icon:[
          {title:'少儿教育',imgUrl:'https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_pro/ecanteen/20190801/201908011251259543.jpg'},
          {title:'宝贝权益',imgUrl:'https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_pro/ecanteen/20190801/201908011250153764.jpg'},
          {title:'购物淘淘',imgUrl:'https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_pro/ecanteen/20190801/201908011251173900.jpg'}
        ],
        banner:[

          {bannerIcon:"http://mm.xuebank.com/photo/111.jpg"},
          {bannerIcon:"http://mm.xuebank.com/photo/222.jpg"},
          {bannerIcon:"http://mm.xuebank.com/photo/333.jpg"},


        ],//轮播图数据
        group: [
          {
            classIcon: "https://xuebankoss.oss-cn-shanghai.aliyuncs.com/smart_campus/test/youeryuan.png",
            className: "智慧幼儿园",
            homeMenuList: [
              {
                classId: null,
                createDate: null,
                id: 3,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/jiaofei.png",
                menuName: "缴费",
                menuUrl: "/studentFees",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 2,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/daka.png",
                menuName: "打卡记录",
                menuUrl: "/babyDynamic",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 26,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/baobeika.png",
                menuName: "宝贝卡",
                menuUrl: "/badyCard",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 25,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/jianjie.png",
                menuName: "校园简介",
                menuUrl: "/schoolSummary",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 24,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/baoming.png",
                menuName: "报名",
                menuUrl: "/signUp",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 21,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/xiangce.png",
                menuName: "班级相册",
                menuUrl: "/Album",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 4,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/jiankong.png",
                menuName: "校园监控",
                menuUrl: "/videoMonitoring",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 18,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/caipu.png",
                menuName: "每日菜谱",
                menuUrl: "/cookbook",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 19,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/xinxiang.png",
                menuName: "园长信箱",
                menuUrl: "/service",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 23,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/qingjia.png",
                menuName: "请假",
                menuUrl: "/vacate",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 17,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/tongzhi.png",
                menuName: "我的消息",
                menuUrl: "/schoolMsg",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              },
              {
                classId: null,
                createDate: null,
                id: 22,
                menuIcon: "https://xuebanktest.oss-cn-shanghai.aliyuncs.com/logo/chengzhangka.png",
                menuName: "宝贝成长卡",
                menuUrl: "http://icbc.xuebank.com/testac",
                remark: null,
                sort: null,
                staId: null,
                status: null,
                updateDate: null
              }
            ]
          }
        ]
      }
    },
    methods:{
      kidedu(){
        var vm =this;
        lonIn((data)=>{
          this.$MallLogin1({
            "userId":data.data.result.userIdStr,
            "neigouUrl":"http://mall.mall.xuebank.com/Special/opActivity/storeId/4277"
          },function (res) {
            console.log(res)
            window.native.RetainNavigationBar(
              {
                webUrl:res,
                isReload:true,
                title:"少儿教育"
              }
            )
            oIframe.src=res
          },function (res) {

          })
        })
      },
      baobei(){
        window.native.RetainNavigationBar(
          {
            webUrl:'http://icbc.xuebank.com/testac',
            isReload:true,
            title:"宝贝权益"
          }
        )
      },
      shop(){
        var vm =this;
        lonIn((data)=>{
          this.$MallLogin({
            "userId":data.data.result.userIdStr,
          },function (res) {
            console.log(res)
            window.native.RetainNavigationBar(
              {
                webUrl:res,
                isReload:true,
                title:"购物淘淘"
              }
            )
            oIframe.src=res
          },function (res) {

          })
        })


      },
      //获取首页icon数据
      getClassIcon(){
        this.$indicator.open({
          spinnerType: "fading-circle"
        })
        var vm = this;
        var obj ={}
        this.$getHomeMenuAndClassList(obj,function (res) {
          vm.$indicator.close()
          vm.group = res.result
        },function (res) {
        })
      },
      //首页banner图获取
      getHomeBannerList(){
        this.$indicator.open({
          spinnerType: "fading-circle"
        })
        var vm = this;
        var obj ={}
        this.$getHomeBannerList(obj,function (res) {
          vm.$indicator.close()
          vm.banner = res.result
        },function (res) {
        })
      },
      //智慧幼儿园模块跳转
      linkSonPage(item){
        this.checkAuthority(item.id, item.menuUrl, "group");
      },
      //校验权限后跳转
      checkAuthority(id, url, type,roleId){
        var vm = this;
        if (url == "") {
          Toast("敬请期待！");
          return;
        }
        if (id == "pass") {
          location.href = url;
          return;
        }
        this.$checkAuthority({menuId:id},function (res) {
          console.log(res)
          if(res.code === "0") {
            if(id==24 || id==25){
              if(id==24){
                vm.$router.push('/school?url=signUp&authority=1');
              }else{
                vm.$router.push('/school?url=schoolSummary');
              }
            }else{
              vm.$router.push({ name: "school" });//verification
            }
            return false;
          }else if(res.code === "1") {
            if(id==24 || id==25){
              if(id==24){
                vm.$router.push('/school?url=signUp&authority=1');
              }else if(id==25){
                vm.$router.push('/school?url=schoolSummary');
              }else{
              }
            }else{
              vm.$toast("您暂无权限访问！");
              return false;
            }
          }else if(res.code === "2") {
            if(vm.roleId == 3) {
              if(id == 3) {
                this.$router.push('/teacherFees');
                return false;
              }
            };
            if (id==22) {
              window.native.RetainNavigationBar(
                {
                  webUrl:'http://icbc.xuebank.com/testac',
                  isReload:true,
                  title:"宝贝成长卡"
                }
              )
            }
            vm.$router.push(url);
            return false;
          }else {
            vm.$messagebox("提示", res.message);
            return false;
          }
        },function (res) {})
      },
      test(){
        this.$router.push('/test')
      }
    },
    mounted() {
      //
      // this.getClassIcon()
      //this.getHomeBannerList()
      //测试
      // if(sessionStorage.test == "true"){
      lonIn((data)=>{
        console.log(data)
      })
    },
    // created() {
    //   sessionStorage.setItem('test',true)
    // }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .menuLi {
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
    border-bottom: 1px solid #ebecee;
  }
  .tips {
    color: #999;
    width: 0.5rem;
    margin-left: 0;
  }
  }
  .menuLi:last-child span {
    border-bottom: 0 solid transparent;
  }
  .swipe {
    width: 3.75rem;
    height: 1.5rem;
  }
  .swipe img {
    width: 100%;
    height: 100%;
  }
  .message {
    margin: 0.1rem 0rem;
    background: white;
    height: 0.7rem;
  .messageIcon {
    float: left;
    padding: 0.15rem 0.1rem;
    height: 0.4rem;
  }
  .messageTo {
    float: right;
    padding: 0.25rem 0.1rem;
    height: 0.2rem;
  }
  .messageTip {
    padding: 0.15rem 0.05rem;
    line-height: 0.2rem;
    float: left;
  .messageTitle {
    color: #464646;
    font-size: 0.13rem;
  }
  .messageRemark {
    color: #aeaeae;
    font-size: 0.11rem;
  }
  }
  }
  section {
    padding: 0 0.12rem;
    background-color: #fff;
    margin: 0.12rem 0;
  }
  .groupTitle {
    border-bottom: 1px solid #ebecee;
  }
  .groupTitle .groupTitleIcon {
    width: 0.2rem;
    display: inline-block;
    vertical-align: middle;
  }
  .groupTitle .groupTitleIcon img {
    width: 100%;
  }
  .groupTitle .groupTitleName {
    vertical-align: middle;
    font-size: 0.13rem;
    line-height: 0.3rem;
    height: 0.3rem;
  }
  .groupBody .iconCon {
    display: inline-block;
    width: 33%;
    padding: 0.12rem 0;
  }
  @iconSize: 0.35rem;
  .groupBody .iconCon .icon {
    width: 100%;
    text-align: center;
  img {
    width: @iconSize;
    height: @iconSize;
  &:nth-of-type(10){
     display: inline-block;
     padding: 4px ;
   }
  }
  }
  .groupBody .iconCon .name {
    font-size: 0.12rem;
    text-align: center;
  }
  .msg {
    position: fixed;
    top: 12px;
    right: 0.44rem;
    z-index: 9999;
    width: 0.2rem;
    height: 0.2rem;
  img {
    width: 100%;
  }
  }
  .page {
    background-color: #fff;
    padding-bottom: .12rem;
  .imgCom {
    width: 100%;
  img {
    width: 100%;
    height: 2.06rem;
  }
  }
  .itemCon {
    padding: 12px 0 0;
    font-size: .13rem;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    text-align: center;
  .item {
    flex: 1;
  img {
    width: .4rem;
    position: relative;
    top: -6px;
  }
  }
  .item1 {
  div {
    border-right: 1px solid #DBDBDB;
    height: 30px;
    margin-bottom: .13rem;
  }
  }
  .item2 {
  div {
    border-left: 1px solid #DBDBDB;
    height: 30px;
    margin-bottom: .13rem;
  }
  }
  .center {
  img {
  }
  }}}
</style>
