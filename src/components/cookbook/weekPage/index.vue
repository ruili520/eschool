<template>
  <div>
    <weekdate v-on:child-say="listenToMyBoy" :getAttendanceByDate="getAttendanceByDate"></weekdate>
    <!--<cook v-for="item in card" :data="listDate"></cook>-->
    <div class="content">
      <div class="content-item" v-for="item in card">
        <p class="stateName"><span>{{ item.stateName }}</span></p>
        <div class="ul-content">
          <ul v-if="item.food.length>0" :style="{ width:item.ulWidth+'%' }">
            <li v-for="t in item.food" :style="{ width:item.liWidth+'%' }">
              <img :src=t.img alt="">
              <p>{{ t.name }}</p>
            </li>
          </ul>
          <p class="noData" v-else></p>
        </div>
      </div>
    </div>
    <div class="child">
      <child :callBack="modification"></child>
    </div>
  </div>
</template>

<script>
  import weekdate from "./../../verification/weekdate"
  import child from "./../../child"
  import cook from "../cook"
  import {getCook} from "./../../../apis/app.api"
  import {MessageBox, Indicator, Toast} from "mint-ui";
  export default{
    //组件
    components: {
      weekdate,
      cook,
      child
    },
    //父组件传入的数据
    props: {},
    //计算属性
    computed:{},
    //本地数据
    data(){
      return {
        listDate:'',
        card:[
          { state:1,stateName:'早餐',food:[] },
          { state:2,stateName:'水果',food:[] },
          { state:3,stateName:'中餐',food:[] },
          { state:4,stateName:'下午茶',food:[] },
          { state:5,stateName:'晚餐',food:[] }
        ],
        time:''
      }
    },

    //方法
    methods: {
      modification() {
        this.getAttendanceByDate(this.time);
      },
      listenToMyBoy(data) {
        //console.log(data)
      },
      changeData() {},
      getWidth(name,index){
        let _this = this;
        let ul=0,li=0;
        if(name<5){ ul=100;li=23.5 }else{ ul=25*name; li=102/name-2;}
        _this.card[index].ulWidth=ul;
        _this.card[index].liWidth=li;
      },
      getAttendanceByDate(nowData) {
        let _this = this;
        this.time = nowData;
        Indicator.open({spinnerType: 'fading-circle'});
        getCook(nowData).then((data)=> {
          Indicator.close();
          if (data.body.code == "000001") {
            for(let n of _this.card){
              n.food=[];
            }
            let list = data.body.result;
            this.listDate = list
            if (list == null) {
              Toast("暂无数据");
              return false
            }
            let breakfast = JSON.parse(list.breakfast);
            let inter1 = JSON.parse(list.inter1);
            let lunch = JSON.parse(list.lunch);
            let inter2 = JSON.parse(list.inter2);
            let dinner = JSON.parse(list.dinner);
            for(let item in breakfast){
              _this.card[0].food.push({name:item ,img:breakfast[item]});
              let length= _this.card[0].food.length;
              _this.getWidth(length,0)
            }
            for(let item in inter1){
              _this.card[1].food.push({name:item ,img:inter1[item]});
              let length= _this.card[1].food.length;
              _this.getWidth(length,1);
            }
            for(let item in lunch){
              _this.card[2].food.push({name:item ,img:lunch[item]});
              let length= _this.card[2].food.length;
              _this.getWidth(length,2);
            }
            for(let item in inter2){
              _this.card[3].food.push({name:item ,img:inter2[item]});
              let length= _this.card[3].food.length;
              _this.getWidth(length,3);
            }
            for(let item in dinner){
              _this.card[4].food.push({name:item ,img:dinner[item]})
              let length= _this.card[4].food.length;
              _this.getWidth(length,4);
            }
          } else {
            MessageBox("提示", data.body.message);
          }
        },(data)=> {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
    },
    //进入页面加载
    mounted () {
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var mon = day2.getMonth() + 1;
      if (mon < 10) {
        mon = "0" + mon;
      }
      var date = day2.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      var s2 = day2.getFullYear() + "-" + mon + "-" + date;
      this.getAttendanceByDate(s2);
    },
    //监控数据变化
    watch: {}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .content{
    background-color: #fff;
    width: 100%;
    overflow:hidden;
    .content-item{
      border-top:10px solid #F5F5F5;
      padding:0 10px;
      .stateName{
        border-bottom: 1px solid #ebecee;
        font-size: 15px;
        height:37px;
        line-height:37px;
        color:#464646;
        span{
          border-left: 2px solid #ff3442;padding-left: 5px;
        }
      }
      .ul-content{
        min-height:0.4rem;
        margin: 10px 0;
        width: 100%;
        overflow: auto;
        position: relative;
        &::-webkit-scrollbar{
          display:none;
        }
        .noData{
          text-align: center;
          padding-top: 30px;
        }
        ul{
          overflow-x: scroll;
          overflow-y: hidden;
          white-space: nowrap;
          li{
            display: inline-block;
            height: 100%;
            padding-left:2%;
            float: left;
            &:nth-of-type(1){
              padding-left:0;
            }
            p{
              width: 100%;
              font-size: 12px;
              height: 25px;
              line-height: 30px;
              text-align: center;
            }
            img{
              width: 100%;display: block;
            }
          }
        }
      }
    }
  }
  .child {
    position: absolute;
    top: .12rem;
    right: .22rem;
    width: .25rem;
    height: .25rem;
    z-index: 9999;
  }
</style>
