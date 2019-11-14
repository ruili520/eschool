<template>
  <div>
    <headcom title="宝宝考勤"></headcom>
    <div class="darling" v-if="false">
      <p class="name"></p>
      <p class="day"><span>{{nowTime}}</span> <span>{{day}}</span></p>
    </div>
    <calendar v-on:child-say="listenToMyBoy" :getAttendanceByDate = "getAttendanceByDate"></calendar>
    <punch :card = "card"></punch>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import calendar from "../../components/verification/calendar"
  import punch from "../../components/verification/punch"
  import {getAttendanceByDate} from "../../apis/app.api"
  import {MessageBox,Indicator,Toast} from "mint-ui";
  export default{
    //组件
    components: {
      headcom,
      calendar,
      punch
    } ,
    //父组件传入的数据
    props: {} ,
    //本地数据
    data(){
      return {
        nowTime:"",
        day:"",
        card:{
          "inParkList":{"state":"","data":[]},
          "outParkList":{"state":"","data":[]}
        }

      }
    } ,

    //方法
    methods: {
      showTime:function(){
        var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
        var time=new Date();
        var year=time.getFullYear();
        var month=time.getMonth() + 1;
        var date=time.getDate();
        var day=time.getDay(); //星期

        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (date >= 0 && date <= 9) {
          date = "0" + date;
        }
        this.nowTime = year+'-'+month+'-'+date;
        this.day = show_day[day];
        console.log(this.nowTime);
      },
      //点击日期的传值
      listenToMyBoy:function(data){
        this.nowTime = data.hits;
        this.day = data.cycle;
      },
      getAttendanceByDate: function (nowData) {
        //console.log(nowData)
        var vm = this;
        Indicator.open({spinnerType: 'fading-circle'});
        vm.$getAttendanceByDate({
          "date": nowData
        }, function (res) {
          console.log(res)
          Indicator.close();
          if (res.code === "000001") {
            //console.log(data.body.result);
            var inParkList = res.result.inParkList;
            /*var inBusList1 = data.body.result.inBusList1;*/
            var outParkList = res.result.outParkList;
            /*var outBusList1 = data.body.result.outBusList1;*/
            var cardData = vm.card;
            if (inParkList.length === 0 && outParkList.length === 0) {
              Toast("暂无数据");
            }
            for (var i in cardData) {
              cardData[i].state = "";
            }
            //上校车
            /*cardData.inbus.data = inBusList1;
                if(inBusList1.length>0){
                    cardData.inbus.state = 1;
                };*/
            //入园
            //console.log(inParkList.length)
            cardData.inParkList.data = inParkList;
            if (inParkList.length > 0) {
              cardData.inParkList.state = 2;
            }
            ;
            //出园
            cardData.outParkList.data = outParkList;
            if (outParkList.length > 0) {
              cardData.outParkList.state = 3;
            }
            ;
            //上校车
            /*cardData.outbus.data = outBusList1;
                if(outBusList1.length>0){
                    cardData.outbus.state = 2;
                };*/
          } else {
            MessageBox("提示", res.message);
          }
        }, function (res) {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      }
    } ,
    //进入页面加载
    mounted () {
      this.showTime();
      this.getAttendanceByDate("");
    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {

    }

  }
</script>

<style lang="less" scoped>
  .darling{
    margin: .12rem 0 0 0;
    background: #fff;
    padding: .13rem .12rem;
    display: flex;
    justify-content: space-between;
  .name{
    width: .4rem;
    line-height: 0.4rem;
    border-radius: 50%;
    background-color: #539cff;
    text-align: center;
    font-size: .13rem;
    color: #fff;
  }
  .day{
    line-height: 0.4rem;
    font-size: .14rem;
    color: #aeaeae;
  }
  }
</style>
