<template>
  <div>
    <div class="clock">
	    	<ul v-for="(list,index) in card">
	    		<li v-for="(item,index) in list.data">
	    			<p class="ortrait"><span><b>{{item.name}}</b></span></p>
	    			<div class="all">
	    				<p class="name" style="position: relative">
	    					<b>{{item.name}}</b>
                <img :src="item.photoUrl" @click="img(item.photoUrl)" alt=""/>
	    				</p>
	    				<p>
                <span class="time">打卡时间: <i>{{item.datetime}}</i></span><br/>
                <span class="condition">打卡状态: <b>已打卡</b></span>
              </p>
	    			</div>
	    		</li>
	    		<p class="classify color1" v-if="list.state==1">上校车</p>
	    		<p class="classify color2" v-if="list.state==2">入园</p>
	    		<p class="classify color3" v-if="list.state==3">出园</p>
	    		<p class="classify color4" v-if="list.state==4">下校车</p>
	    	</ul>
	  </div>
		<div class="shade" v-if="prop">
			<div class="window" @click="relf">
				<img :src="imgSrc"/>
				<div class="shut">
					<span @click="close"><img src="../../../assets/wisdomCampusIndex/clos.png"></span>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
  export default{
    //组件
    components: {} ,
    //父组件传入的数据
    props: {
			card:Object
    } ,
    //本地数据
    data(){
      return {
      	imgSrc:"",
      	prop:false,
      }
    } ,

    //方法
    methods: {
    	relf(){
    		console.log("阻止")
    		return false;
    	},
    	//关闭弹窗
    	close:function(){
    		this.prop = false;
    	},
      img:function(src){
      	if(src==null||src==""){
      		this.imgSrc = require("../../../assets/dome/saber.png");
      	}else{
      		this.imgSrc = src;
      		this.prop = true;
      	}
      }
    } ,
    //进入页面加载
    mounted () {},
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
img{
	width: 100%;
}
i,b{
	font-style: normal;
	font-weight: normal;
}
  .clock{
  	padding: 0 .12rem .12rem .12rem;
  	ul{
  		margin-top: .14rem;
  		position: relative;
  		background: #fff;
  		border-radius: 0.04rem;
  		li{
  			padding-left: .12rem;
  			display: flex;
  			justify-content: flex-start;
  		}
  	}
  	.classify{
  		position: absolute;
  		left: .12rem;
  		top: 0;
  		width: 0.4rem;
      padding: 2px 5px;
			line-height: 0.14rem;
			border-radius: 0.015rem;
			font-size: .1rem;
			color: #fff;
			text-align: center;
  	}
  }
  .color1{
  	background: #00a0e9;
  }
  .color2{
  	background: #ffc350;
  }
  .color3{
  	background: #32e790;
  }
  .color4{
  	background: #ff7639;
  }
  .all{
  	width: 2.66rem;
  	align-items: center;
  	padding: .3rem .12rem 0 0;
  	border-bottom: 1px solid #ebecee;
  	b{
  		color: #ff7b7b;
  	}
  	span{

  	}
  }
  .ortrait{
  	padding: .24rem .12rem .12rem 0;
		span{
			position: relative;
			display: inline-block;
			width: 0.7rem;
			height: 0.7rem;
			border-radius: 50%;
			background-color: #ebecee;
			text-align: center;
			font-size: .1rem;
			color: #fff;

			b{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: 100%;
			}
		}
  }
  .name{
  	display: flex;
  	justify-content: space-between;
  	font-size: .16rem;
  	color: #464646;
  	margin-bottom: .07rem;
    img{
			display: inline-block;
			// border-radius: 50%;
      width: .7rem;height:.7rem;
      position: absolute;right:0;
      transform:rotate(90deg);
    }
  	span{
  		border:1px solid #aeaeae;
  		border-radius: .03rem;
  		padding: .03rem;
  		color: #aeaeae;
  		font-size: .11rem;
	    margin-top: -.1rem;
	    height: .2rem;
			line-height: .2rem;
  	}
  }
  .condition,.time{
  	font-size: .13rem;
  	color: #858585;
  }
  .time{
  	margin-right: .2rem;
    display: inline-block;
    margin-bottom:3px;
  }
  ul li:last-child .all{
  	border: none;
  }
  ul li:nth-child(even) .ortrait span{
		background: #ffc34d;
	}
	ul li:nth-child(odd) .ortrait span{
		background: #52c9ff;
	}
	.shade{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.7);
		top: 0;
		bottom: 0;
		z-index: 1000;
	}
.shade .window{
	width: 2.69rem;
	height: 2rem;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-51%,-50%);
	font-size: .14rem;
	color: #fff;
	z-index: 1001;
	img{
		width: 100%;
		height: 100%;
    transform:rotate(90deg);
	}
}
.shut{
	display: flex;
	justify-content: center;
	margin-top: .24rem;
	span{
		display: inline-block;
		width: .32rem;
		height: .32rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
