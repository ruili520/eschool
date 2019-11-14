<template>
  <div class="serviceCon">

    <headcom title="请假明细页"></headcom>
    <div class="history" @click="popupVisible2 = true" >
      <span>{{month.name}}</span>
      <img class="more" src="../../assets/img/information/more.png" alt="">
    </div>

    <div class="summarize" style="margin-top: .45rem">
      <p class="tips">将在出勤记录中记为</p>
      <p class="day">本月共请假{{vacateData.dayTime}}天</p>
    </div>

    <div class="vacateListCon">
      <div class="vacateList" v-for="item in vacateData.detailList">
        <div class="day">{{item.dayTime}}天</div>
        <div class="time">
          <div>{{item.startDateStr}}</div>
          <div>{{item.startAmPm}}</div>
        </div>
        <div class="time">
          <div>{{item.endDateStr}}</div>
          <div>{{item.endAmPm}}</div>
        </div>
      </div>
    </div>

    <mt-popup
      v-if="monthTrue"
      class="popup"
      v-model="popupVisible2"
      position="bottom">
      <div class="buttom">
        <p class="cancel" @click="cancel">取消</p>
        <p class="confirm" @click="confirm">确定</p>
      </div>
      <mt-picker valueKey="name" :slots="slots2" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  // import HeaderComponent from './components/header.vue'
  import {MessageBox,Indicator,Toast,Picker ,Popup  } from "mint-ui";
  import {getLeaveDetail} from "../../apis/app.api";
  import {lonIn} from "../../static/js/logIn";
  import headcom from "../../components/headcom"


  export default {
    //父组件传入的数据
    props: {} ,
    //组件
    components: {
      headcom
    },
    //本地数据
    data(){
      return {
        slots2:[{ //月份
          flex: 1,
          values: [{name:'1月',code:'1'},{name:'2月',code:'2'},{name:'3月',code:'3'},],
          valueKey:"name"
        }],
        popupVisible2:false, //请假
        monthExcessive:null,//用户选择的月份数据过度
        month:{id:'',name:''},//用户选择的月份
        monthTrue:false,//月份选择的初始化
        vacateData:{
          dayTime:0,
          detailList:[]
        }

      }
    } ,
    //方法
    methods: {
      onValuesChange:function (picker, values) {
        this.monthExcessive = values[0];
      },
      cancel:function () {
        this.popupVisible2 = false;
      },
      confirm:function () {
        this.month = this.monthExcessive;
        this.popupVisible2 = false;
        this.getLeaveDetail();
      },
      //初始化月份选择的数据
      monthInit:function () {
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth();
        let arr = [];
        for (let i = 0; i < month+1; i++) {
          let num = i+1;
          num = num<10?"0"+num:num;
          arr.push({
            id: `${year}-${num}`,
            name:`${i+1}月`
          })
        }
        let m = month+1;
        m = m<10?"0"+m:m;
        this.month = {
          id:`${year}-${m}`,
          name:`${month+1}月`
        }
        this.slots2[0].values = arr;
        this.monthTrue = true;
        this.getLeaveDetail();
      },
      //请求当月的详情
      getLeaveDetail:function () {
        Indicator.open({ spinnerType: 'fading-circle' });

        var vm = this;
        vm.$getLeaveDetail({"date":vm.month.id},function (res) {

          console.log("TTTTT")
          console.log(vm.month.id)
          console.log(res);
          console.log("TTTTT")
          Indicator.close();
          if(res.code == "000001"){
            vm.vacateData = res.result;
          }else{
            MessageBox({title: res.message});
          }
        },function (res) {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      }


    } ,

    //进入页面加载
    mounted () {
      $("body").scrollTop("0px");
      this.monthInit();

    } ,
    //计算属性
    computed: {

    } ,
    //监控数据变化
    watch: {

    },
    //vue销毁前
    beforeDestroy(){
      window.localStorage.state = JSON.stringify(this.$store.state);
    }

  }
</script>

<style lang="less" scoped>
  .popup{
    width: 100%;
  .buttom{
    display: flex;
    border-bottom: 1px solid #f7f7f7;
    justify-content: space-between;
  p{
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #26a2ff;
  }
  }

  }
  .serviceCon{
    background-color: #F7F7F7;
    padding-bottom: .5rem;
  }
  .history{
    position: fixed;
    z-index: 9999;
    top: .1rem;
    right: .12rem;
    font-size: .13rem;
  .more{
    width: .1rem;
    height: .1rem;
    transform: rotate(90deg);
    vertical-align: middle;
  }
  span{
    vertical-align: middle;
  }
  }
  .summarize{
    margin-top: .12rem;
    padding:  .12rem;
    color: #fff;
    line-height: .3rem;
    background-image: linear-gradient(90deg,#ff636e,#ff3442);
  .tips{
    font-size: .13rem;
  }
  .day{
    font-size: .2rem;

  }
  }
  .vacateListCon{
  .vacateList{
    margin-top: .12rem;
    background-color: #fff;
    padding: 0 .12rem;
  .day{
    color: #ff3442;
    line-height: .44rem;
    border-bottom:1px solid #F7F7F7;
  }
  .time{
    line-height: .3rem;
    display: flex;
    justify-content: space-between;
  }
  }
  }




</style>
