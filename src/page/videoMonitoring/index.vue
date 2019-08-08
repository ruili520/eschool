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
  // import HeaderComponent from './components/header.vue'
  require('video.js/dist/video-js.css');
  require('vue-video-player/src/custom-theme.css');
  import videojsContribHls from 'videojs-contrib-hls';
  import {videoPlayer} from 'vue-video-player';
  import {lonIn} from "../../static/js/logIn";
  import {getBindedInfo, switchDefaultStatus, getUserPropertyByUserId, getKdgIpcBySceneId, deductRemainderTime} from "../../apis/app.api";
  import {Toast, MessageBox, Indicator, TabContainer, TabContainerItem} from 'mint-ui';


  export default {
    name:'',
    components:{videoPlayer},
    //文件拦截器
    filters: {
      substr: function (value) {
        if (!value) return ''
        value = value.toString().substr(-2);

        return value;
      }
    },
    data() {
      return {
        ipcNameShow: true, //设备名称是否显示
        active: 0, //当前活动的视频
        videoSource: 1, //当前选中的视频来源
        msgComShow: false, //三分钟提示框是否显示
        // videoUrl:"https://live.xuebank.com/AppName/StreamName.m3u8",
        // predictVideoUrl:"https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_test/h5demo/video/001.jpg",
        groupBody: [],
        playerOptions: {
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "application/x-mpegURL",
            src: "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8" //你的m3u8地址（必填）
          }],
          poster: "https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_test/h5demo/video/001.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        },
        kdgData: [], //设备信息（一个场景可能有多个摄像头）
        userData: {},
        initialPlayTime: 0, //记录网速不好时前期加载所用的时间
        initialType: true, //记录是不是第一次加载视频
        realityPlayTime: 1, //记录用户实际的播放时间
        identityData: [{
          studentName: ""
        }]//孩子的总数据
      }
    },
    methods: {
      close: function () {
        window.native.PopViewController();
      },
      goback: function () {
        this.$router.push({
          "name": "wisdomCampusIndex",
          "query": {
            mode: "open"
          }
        });
        return
      },
      //切换用户
      identityClick: function (data) {
        var vm = this;
        this.$switchDefaultStatus(data,function (res) {
          if (res.code == "000001"){
            this.getUserPropertyByUserId("initialize");
            this.getChildData();
          }
        },function (res) {
        })
      },
      //请求孩子数据
      getChildData: function () {
        var vm = this;
        this.$getBindedInfo({},function (res) {
          console.log(res);
          if (res.code == "000001") {
            if (res.result.length == 0) {
              vm.identityData = [];
            } else {
              vm.identityData = res.result;
            }
          }
        },function (res) {
        });
      },
      //继续观看
      continueToWatch: function () {
        this.msgComShow = false;
      },
      //跳转到会员中心
      LinkMedal: function () {
        this.$router.push({
          "name": "memberCentre",
          "query": {
            schoolId: this.userData.schoolId
          }
        });
      },
      //移动端不全屏
      playerReadied(player) {
        // const track = new videojs.AudioTrack({
        //   id: 'my-spanish-audio-track',
        //   kind: 'translation',
        //   label: 'Spanish',
        //   language: 'es'
        // })
        // player.audioTracks().addTrack(track)
        // // Get the current player's AudioTrackList object.
        // const audioTrackList = player.audioTracks()
        // // Listen to the "change" event.
        // audioTrackList.addEventListener('change', function() {
        //   // Log the currently enabled AudioTrack label.
        //   for (let i = 0; i < audioTrackList.length; i++) {
        //     const track = audioTrackList[i]
        //     if (track.enabled) {
        //       videojs.log(track.label)
        //       return
        //     }
        //   }
        // })
      },
      //用户触发播放视频
      onPlayerPlay: function (event) {
        lonIn((data)=>{
          let result = data.data.result;
          if(data.data.code == "000001"){
            if(result.userlevel === '0'){
              this.initialPlayTime = 0;
              this.initialType = true;
              this.ipcNameShow = false;
            }else{
              this.PlayerPause();
              MessageBox({
                title: '提示',
                message:'仅支持激活智慧校园卡后使用，</br>请进入【我的】激活智慧校园卡',
              });
            }
          }else{
            MessageBox({
              title: result.messages
            });
          }
        });
      },
      //用户触发暂停视频
      onPlayerPause: function (event) {
        console.log("用户触发%c暂停", "color:blue");
        this.ipcNameShow = true;
        // 扣减用户消耗的时间
        var PlayTime = Math.ceil(event.currentTime());
        var userSurplusTime = Math.ceil(this.userData.remainderTime * 60);
        console.log(`进度条时间;加载所用时间;实际播放时间;用户剩余的播放时间`);
        console.log(
          `%c   ${PlayTime}s        ${this.initialPlayTime}s          ${this.realityPlayTime}s            ${userSurplusTime}s`,
          "color:red");
        this.deductUserTime();
      },
      //暂停所有视频
      PlayerPause: function () {
        for (let index = 0; index < this.kdgData.length; index++) {
          this.player[index].pause();
        }
      },
      //视频进度条
      onPlayerTimeupdate: function (event) {
        var PlayTime = Math.ceil(event.currentTime());
        if (this.initialType) { //第一次打开观看时记录加载时间
          this.initialType = false;
          this.initialPlayTime = PlayTime;
        }
        var realityPlayTime = this.realityPlayTime = PlayTime - this.initialPlayTime;
        //校验用户剩余时间
        this.verifySurplusTime(PlayTime, this.initialPlayTime, realityPlayTime);
      },
      //校验用户的剩余时间是否足够
      verifySurplusTime: function (PlayTime, initialPlayTime, realityPlayTime) {
        var userSurplusTime = Math.ceil(this.userData.remainderTime * 60);
        /*
         PlayTime=>进度条的时间；
         this.initialPlayTime=>加载所用的时间；
         this.realityPlayTime=>实际播放的时间；
         userSurplusTime=>用户剩余的播放时间.
         */
        // console.log(`进度条时间;加载所用时间;实际播放时间;用户剩余的播放时间`);
        // console.log(`   ${PlayTime}s        ${this.initialPlayTime}s          ${this.realityPlayTime}s            ${userSurplusTime}s`);
        // this.PlayerPause();
        // if (realityPlayTime >= userSurplusTime) {
        //   //暂停所有视频

        //   MessageBox({
        //     title: '提示',
        //     message: '您的观看时间已用完，您可以通过充值来获取。',
        //     showCancelButton: true,
        //     confirmButtonText: "立即充值",
        //     cancelButtonText: "不了，再见"
        //   }).then(action => {
        //     if (action === "confirm") {
        //       console.log("点击了确定");
        //       this.$router.push({
        //         "name": "memberCentre",
        //         "query": {
        //           schoolId: this.userData.schoolId
        //         }
        //       });

        //     } else if (action === "cancel") {
        //       console.log("点击了取消");
        //     }
        //   });
        // };


        // 60*3*this.timekeeping
        if (realityPlayTime > (60 * 3)) {
          this.PlayerPause();
          this.msgComShow = true;
        }
      },
      //扣除用户观看时间
      deductUserTime: function () {
        var minute = (this.realityPlayTime / 60).toFixed(2);
        console.log(minute);
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var vm = this;
        this.$deductRemainderTime({"remainderTime": minute},function (res) {
          console.log(res);
          Indicator.close();
          if (res.code == "000001") {
            vm.getUserPropertyByUserId();
          }
        },function (res) {
          Indicator.close();
        });
      },
      //切换视频源
      switchoverVideo: function (item) {
        this.videoSource = item.id;
        this.active = 0;
        //暂停所有视频
        this.PlayerPause();
        this.getKdgIpcBySceneId(item.id);
      },
      //根据场景获取设备信息
      getKdgIpcBySceneId: function (id) {
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var vm = this;
        console.log(id)
        this.$getKdgIpcBySceneId(id,function (res) {
          console.log(res)
          Indicator.close();
          if (res.code == "000001") {
            var kdgDatalist = res.result;
            vm.kdgData = []; //清空播放器
            // console.log(this.kdgData,'1qqqqqqqqqqq')
            for (const kdg of kdgDatalist) {
              vm.kdgData.push({
                kid: kdg.id,
                ipcName: kdg.ipcName,
                autoplay: false, // 自动播放
                controls: true, // 是否显示控制栏
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                html5: {
                  hls: {
                    withCredentials: false
                  }
                },
                sources: [{
                  type: 'application/x-mpegURL',
                  // type: "video/ogg",
                  // type:"video/webm",
                  // type: "video/mp4",
                  src: kdg.ipcUrl,
                  // src: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'
                }],
                poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg", //你的封面地址
                width: document.documentElement.clientWidth,
                height: "210px",
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              })
            }

          } else {
            MessageBox("提示", res.message);
          }
        },function (res) {
          Indicator.close();
          MessageBox("提示", "数据请求失败");
        });
      },
      //获取用户信息
      getUserPropertyByUserId: function (type) {
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var vm = this;
        this.$getUserPropertyByUserId({},function (res) {
          Indicator.close();
          if (res.code == "000001") {
            vm.userData = res.result;
            console.log(res)
            vm.userData.headimg = vm.userData.headimg == null ?
              require("../../assets/img/dome/saber.png") : vm.userData.headimg;
            //(只有第一次进来时才调用)
            if (type == "initialize") {
              //获取场景
              vm.groupBody = res.result.kdgSceneList;
              //根据场景获取摄像头
              vm.getKdgIpcBySceneId(vm.groupBody[0].id);
            }
          } else {
            MessageBox("提示", res.message);
          }
        },function (res) {
          Indicator.close();
          MessageBox("提示", "数据请求失败");
        })
      }

    },
    //进入页面加载
    mounted() {
      //获取用户信息
      this.getUserPropertyByUserId("initialize");
      this.getChildData();
      // if(localStorage.videoPay == undefined){
      //   this.$router.push({"name":"memberCentre"});
      // }
    },
    //计算属性
    computed: {
      player() {
        var player = [];
        for (let index = 0; index < this.kdgData.length; index++) {
          player.push(this.$refs.videoPlayer[index].player);
          // console.log(this.$refs.videoPlayer[index].player);
        }
        return player;
      }
    },
    //监控数据变化
    watch: {
      active: function () {
        //暂停所有视频
        this.PlayerPause();
      }
    },
    //vue清除前
    beforeDestroy() {}
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
