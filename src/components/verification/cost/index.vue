<template>
  <div class="stufees">
    <div class="center" v-for="(list,index) in allList">
    	<div class="all" v-for="item in list" :class="{ash:item.status==1}">
    		<p class="portrait"><span><b>{{item.studentName}}</b></span></p>
				<div class="informa">
					<div class="left">
						<p class="name">{{item.taskName}}</p>
						<p class="time">{{item.endDateStr}}</p>
						<p class="price">￥<span>{{item.amount}}</span></p>
					</div>
					<div class="right">
						<p class="pay"  v-if= "!(item.status==1)">待支付</p>
						<p class="paid" v-if= "item.status==1">已支付</p>
						<!--<p class="num">考勤次数：<span>{{item.amount}}</span>次</p>-->
					</div>
				</div>
    	</div>
			
	  </div>

  </div>
</template>

<script>
  
	import {MessageBox} from 'mint-ui';

  export default{
    //组件
    components: {} ,
    //父组件传入的数据
    props: {
      allList:Object,
    } ,
    //本地数据
    data(){
      return {
        
      }
    } ,
    
    //方法
    methods:{
    	pages:function(){
    		// MessageBox("提示","该页面只用于查询，缴费请关注公众号工银e校园<br>（微信号gongyinexiaoyuan）");
    	},
      //时间转换
      timeDate:function(){
      	var date = new Date("毫秒数");
				var	Y = date.getFullYear() + '-';
				var	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var	D = date.getDate() + ' ';
				var	h = date.getHours() + ':';
				var	m = date.getMinutes() + ':';
				var	s = date.getSeconds(); 
				console.log(Y+M+D+h+m+s); 
      }
      
    } ,
    //进入页面加载
    mounted () {
     
    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {
     
    }

  }
</script>

<style lang="less" scoped>
  .center{
  	margin-top: .12rem;
  	padding: 0 .12rem;
  	background: #fff;
  		.all{
  			display: flex;
  			justify-content: flex-start;
  		}
  		.portrait{
  			
				margin-right: .12rem;
				padding: .12rem 0;
				span{
					position: relative;
					display: inline-block;
					width: 0.64rem;
					height: 0.64rem;
					background-color: #52c9ff;
					border-radius: 50%;
					text-align: center;
					font-size: .15rem;
					color: #fff;
					b{
						position: absolute;
						left: 50%;
						width: 100%;
						top: 50%;
						transform: translate(-50%,-50%);
					}
				}
  		}
  		.left{
  			width: 1.3rem;
  			.name{
  				font-size: .15rem;
  				color: #464646;
  			}
  			.time{
  				
  				font-size: .13rem;
  				color: #aeaeae;
  			}
  			.price{
  				margin-top: .03rem;
  				font-size: .18rem;
  				color: #ff3442;
  			}
  		}
  		.informa{
  				display: flex;
  				justify-content: space-between;
  				width: 2.8rem;
  				padding-top: .12rem;
  				border-bottom: 1px solid #ebecee;
  		}
  		.right{
  			.pay{
  				width: 0.62rem;
					line-height: 0.25rem;
					border-radius: 0.04rem;
					border: solid 0.01rem #ff525e;
					text-align: center;
					font-size: .13rem;
					color: #ff3442;
					margin: 0 auto;
					margin-top: .14rem;
  			}
  			.num{
  				font-size: .1rem;
  				color: #aeaeae;
  				margin-top: .05rem;
  			}
  		}
  }
	.center .all:nth-child(even) .portrait span{
		background: #ffc600;
	}
	.center .all:last-child .informa{
		border-bottom: none;
	}
	.stufees .center .ash{
		color: #aeaeae;
		.portrait span{
			background: #aeaeae;
		}
		.name{
			color: #aeaeae;
		}
		.price{
			color: #aeaeae;
		}
	}
	.paid{
		line-height: .75rem;
	}
	
</style>