<template>
  <div>
    <headcom title="充值记录"></headcom>
    <div class="content">
    	<ul>
    		<li v-for="(item,index) in orderList">
    			<div class="left">
    				<p class="name">{{item.itemName}}</p>
    				<p class="time">{{item.createDate|timeFormatting("YMDHMS")}}</p>
    				<p class="price" 
						:class="{
							unpaid:item.status=='0',
							succeed:item.status=='1',
							close:item.status=='3',
							}"
						>￥{{item.orderAmount|currency}}</p>
    			</div>
    			<div class="right unpaid" v-if="item.status == '0'" @click="pay(item)">待支付</div>
    			<div class="right succeed" v-if="item.status == '1'">支付成功</div>
    			<div class="right close" v-if="item.status == '3'">已关闭</div>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
	import headcom from "../../components/headcom";
  import {Toast,MessageBox,Indicator} from 'mint-ui';	
	import {getKdgVipOrderList} from '../../apis/app.api';


  export default {
    //组件
    components: {
    	headcom
    } ,
    //父组件传入的数据
    props: {
      
    } ,
    //本地数据
    data(){
      return {
				//订单列表（三种状态 0未支付 1支付成功 2支付失败）
        orderList:[]
      }
		} ,
		//过滤器
		filters: {
			timeFormatting: function (value,type) {
				//元素的补零计算
				function addZero(val){if(val < 10){return "0" +val;}else{return val;}};
				var dataTime="";
				var data = new Date();  
				data.setTime(value); 
				var year   =  data.getFullYear();  
				var month  =  addZero(data.getMonth() + 1);  
				var day    =  addZero(data.getDate()); 
				var hour   =  addZero(data.getHours());
				var minute =  addZero(data.getMinutes());
				var second =  addZero(data.getSeconds());
				if(type == "YMD"){
				dataTime =  year + "-"+ month + "-" + day;
				}else if(type == "YMDHMS"){
				dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
				}else if(type == "HMS"){
				dataTime = hour+":" + minute+":" + second;
				}else if(type == "YM"){
				dataTime = year + "-" + month;
				}
				return dataTime;//将格式化后的字符串输出到前端显示
			},
			currency:function (value){
				var value=Math.round(parseFloat(value)*100)/100;
				var xsd=value.toString().split(".");
				if(xsd.length==1){
					value=value.toString()+".00";
					return value;
				}
				if(xsd.length>1){
					if(xsd[1].length<2){
						value=value.toString()+"0";
					}
					return value;
				}
			}
		},
    
    //方法
    methods: {
			//获取列表数据
			getKdgVipOrderList: function () {
				Indicator.open({ spinnerType: 'fading-circle' });
				var vm = this;
				this.$getKdgVipOrderList({},function (res) {
          Indicator.close();
          if(res.code == "000001"){
            vm.orderList = res.result;
          }else{
            MessageBox("提示",res.message);
          }
        },function (res) {
          Indicator.close();
          MessageBox("提示","数据请求失败");
        })
			},
			//调取支付方法
			pay: function (orderData) {
				console.log("调取支付",orderData);
				
			}
			
      
    } ,
    //进入页面加载
    mounted () {
			this.getKdgVipOrderList();
     
    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {
     
    }

  }
</script>

<style lang="less" scoped>
.content{
	padding: .12rem 0;
	ul{
		li{
			display: flex;
			justify-content: space-between;
			background: #fff;
			border-bottom: 1px solid #eee;
			padding: .12rem;
			.name{
				font-size: .15rem;
			}
			.time{
				font-size: .1rem;
				color: #aeaeae;
				margin-top: .05rem;
			}
			.price{
				font-size: .14rem;
				margin-top: .13rem;
			}
			.right{
				font-size: .14rem;
				line-height: .69rem;
			}
			.unpaid{
				color: #fb4a55;
			}
			.succeed{
				color: #69c9ff;
			}
			.close{
				color: #aeaeae;
			}
		}
	}
}

</style>
