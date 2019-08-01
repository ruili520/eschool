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
        active:[
          {
            id:0,
            gardenTitle:'ad',
            updateDate:'',
            content:'阿瓦服务费',
            gardenPhone:'21321312',
          }
        ],
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
      contact(){

      },
      point(){

      },

    }
    /*filters: {
      filtersD(value) {
        if(!value){
          return '';
        }else{
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
    beforeMount(){
      this.selectInfoGardenIntroduce()
    },
    mounted(){
      this.getPoint()
      this.swipeHeight=(document.body.clientWidth-20)/16*9;
    },
    methods: {
      contact(tel){
        //window.native.OpenTelephone(tel);
        window.location.href="tel:"+tel;
      },
      point(){
        if(this.agreeStatus=='1'){
          Toast('您已点过赞哦')
          return false
        }
        let data={
          schoolId:this.active.schoolId,
          gardenId:this.active.id
        };
        addInfoGardenAgreewith(data).then((data)=>{
          if(data.data.code == "000001"){
            this.getPoint()
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      getPoint(){
        let data={
          schoolId:this.active.schoolId,
          gardenId:this.active.id
        };
        selectInfoGardenAgreewith(data).then((data)=>{
          if(data.data.code == "000001"){
            this.agreeStatus = data.data.result.agreeStatus;
            if(this.agreeStatus=='1'){
              this.pointImg=require('../assets/album/thumb_1.png')
            }else{
              this.pointImg=require('../assets/album/thumb_0.png')
            }
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      selectInfoGardenIntroduce() {
        let data={
          schoolId:this.$route.query.schoolId
        };
        Indicator.open({ spinnerType: 'fading-circle' });
        this.activeData=[];
        selectInfoGardenIntroduce(data).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            this.active=data.data.result;
            console.log(this.active);
            if(this.active.id==null){
              return false
            }
            this.imgs = this.active.gardenUrl.split(',');
            let par = {
              id:this.active.id
            }
            this.addInfoGardenIntroduceTotal(par)
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      addInfoGardenIntroduceTotal(par){
        Indicator.open({ spinnerType: 'fading-circle' });
        addInfoGardenIntroduceTotal(par).then((data)=>{
          Indicator.close();
        if(data.data.code == "000001"){
          console.log(data.data.message)
        }else{
          MessageBox("提示",data.body.message);
        }
      },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      }
    }*/
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
