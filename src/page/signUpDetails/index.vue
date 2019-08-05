<template>
  <div style="background-color: #fff;width: 100%;height: 100%;">
    <headcom title="报名"></headcom>
    <div class="details" style="margin-top: .5rem">
      <h3>{{active.name}}</h3>
      <p class="name"><span style="float: left">{{active.dataLimit}}</span>
        <span style="float: right;">{{active.startDate}}</span>
      </p>
      <div class="img">
        <mt-swipe :auto="5000" class="slide" :style="{ height: swipeHeight + 'px'}">
          <mt-swipe-item v-for="item in imgs" ><img :src="item" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="content">
        <p>{{active.content}}</p>
        <p>{{active.note}}</p>
      </div>
      <div @click="file()" class="button">我要报名</div>
    </div>
  </div>
</template>
<script>
  import headcom from "../../components/headcom";
  import {Swipe, SwipeItem, Indicator, MessageBox, Popup, Toast} from 'mint-ui';
  import { getActivityDetail } from "../../apis/app.api"
  export default {
    data() {
      return {
        active:'',
        imgs:'',
        swipeHeight:''
      };
    },
    components: {
      headcom
    },
    mounted(){
      this.getActivityDetail()
      this.swipeHeight=(document.body.clientWidth-20)/16*9;
    },
    methods: {
      file(){
        if(this.$route.query.authority=='1'){
          if(this.active.activityType=='2'){
            this.$router.push('/verification?activeId='+this.$route.query.activeId+'&url=signUpInput');
          }else{
            this.$router.push('/signUpInput?activeId='+this.$route.query.activeId);
          }
        }else{
          this.$router.push('/signUpInput?activeId='+this.$route.query.activeId);
        }
      },
      getActivityDetail() {
        let res={
          id:this.$route.query.activeId
        };
        Indicator.open({ spinnerType: 'fading-circle' });
        this.activeData=[];
        getActivityDetail(res).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            this.active=data.data.result;
            this.imgs = this.active.photo.split(',');
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      }
    }
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
  //text-indent: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 10px 0;
  &:nth-of-type(1){
     min-height: 1rem;
     max-height: 1.42rem;
   }
  &:nth-of-type(2){
     min-height: .5rem;
     max-height: .9rem;
   }
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
