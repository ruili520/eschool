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
  import headcom from "../../components/headcom";
  import nodata from "../../components/schoolMsg/noData";
  import album from "../../components/previewAlbum";
  import msgNull from '../../components/msgNull';
  import { getTSchoolPhotoList, checkFollowToThumb } from '../../apis/app.api.js';
  import { Indicator, MessageBox, Toast, InfiniteScroll, Spinner } from 'mint-ui';
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
    methods: {
      // 相册内容折叠和展开
      tospread(obj, idx) {
        // 不使用for循环处理数据源：新增绑定，不绑定也可以用 this.$forceUpdate(); 强制更新
        if(obj.isspread == undefined) {
          this.$set(this.list[idx], "isspread", false);
        }
        obj.isspread = !obj.isspread;
        this.$refs.spreadImage[idx].src = !!obj.isspread ? require("../../assets/img/album/up.png") : require("../../assets/img/album/down.png");
      },
      // 点赞操作
      toThmbs(obj, idx) {
        console.log("eeee")
        console.log(obj)
        console.log(obj.followCount==1);
        console.log(obj.id);
        console.log("eeee")
        if(obj.followCount==1) {
          Toast({
            message: "您已点过赞！",
            duration: 750,
          });
          return;
        }
        Indicator.open({
          spinnerType: 'fading-circle'
        });

        var vm = this;
        // var id = obj.id;
        console.log("BBBBBBBBAA")
        vm.$checkFollowToThumb(obj.id,function (res) {
          console.log(res);
          Indicator.close();
          if(res.code == "000001") {
            if(res.message == "点赞成功！") {
              obj.followCount = 1;
              obj.thumbsupNum += 1;
            }
            Toast({
              message: res.message,
              duration: 750,
            });
          } else {
            MessageBox("提示", res.message);
          }
        },function (res) {
          Indicator.close();
          MessageBox("提示", "数据请求失败");
        });
      },
      // 相册预览
      toprevieAlbum(imgs, idx) {
        this.preview = Object.assign({}, this.preview, {
          index: idx,
          imgs: imgs.split(";"),
          show: true,
        });
        window.native.ManageStatusCololr("0,0,0,1", true);
      },
      // 查询相册列表
      queryAlbums() {
        if(this.page == 1) {
          Indicator.open({
            spinnerType: 'fading-circle'
          });
        }
        var vm = this;
        this.$getTSchoolPhotoList({"page": this.page,
          "size": 10,
        },function (res) {
          console.log(res);
          Indicator.close();
          if(res.code == "000001") {
            vm.list = vm.list.concat(res.result.list);
            console.log("KKKKK")
            console.log(vm.list);
            console.log("KKKKKK")

            vm.isNodata = !vm.list.length ? true : false;
            if(res.result.total <= vm.list.length) {
              vm.allLoaded = true;
            } else {
              vm.allLoaded = false;
            }
          } else {
            MessageBox("提示", res.message);
          }
        },function () {
          Indicator.close();
          MessageBox("提示", "数据请求失败");
        });
      },
      // 上拉加载
      loadBottom() {
        console.log("触发加载");
        this.page++;
        this.queryAlbums();
      },
    },
    mounted() {
      this.queryAlbums();
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
