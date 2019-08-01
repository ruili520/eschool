<!--视频监控页面-->
<template>
  <div>
    <div class="nav">
      <!-- <img src="./../assets/videoMonitoring/head1.jpg" alt=""> -->
      <div class="goback">
        <span class="iconfont" @click="goback">&#xe615;</span>
        <span class="iconfont" @click="close" style="margin-left:.08rem;">&#xe633;</span>
      </div>
      <div class="navTitle">校园监控</div>
      <div class="medal" @click="LinkMedal">
        <img src="../../assets/img/video-member.png" alt="" srcset="">
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="user">
      <div v-if="identityData[2]" class="child child1" @click="identityClick(identityData[2])">
        {{identityData[2].studentName}}
      </div>
      <div v-if="identityData[1]" class="child child2" @click="identityClick(identityData[1])">
        {{identityData[1].studentName}}
      </div>
      <div class="portrait">
        <!-- <img :src="userData.headimg" alt="" srcset=""> -->
        <span class="studentName">{{identityData[0].studentName|substr}}</span>
      </div>
      <div class="name">
        <span>{{userData.userName}}</span>
        <img v-if="userData.vipType == 2" src="../../assets/img/video-badge.png" alt="" srcset="">
      </div>
      <div class="schoolName">{{userData.schoolName}}</div>

    </div>
    <!-- 视频区域 -->
    <div class="videoCon">
      <mt-tab-container v-model="active" :swipeable="true">
        <mt-tab-container-item :id="index" v-for="(item,index) in kdgData">
          <div class="player">
            <transition name="fade">
              <div class="ipcName" v-show="ipcNameShow">
                <img v-if="index != 0" src="../../assets/img/video-left.png" alt="" srcset="">
                <span>{{item.ipcName}}</span>
                <img v-if="index != kdgData.length-1" src="../../assets/img/video-right.png" alt="" srcset="">
              </div>
            </transition>
            <video-player class="vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="item" @play="onPlayerPlay($event)"
                          @timeupdate="onPlayerTimeupdate($event)" @pause="onPlayerPause($event)">
            </video-player>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="equipmentIsNull" v-if="kdgData.length == 0">
        <span>当前场景没有设备</span>
      </div>
    </div>
    <!-- 场景区域 -->
    <div class="videoSource">
      <span class="iconCon" :class="{grey:videoSource == item.id}" v-for="item in groupBody" @click="switchoverVideo(item)">
        <div class="icon">
          <img :src="item.sceneIcon" alt="">
        </div>
        <p class="name">{{item.sceneName}}</p>
      </span>
    </div>
    <!-- 观看3分钟的弹框 -->
    <div class="msgCom" v-if="msgComShow">
      <div class="msg">
        <div class="msgTitle">温馨提示</div>
        <div class="msgBody">
          您观看长达3分钟，
          <br> 做个眼保健操吧~~
        </div>
        <div class="msgButtonCon">
          <div class="msgButton1" @click="continueToWatch">我要继续看</div>
          <div class="msgButton2" @click="goback">先歇一会</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name:'',
    components:{},
    //文件拦截器
    filters: {
      substr: function (value) {
        if (!value) return ''
        value = value.toString().substr(-2);

        return value;
      }
    },
    data(){
      return{
        ipcNameShow: true, //设备名称是否显示
        active: 0, //当前活动的视频
        msgComShow: false, //三分钟提示框是否显示
        identityData:[{studentName:'测试'}],
        kdgData:[] ,//摄像头设备
        groupBody:[],
        userData:{
          userName:'测试',
          vipType:'2',
          schoolName:'测试1',
        }
      }
    },
    methods:{
      //返回栏返回
      goback(){

      },
      //关闭当前页
      close(){},
      //视频管理
      LinkMedal(){},
      //继续浏览视频
      continueToWatch(){

      }
    }
  }
</script>

<style lang="less" scoped>
  @font-face {
    font-family: 'iconfont';
    /* project id 466348 */
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot');
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.woff') format('woff'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: .16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s linear;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateY(-50px);
  }

  .nav {
    width: 100%;
    position: fixed;
    top: 0;
    height: .46rem;
    background-image: linear-gradient(90deg, #fb9258, #ee2c46);
  }

  .nav .navTitle {
    color: #fff;
    line-height: .44rem;
    text-align: center;
    font-size: .18rem;
  }

  .nav .goback span {
    color: #fff;
    line-height: .44rem;
    height: .44rem;
    padding-left: .12rem;
  }

  .nav .goback,
  .nav .medal {
    position: absolute;
    width: .8rem;
    height: 100%;
    top: 0;
  }

  .nav .medal img {
    width: .26rem;
    vertical-align: middle;
  }

  .nav .goback {
    left: 0;
  }

  .nav .medal {
    width: .4rem;
    text-align: right;
    line-height: .44rem;
    right: 0;
    padding-right: .12rem;
  }

  .user {
    width: 100%;
    display: block;
    padding: .2rem 0;
    background-image: linear-gradient(90deg, #fb9258, #ee2c46);
    text-align: center;
    color: #fff;
    position: relative;
    margin-top: .44rem;
    .child {
      position: absolute;
      width: .5rem;
      height: .5rem;
      background-color: #FF5E66;
      line-height: .5rem;
      border-radius: 50%;
      overflow: hidden;
      top: .5rem;
    }
    .child1 {
      left: .6rem;

    }
    .child2 {
      right: .6rem;
    }


  }

  @portraitSize: .8rem;
  .user .portrait {
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, .5);
    margin: 0 auto;
    overflow: hidden;
    width: @portraitSize;
    height: @portraitSize;
    img {
      width: @portraitSize;
      height: @portraitSize;
    }
    .studentName {
      display: block;
      line-height: @portraitSize;
      font-size: .24rem;
      letter-spacing: 5px;
      text-align: center;
      font-weight: 400;
    }
  }

  .user .name {
    line-height: .3rem;
  }

  .user .name span,
  .user .name img {
    vertical-align: middle;
  }

  .user .name img {
    width: .14rem;
    height: .14rem;
  }

  .user .schoolName {
    font-size: .12rem;
  }

  .player {
    position: relative;
  }

  .player .ipcName {
    text-align: center;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
    color: #fff;
    line-height: .2rem;
    vertical-align: middle;
    background: rgba(0, 0, 0, .5)
  }

  .player .ipcName span {
    vertical-align: middle;
    display: inline-block;
    font-size: .14rem;
  }

  .player .ipcName img {
    vertical-align: middle;
    width: .2rem;
  }


  .videoCon,
  .videoCon #video {
    width: 100%;
  }

  .videoCon {
    position: relative;
  }

  .videoCon .video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }

  .videoCon .video img {
    width: 100%;
    height: 100%;
  }

  .equipmentIsNull {
    background: #000;
    width: 100%;
    height: 210px;
    text-align: center;
    color: #fff;
  }


  .videoSource {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
  }
  .videoSource .iconCon {
    display: inline-block;
    width: 33%;
    padding: .12rem 0;

  }
  .videoSource .grey {
    background-color: #f6f6f6;
  }
  @iconSize: .35rem;
  .videoSource .iconCon .icon {
    width: 100%;
    text-align: center;
    img {
      width: @iconSize;
      height: @iconSize;
    }
  }

  .videoSource .iconCon .name {
    font-size: .12rem;
    text-align: center;
  }


  .msgCom {
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .msg {
    width: 80%;
    background: #fff;
    margin: 160px auto 0;
  }

  .msg .msgTitle {
    text-align: center;
    line-height: .44rem;
    font-size: .2rem;
    color: #FF5E66;
  }

  .msg .msgBody {
    text-align: center;
    margin: 0.12rem 0;
  }

  .msg .msgButtonCon {
    display: flex;
    text-align: center;
    justify-content: space-between;
  }

  .msg .msgButtonCon .msgButton1,
  .msgButton2 {
    flex: 1;
    line-height: .44rem;
    border-top: 1px solid #F1F1F1;
  }

  .msgButton2 {
    background: #FF5E66;
    color: #fff;
  }

</style>
<style>
  video {
    object-fit: fill;
  }

</style>
