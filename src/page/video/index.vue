<template>
  <div class="container">
    <div class="player" v-if="videoShow">
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)">
      </video-player>
    </div>
    <!-- <video id="video" src="https://live.xuebank.com/AppName/StreamName.m3u8" controls="controls">
          您的手机不支持该视频播放
    </video> -->
    <a @click="setVideoUrl" style="margin: 12px; line-height: 2;display: block;color: red;border: 1px solid red;text-align: center;"> 输入链接</a>


  </div>
</template>

<script>
  require('video.js/dist/video-js.css') ;
  require('vue-video-player/src/custom-theme.css') ;
  import videojsContribHls from 'videojs-contrib-hls';
  import VideoPlayer from 'vue-video-player';
  import Vue from 'vue';
  import {MessageBox,Indicator } from 'mint-ui';


  Vue.use(VideoPlayer);

  import {
    videoPlayer
  } from 'vue-video-player';
  export default {
    data() {
      return {
        videoShow:true,
        // 可用的测试连接   http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8
        // https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8
        playerOptions: {
          //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
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
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          //        controlBar: {
          //          timeDivider: true,
          //          durationDisplay: true,
          //          remainingTimeDisplay: false,
          //          fullscreenToggle: true  //全屏按钮
          //        }
        }
      }
    },
    components: {
      videoPlayer
    },
    methods: {
      onPlayerPlay(player) {
        // alert("play");
      },
      onPlayerPause(player) {
        // alert("pause");
      },
      //
      setVideoUrl: function (){
        MessageBox.prompt('请输入url').then(({ value, action }) => {
          console.log(value);
          this.videoShow = false;
          this.playerOptions.sources[0].src = value;
          // window.native.OpenICBCWithID(value);
          setTimeout(() => {
            this.videoShow =true;
          }, 10);

        },({ value, cancel })=>{

        })
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }

</style>
