<!--班级相册页面-->
<template>
  <div class="main">
    <headcom class="underLine" :title="title"></headcom>
    <!--相册预览-->
    <album :preview="preview"></album>
    <!--相册列表-->
    <div v-if="!isNodata" v-infinite-scroll="loadBottom" infinite-scroll-disabled="allLoaded" infinite-scroll-distance="10">
      <div v-for="(obj, idx) in list">
        <div class="padding">&nbsp;</div>
        <!--相册-->
        <div class="intro">
          <div class="introAlbum" v-if="obj.photoUrl.indexOf(';') == -1" :style="{ 'background-image':'url('+obj.photoUrl+')' }" @click="toprevieAlbum(obj.photoUrl, 0)"></div>
          <div class="introAlbums" v-else v-for="(img, index) in obj.photoUrl.split(';')" :style="{ 'backgroundImage':'url('+img+')' }" :class="{ albumsRight:(index+1)%3 == 0 }" @click="toprevieAlbum(obj.photoUrl, index)"></div>
          <div class="introMessage">
            <h2 v-text="obj.title"></h2>
            <div class="introFlex">
              <p v-if="!!obj.isspread" v-text="obj.content"></p>
              <p v-else>{{ obj.content | spreadContent }}</p>
              <div class="introSpread">
                <img ref="spreadImage" src="../../assets/img/album-down.png" @click="tospread(obj, idx)" />
              </div>
            </div>
          </div>
          <!--点赞-->
          <div class="introThumbs">
            <div>
              <img v-if="obj.followCount" src="../../assets/img/thumb_1.png" @click="toThmbs(obj, idx)">
              <img v-else src="../../assets/img/thumb_0.png" @click="toThmbs(obj, idx)">
            </div>
            <span>{{ obj.thumbsupNum }}</span>
          </div>
        </div>
      </div>
      <!--加载中-->
      <div v-if="!allLoaded" class="loading">
        <mt-spinner color="#dbdbdb" type="triple-bounce"></mt-spinner>
      </div>
      <!--加载完成-->
      <msgNull :imgShow="allLoaded" :size="14" title="———— 我是有底线的 ————"></msgNull>
    </div>
    <!--无数据-->
    <nodata v-else></nodata>
  </div>
</template>
<script>
  import headcom from '../../components/headcom'
  import nodata from '../../components/informatio/noData'
  import album from '../../components/previewAlbum'
  import msgNull from '../../components/msgNull'
  export default {
    name:'',
    components:{
      headcom,nodata,album,msgNull
    },
    data(){
      return{
        title:'班级相册',
        // 相册图片预览
        preview: {
          show: false,
          index: 0,
          imgs: [],
        },
        // 相册数据源
        list: [],
        // 上拉刷新
        page: 1,
        allLoaded: true,
        // 无数据
        isNodata: false,
      }
    },
    filters: {
      // 相册内容折叠过滤器
      spreadContent(content) {
        let length = 55;
        if(content.length > length) {
          return content.substr(0, length) + "...";
        }
        return content;
      }
    },
    methods:{
      // 上拉加载
      loadBottom() {
        console.log("触发加载");
        this.page++;
      },
      getTSchoolPhotoList(){
        var vm=this;
        var data = {
          page:1,
          pageSize:10
        };
        this.$getPhotoList(data
          ,function (res) {
            console.log(res);
            vm.list = res.result.list
          },function (res) {
            console.log(res)
          })
      }
    },
    mounted() {
      this.getTSchoolPhotoList()
    }
  }
</script>

<style lang="less" scoped="scoped">
  .main {
    background: #FFFFFF;
  }

  .underLine {
    border-bottom: solid 1px #F6F6F6;
  }

  .padding {
    height: .1rem;
    widows: 100%;
    background: #F6F6F6;
  }

  .intro {
    padding: .1rem .1rem 0rem .1rem;
    .introAlbum {
      width: 100%;
      height: 3rem;
      background-size: cover;
    }
    .introAlbums {
      width: 32.2%;
      height: 1rem;
      padding-right: 1.6%;
      background-size: cover;
      display: inline-block;
      background-clip: content-box;
      background-repeat: no-repeat;
    }
    .albumsRight {
      padding-right: 0rem;
    }
    .introMessage {
      border-bottom: solid 1px #F6F6F6;
      padding-bottom: .07rem;
      h2 {
        color: #373737;
        font-size: .15rem;
      }
      .introFlex {
        display: flex;
        justify-content: space-between;
        padding: .07rem 0rem;
      }
      p {
        color: #AEAEAE;
        font-size: .13rem;
      }
      .introSpread {
        padding-left: .07rem;
        img {
          width: .15rem;
        }
      }
    }
    .introThumbs {
      display: flex;
      padding: .1rem 0rem .07rem 0rem;
      img {
        width: .15rem;
      }
      span {
        color: #AEAEAE;
        font-size: .1rem;
        padding: .02rem 0rem 0rem .05rem;
      }
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    background-color: #f6f6f6;
    padding-top: .2rem;
  }
</style>
