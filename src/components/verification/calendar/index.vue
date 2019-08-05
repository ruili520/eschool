<template>
  <div>
    <div class="date">
      <!-- 年份 月份 -->
      <div class="month">
        <i class="el-icon-arrow-left" @click="pickPre(currentYear,currentMonth)"><</i>
        <i class="format">{{ currentYear }} 年 {{ currentMonth }} 月</i>
        <i class="el-icon-arrow-right" @click="pickNext(currentYear,currentMonth)">></i>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>
      </ul>
      <!-- 日期    月视图-->
      <div class="bodyDiv">
        <ul class="days" v-for="(value,index1) in daysUL">
          <li @click="pick(day,index+index1*7)" v-for="(day, index) in value" :class="[{'ban':isBan[index+index1*7]},{'xiu':isXiu[index+index1*7]}]" >
            <!--本月-->
            <span v-if="day.d.getMonth()+1 != currentMonth" class="other-month" :class="{'selected':isSelected[index+index1*7]}">{{ day.d.getDate() }}
            	<span class="arc"></span>
            </span>

            <span v-else :class="{'selected':isSelected[index+index1*7]}">
          <!--今天-->
          	<span class="arc"></span>
	          <span v-if="day.d.getFullYear() == new Date().getFullYear() && day.d.getMonth() == new Date().getMonth() && day.d.getDate() == new Date().getDate()" :class="{active:nowdata||day.state}">{{ day.d.getDate() }}</span>
	          <span v-else :class="{active:day.state}">{{ day.d.getDate() }}</span>
          </span>
          </li>

        </ul>
      </div>

      <!--<hr style="height:2px;border:none;border-top:2px dotted #185598;" />-->
    </div>
    <!--<div class="button">-->
      <!--<div><el-button type="primary" size="large" @click="returnNow()">返回本月</el-button></div>-->
      <!--<div><el-button type="primary" size="large" @click="setRestOrWork('R')">设置为节假日</el-button></div>-->
      <!--<div><el-button type="primary" size="large" @click="setRestOrWork('W')">设置为工作日</el-button></div>-->
      <!--<div><el-button type="primary" size="large" @click="cancel()">取消</el-button></div>-->
    <!--</div>-->
  </div>
</template>

<script>
//  import { calendarMsgService } from './CalendarMsgService'
	import {doSign,getSignInfo,receiveSignPoints} from "../../../apis/app.api"
  export default {
    name: 'date',

    data () {
      return {
        currentYear: 1970,   // 年份
        currentMonth: 1,  // 月份
        currentDay: 1,    // 日期
        currentWeek: 1,    // 星期
        firstWeek:1,
        nowdata:true,
        days: [],
        daysUL:[],
        dayList:[],
        params:{
          selectDay:'',
          type:''
        },
        isSelected:[],
        isBan:[],
        isXiu:[],
        restDays:{
          year:'',
          month:'',
          day:'',
          resttype:'',
          restdate:''
        },
        restDaysList:[],
        banList:[],
        xiuList:[],
        selectIndex:'',
        firstData:'',
        singList:[],   //签到日期
        showList:[]	,
        obj:{}
      }
    },

    created () {
      this.initData(null);
      //this.getSignInfo();

    },
    props:{
    	getAttendanceByDate:{
      	type:Function,
      	default:function(){}
      }
    },
    //进入页面加载
    mounted () {
			//this.getSignInfo();
			//this.receiveSignPoints();
			//this.taskList();
			console.log(this.days);
    } ,
    methods: {
      //格式化日期
      formatDate (year, month, day) {
        const y = year
        let m = month
        if (m < 10) m = `0${m}`
        let d = day
        if (d < 10) d = `0${d}`
        return `${y}-${m}-${d}`
      },
      //格式化时间
	    formattingDate:function(timedata){
			var date = new Date(timedata);
			var Year = date.getFullYear();
			var Month = (date.getMonth() + 1)<10 ? "0" + (date.getMonth() + 1):(date.getMonth() + 1);
			var d = date.getDate()<10 ? "0" + date.getDate():date.getDate();
			return Year + "-" + Month + "-" + d;
		},
      //获取签到详细信息
      getSignInfo(){
        getSignInfo({
        	"firstDate":this.firstData
        }).then((data)=>{
        	if(data.body.code == "000001"){
        		var dayNum = data.body.result.continuousSignCount;
	        	//console.log(dayNum)
	        	var list = data.body.result.signDateList;
	        	//将请求回来的时间格式化，放进数组singList，方便对比
	        	for(var i=0;i<list.length;i++){
	        		this.singList.push(
	        			this.formattingDate(list[i])
	        		)
	        	}
	        	console.log(this.singList);
	        	//将日历上的时间放到数组showList里
	        	for(var i=0;i<this.daysUL.length;i++){
	        		for(var j=0;j<this.daysUL[i].length;j++){
	        			this.showList.push(this.formattingDate(this.daysUL[i][j]));
	        		}
	        	}
	        	//console.log(this.singList);
	        	//对比数组singList和showList，找到签到时间的下标
	        	for(var i=0;i<this.showList.length;i++){
	        		this.isSelected.push(false);
	        		if(this.singList.indexOf(this.showList[i])!=-1){
	        			//console.log(i);
	        			this.pick(i);
	        		}
	        	}
						//向父组件传递的状态
	        	this.obj.flag4 = data.body.result.flag4;
	        	this.obj.flag7 = data.body.result.flag7;
	        	this.obj.continuousSignCount = data.body.result.continuousSignCount;
	        	this.increment();
        	}
        },()=>{})
      },
      //向父组件传值
      increment:function(){
       this.$emit("accept",this.obj);
      },
      initData (cur) {
//       // debugger;
        let date = ''
        if (cur) {
          date = new Date(cur)
        } else {
          date = new Date()
        }
        this.currentDay = date.getDate()          // 今日日期 几号
        this.currentYear = date.getFullYear()       // 当前年份
        this.currentMonth = date.getMonth() + 1    // 当前月份
        this.currentWeek = date.getDay() // 1...6,0   // 今天是星期几

        //当前月的第一天是星期几

        date.setDate(1);
       /* this.firstData = date.setDate(1);
        console.log(this.formattingDate(this.firstData))*/
        this.firstWeek = date.getDay();

        if (this.firstWeek === 0) {
          this.firstWeek = 7;
        }
        const str = this.formatDate(this.currentYear, this.currentMonth, 1)// 今日日期 年-月-日
        this.days.length = 0;

        // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 42- this.firstWeek
        for (let i = this.firstWeek - 1; i >= 0; i -= 1) {
          const d = new Date(str)
          d.setDate(d.getDate() - i)
          this.days.push({
          	d:d,
          	state:false
          });
        }

        //处理1号是星期天为 7 的情况， 为7天就直接放在daysUL里
        if (this.days.length % 7 === 0){
          this.daysUL.push(this.days);
          this.days = [];
        }

        for (let i = 1; i <= 42 - this.firstWeek; i += 1) {
          const d = new Date(str);
          d.setDate(d.getDate() + i);
          this.days.push({
          	d:d,
          	state:false
          });
          //一个 days 就是一行7天  daysUL 就是个数组，里面有六个days  就是六行42天
          if (this.days.length % 7 === 0){
            this.daysUL.push(this.days);
            this.days = [];   //清空重新存放天数
          }

        }

        //调后台接口，获取当前年，当前月的 班休时间
//        calendarMsgService.getRestDays({currentYear:this.currentYear,currentMonth:this.currentMonth}).then(res => {
//          if (res.code === 0){
////          debugger;
//          this.restDaysList = res.content;
//          this.dealResult(this.currentYear,this.currentMonth);
//        }
//      })
				this.firstData = this.formattingDate(this.daysUL[0][0]);
				console.log(this.daysUL);
      },
      setRestOrWork(type) {
        if (this.onlySelect()) {
          this.params.type = type;
//          debugger;
//          calendarMsgService.addRestDays(this.params).then(res => {
//            if (res.code === 0) {
//            this.$message({
//              message: '设置成功！',
//              type: 'success'
//            })
//            if (type == 'R'){
//              this.isXiu[this.selectIndex] = true;
//            }
//            if (type == 'W'){
//              this.isBan[this.selectIndex] = true;
//            }
//          } else {
//            this.$message({
//              message: res.msg,
//              type: 'error'
//            })
//          }
//          this.params.selectDay = '';
//          this.params.type = '';
//        })

        }
      },
      cancel() {
        if (this.onlySelect()) {
//          calendarMsgService.cancelRestDays(this.params).then(res => {
//            if (res.code === 0) {
//            this.$message({
//              message: '取消成功！',
//              type: 'success'
//            })
//            this.isXiu[this.selectIndex] = false;
//            this.isBan[this.selectIndex] = false;
//          } else {
//            this.$message({
//              message: res.msg,
//              type: 'error'
//            })
//          }
//          this.params.selectDay = '';
//          this.params.type = '';
//        })
        }
      },

      // 上一個月   传入当前年份和月份
      pickPre (year, month) {
        this.daysUL = [];
        this.isSelected = [];
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
     },
      // 下一個月   传入当前年份和月份
      pickNext (year, month) {
        this.daysUL = [];
        this.isSelected = [];
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(42)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        //当点击下个月的时候，才会去拿该月的休息或者工作日的日期，而不是一下子都拿出来
//        calendarMsgService.getRestDays({currentYear:this.currentYear,currentMonth:this.currentMonth}).then(res => {
//          if (res.code === 0){
////          debugger;
//          this.restDaysList = res.content;
//          this.dealResult(this.currentYear,this.currentMonth);
//        }
//      })
      },
      //算法
      dealResult(currentYear,currentMonth){
        this.banList = [];  //把当前月的 工作日 放在一起
        this.xiuList = [];  //把当前月的 休息日 放在一起
        this.isBan = [];    //设置标识，来确定用什么样的背景图
        this.isXiu = [];
        let zhouji = new Date(this.formatDate(currentYear, currentMonth, 1)).getDay(); //被查找的月份 1 号是星期几
        console.log(zhouji);
        if (zhouji === 0){  // 0 就是星期天
          zhouji = 7;
        }
        for (let i = 0; i<this.restDaysList.length;i++){
          this.restDays = this.restDaysList[i];
          if (this.restDays.resttype === 'W') {
            let ban = this.restDays.day - 1 + (zhouji - 1);//重要算法，算出班日，在几号位
            this.banList.push(ban);
          }
          if (this.restDays.resttype === 'R'){
            let xiu = this.restDays.day - 1 + (zhouji - 1);//重要算法，算出休息日，在几号位
            this.xiuList.push(xiu);
          }
        }
        for (let m = 0; m < 42; m++) {    // banlist 里面放置的都是在日历上处于几号位，而不是工作日的日期，
          let nothave = true;           // 所以得把这些位置号拎出来，给它们于不同的样式
          for (let k = 0; k < this.banList.length; k++) {
            if (m == this.banList[k]) {
              this.isBan.push(true);
              nothave = false;
              break;
            }
          }
          if (nothave) {
            this.isBan.push(false);
          }
        }
        for (let n = 0; n < 42; n++) {   // 同上，来处理休息日
          let nothave = true;
          for (let k = 0; k < this.xiuList.length; k++) {
            if (n == this.xiuList[k]) {
              this.isXiu.push(true);
              nothave = false;
              break;
            }
          }
          if (nothave) {
            this.isXiu.push(false);
          }
        }
      },
      returnNow(){
        this.daysUL = [];
        this.initData(null);
      },
      // 当前选择日期
      pick (day,index) {
      	for(var i=0;i<this.daysUL.length;i++){
      		for(var j=0;j<this.daysUL[i].length;j++){
      			this.daysUL[i][j].state = false;
      		}
      	}
      	this.nowdata = false;
      	day.state = true;
      	console.log(index);
      	console.log(day)
      	var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
      	var fille=day.d.getDay();
      	/*var date = new Date();
        this.selectIndex = index;
//      this.isSelected = [];
      //  this.params.selectDay = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        for (let i = 0; i < 42; i++) {
          if (index == i) {
            this.isSelected[i] = true;
            continue;
          }
//        this.isSelected.push(false);*/
					var hits = this.formatDate(day.d.getFullYear(), day.d.getMonth() + 1, day.d.getDate());
					var cycle = show_day[fille];
					var obj = {"hits":hits,"cycle":cycle};
 					this.$emit('child-say',obj);
 					this.getAttendanceByDate(hits);
       /* }*/
      },
      onlySelect(){
        if(this.params.selectDay === ''){
          this.$message({
            message: '请选择日期',
            type: 'warning'
          });
          return false;
        }
        return true;
      },
   },
  }
</script>

<style scoped>
	i{
		font-style: normal;
		cursor:pointer;
	}
  .date {
    /*height: 250px;*/
    width:100%;
    color: #333;
    background: #fff;
    padding-bottom: .13rem;
  }
  .button{
    float: left;
    margin-left:110px;
    margin-top:120px;
  }
  .button>div{
    margin-top:70px;
  }
  .month {
  	display: flex;
  	justify-content: center;
  	padding: .1rem 0;
    font-size: .15rem;
    text-align: center;
    margin-top: .12rem;

  }
  .format{
    	margin: 0 .3rem;
  }
  .weekdays {
    background-color: #fff;
    opacity: 0.6;
    display: flex;
    font-size: .15rem;
    color: #aeaeae;
    /*margin-top: .1rem;*/
  }
  .days {
    display: flex;
  }
  li {
  	position: relative;
    flex: 1;
    font-size: .15rem;
    width:.3rem;
    list-style-type:none;
    text-align: center;
    margin-top: 5px;
    line-height: .3rem;
    cursor:pointer;
  }
  .selected .arc{
   display: block;
   position: absolute;
   bottom: -.03rem;
   left: 46%;
   width: .04rem;
   height: .04rem;
   background: #fd5060;
   border-radius: 50%;
  }
  .ban{
    /*background-image: url(image/ban.jpg);*/
  }
  .xiu{
    /*background-image: url(./image/xiu.jpg);*/
    background-repeat: no-repeat;
  }
  .active {
    display: inline-block;
    width: .27rem;
    line-height: .27rem;
    color: #fff;
    border-radius: 50%;
    background: #539cff;
		text-align: center;
  }

  .other-month {
    color: #aeaeae;
  }
</style>
