<template>
  <div>
    <div class="count"><span>{{ countDay }}</span> 天
      <p>您的宝贝出勤天数（不含当天）</p>
    </div>
		<weekdate v-on:child-say="listenToMyBoy" :getAttendanceByDate = "getAttendanceByDate"></weekdate>
		<punch :card = "card"></punch>
  </div>
</template>
<script>
  import weekdate from "../weekdate"
  import punch from "../punch"
  import { getAttendanceByDate,selectInfoStuStaticList } from "./../../../apis/app.api"
  import { MessageBox,Indicator,Toast } from "mint-ui";
  export default{
    //组件
    components: {
    	weekdate, punch
    } ,
    //父组件传入的数据
    props: {
      state: Boolean
    } ,
    //本地数据
    data(){
      return {
        card:{
        	   "inParkList":{"state":"","data":[]},
        	   "outParkList":{"state":"","data":[]}
					 },
				time:"",
        countDay:0
      }
    } ,
    //方法
    methods: {
      listenToMyBoy(data){
        this.getDate(data)
      },
      getDate(data){
        Indicator.open({ spinnerType: 'fading-circle' });
        selectInfoStuStaticList({ createDate:data }).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            this.countDay = data.data.result
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      },
      getAttendanceByDate(nowData){
				Indicator.open({ spinnerType: 'fading-circle' });
				this.time = nowData;
	        getAttendanceByDate({"date": nowData}).then((data)=>{
	         	Indicator.close();
	          if(data.body.code == "000001"){
	          	let inParkList = data.body.result.inParkList;
	          	let outParkList = data.body.result.outParkList;
	          	let cardData = this.card;
	          	if(inParkList.length==0&&outParkList.length==0){
	          		Toast("暂无数据");
	          	}
	          	for(var i in cardData){
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
	          	if(inParkList.length>0){
	          		cardData.inParkList.state = 2;
	          	}
	          	//出园
	          	cardData.outParkList.data = outParkList;
	          	if(outParkList.length>0){
	          		cardData.outParkList.state = 3;
	          	}
	          	//下校车
	          	/*cardData.outbus.data = outBusList1;
	          	if(outBusList1.length>0){
	          		cardData.outbus.state = 2;
	          	};*/
	          }else{
	          	MessageBox("提示",data.body.message);
	          }
	        },(data)=>{
							Indicator.close();
	          	MessageBox({title: "请求数据失败"});
	        })
	    }
    } ,
    //进入页面加载
    mounted () {
      this.getDate('')
      this.getAttendanceByDate("");
    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {
     state:function(){
			 this.getAttendanceByDate(this.time);
       this.listenToMyBoy(this.time)
		 }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .count{
    // height: .7rem;
    background-color: #fff;
    margin-bottom: .15rem;
    padding: .3rem 0;
    text-align: center;
    span{
      font-size: .45rem;
      font-weight: bold;
    }
    p{
      margin-top: .2rem;
    }
  }
</style>
