<template>
  <div style="background-color: #fff;width: 100%;height: 100%;">
    <headcom title="园所简介"></headcom>
    <div class="details" v-if="active.id">
      <h3>{{active.gardenTitle}}</h3>
      <p class="name">
        <span style="float: left">发布时间：{{ active.updateDate | filtersD }}</span>
        <span style="float: right;">
          浏览人数{{ active.gardenTotal }}人
          <img @click="point" :src="pointImg" alt="" style="vertical-align: top;width:.15rem;margin-left:.1rem;">
        </span>
      </p>
      <div class="img">
        <mt-swipe :auto="5000" class="slide" :style="{ height: swipeHeight + 'px'}">
          <mt-swipe-item v-for="item in imgs" :key =item.index ><img :src="item" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="content" v-html="active.content">
      </div>
      <div @click="contact(active.gardenPhone)" class="button">联系幼儿园 {{ active.gardenPhone }}</div>
    </div>
    <div v-else style="text-align: center;padding-top: 2rem">
      <img src="../../assets/img/void1.png" alt="" style="width: 1.5rem" />
    </div>
  </div>
</template>
<script>
  import headcom from "../../components/headcom";
  export default {
    data() {
      return {
        active: {
            id:20,
            gardenTitle:'ad',
            updateDate:'',
            content:'阿瓦服务费',
            gardenPhone:'18737015525',
            gardenTotal:12
        },
        imgs:[],
        swipeHeight:'',
        pointImg:'',
        agreeStatus:''
      };
    },
    components: {
      headcom
    },
    methods:{
      //获取学校信息详情
      getSchoolInfo(){
        var vm =this;
        var obj = {
          schoolId:this.$route.query.schoolId
        }
        this.$getSchoolInfo(obj,function (res) {
          vm.active = res.result
        },function (res) {

        })
      },
      //联系幼儿园
      contact(tel){
        window.native.OpenTelephone(tel);
      },

      beforeMount() {
        this.getSchoolInfo();

      },
      //点赞幼儿园
      point() {
        if (this.agreeStatus == '1') {
          Toast('您已点过赞哦');
          return false
        }
        let data = {
          schoolId: this.active.schoolId,
          gardenId: this.active.id
        };
        var vm = this;
        this.$addInfoGardenAgreewith(data, function (res) {
          console.log(res+"111111111111111111111111111111");
          if (res.code == "000001") {
            vm.getPoint()
          } else {
            MessageBox("提示", res.message);
          }
        }, function (res) {
          MessageBox({title: "请求数据失败"});
        });
      },
      getPoint() {
        let data = {
          schoolId: this.active.schoolId,
          gardenId: this.active.id
        };
        var vm = this;
        this.$selectInfoGardenAgreewith(data, function (res) {
          console.log(res);
          if (res.code == "000001") {
            vm.agreeStatus = res.result.agreeStatus;
            if (vm.agreeStatus == '1') {
              vm.pointImg = require('../../assets/img/album/thumb_1.png')
            } else {
              vm.pointImg = require('../../assets/img/album/thumb_0.png')
            }
          } else {
            MessageBox("提示", res.message);
          }
        }, function (res) {
          MessageBox({title: "请求数据失败"});
        });
      },
    },
    filters: {
      filtersD(value) {
        if (!value) {
          return '';
        } else {
          const padDate = function (value) {
            return value < 10 ? '0' + value : value;
          };
          let date = new Date(value);
          let year = date.getFullYear();
          let month = padDate(date.getMonth() + 1);
          let day = padDate(date.getDate());
          return year + '-' + month + '-' + day;
        }
      }
    },
    mounted(){
      this.getPoint();
      this.swipeHeight=(document.body.clientWidth-20)/16*9;
    },
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .details {
    padding: 0 10px;
    border-top: .001rem solid #eee;
    h3{
      width: 100%;
      font-size: 0.2rem;
      color: #434343;
      font-weight: normal;
      text-align: center;
      padding: 10px 0;
    }
    .name{
      font-size: 0.11rem;
      color: #434343;
      height: 20px;
      padding: 5px 0;
    }
    div.img{
      clear: both;
      width: 100%;
      max-height: 2.2rem;
      overflow: hidden;
      vertical-align: middle;
      text-align: center;
      .slide{
        img{
          height: 100%;
          width: 100%;
        }
      }
    }
    .content{
      margin-top: 10px;
      p{
        width: 100%;
        text-indent: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 10px 0;
      }
    }
    .button{
      width: 92%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      left: 4%;
      color: #fff;
      position: absolute;
      bottom: 15px;
      background-color: #ff7b7b;
      border-radius:5px;
    }
  }
</style>
