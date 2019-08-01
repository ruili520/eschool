<template>
  <div class="date">
      <!-- 年份 月份 -->
      <!--<div class="month">
        <p>{{ currentYear }}年{{ currentMonth }}月</p>
      </div>-->
      <!-- 星期 -->
      <ul class="weekdays">
        <li v-for="(item,index) in list" :class="{red:item.phase}">{{item.name}}</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <li @click="pick(day,index)" v-for="(day, index) in days" :key="index" :class="{approve:day.state}">
          <!--本月-->
          <span v-if="day.d.getMonth()+1 != currentMonth" class="other-month">{{ day.d.getDate() }}</span>
          <span v-else>
          <!--今天-->
          <span v-if="day.d.getFullYear() == new Date().getFullYear() && day.d.getMonth() == new Date().getMonth() && day.d.getDate() == new Date().getDate()" :class="{active:nowdata}">{{ day.d.getDate() }}</span>
          <span v-else>{{ day.d.getDate() }}</span>
          </span>
        </li>
      </ul>
  </div>
</template>
<script>
  export default {
    name: 'date',
    data () {
      return {
        currentYear: 1970,   // 年份
        currentMonth: 1,  // 月份
        currentDay: 1,    // 日期
        currentWeek: 1,    // 星期
        days: [],
        falg:false,
        nowdata:true,
        list:[
        {"name":"周一","phase":false},
        {"name":"周二","phase":false},
        {"name":"周三","phase":false},
        {"name":"周四","phase":false},
        {"name":"周五","phase":false},
        {"name":"周六","phase":false},
        {"name":"周日","phase":false}
        ]
      }
    },
		props:{
			getAttendanceByDate:{
      	type:Function,
      	default:function(){}
      }
		},
    mounted () {
			this.isweek();

    },

    created () {
      this.initData(null);
    },

    methods: {
      formatDate (year, month, day) {
        const y = year
        let m = month
        if (m < 10) m = `0${m}`
        let d = day
        if (d < 10) d = `0${d}`
        return `${y}-${m}-${d}`
      },

      initData (cur) {
        let date = ''
        if (cur) {
          date = new Date(cur)
        } else {
          date = new Date()
        }
        this.currentDay = date.getDate()          // 今日日期 几号
        this.currentYear = date.getFullYear()       // 当前年份
        this.currentMonth = date.getMonth() + 1    // 当前月份
        this.currentWeek = date.getDay() // 1...6,0   // 星期几
        if (this.currentWeek === 0) {
          this.currentWeek = 7;
        }
        const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
        for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
          const d = new Date(str);
          d.setDate(d.getDate() - i)
          this.days.push({
          	d:d,
          	state:false
          })
        }
        for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
          const d = new Date(str)
          d.setDate(d.getDate() + i)
          this.days.push({
          	d:d,
          	state:false
          })
        }
      },

      //  上个星期
      weekPre () {
        const d = this.days[0]    // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() - 7)
        this.initData(d)
      },

      //  下个星期
      weekNext () {
        const d = this.days[6]    // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() + 7)
        this.initData(d)
      },

      // 上一個月   传入当前年份和月份
      pickPre (year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },


      // 下一個月   传入当前年份和月份
      pickNext (year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(35)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },

      // 当前选择日期
      pick (date,index) {
      	for(var i=0;i<this.days.length;i++){
      		this.days[i].state = false;
      	}
      	for(var i=0;i<this.list.length;i++){
      		this.list[i].phase = false;
      	}
      	this.nowdata = false;
      	this.list[index].phase = true;
      	date.state = true;
      	var nowData = this.formatDate(date.d.getFullYear(), date.d.getMonth() + 1, date.d.getDate());
        this.getAttendanceByDate(nowData);
        this.$emit('child-say',nowData.substr(0,7));
      },
      isweek:function(){
      	var time=new Date();
      	var day=time.getDay();
      	if(day==0){
      		day=7;
      	}
      	this.list[day-1].phase = true;
      	this.days[day-1].state = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  .date {
    background: #fff;
    padding: .11rem .15rem 0 .11rem;

    .month {
      font-size: px2rem(24);
      text-align: center;
      margin-top: px2rem(20);
    }

    .weekdays {
      display: flex;
      font-size: .13rem;
      color: #aeaeae;

      li {
        flex: 1;
        text-align: center;

      }
      .red{
      	color: #ff3442;
      }
    }
  .days .approve{
  	color: #ff3442;
  	border-bottom: .02rem solid #ff3442;
  }
  .days .appro{
  	color: #ff3442;
  	border-bottom: .02rem solid #ff3442;
  }
    .days {
      display: flex;
			margin-top: .05rem;
      li {
        flex: 1;
        width: .3rem;
        line-height: .3rem;
        color: #d8d8d8;
        text-align: center;

        .active {
          display: inline-block;
          width: .3rem;
          height: .3rem;
          color: #fff;
          border-radius: 50%;
          color: #ff3442;
        }

        .other-month {
          color: #e4393c;
        }
      }
    }
  }
</style>
