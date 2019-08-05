<template>
  <div>
    <div class="round" v-if="show">
    	<div class="shade">
    		<p class="title">
    			<span class="close" @click="pope(false)"><img src="../../assets/img/schoolfees/close.png"></span>
    			<span class="folte"><img src="../../assets/img/schoolfees/ttotle.png"></span>
    			<span class="font">请输入支付密码</span>
    		</p>
    		<div class="mony">
    			<p>手机充值</p>
    			<p class="num">￥{{money}}.00</p>
    		</div>
    		<p class="card">校园卡  (3324)<span><img src="../../assets/img/verifica/more.png"></span></p>
    		<div class="impor">
    			<p v-for="item in 6" @click="down">
    				<i></i>
    			</p>
    		</div>
    		
    	</div>
    	<input id="aaa" type="tel" v-model="list"/>
    </div>
  </div>
</template>

<script>



  export default{
    //组件
    components: {} ,
    //父组件传入的数据
    props: {
      show:Boolean,
      money:[String,Number]
		} ,
    //本地数据
    data(){
      return {
        monyPhone:"￥50.00",
        list:"",
        close:false
      }
    } ,

    //方法
    methods: {
      down:function(){
      	console.log(2222)
      	$("#aaa").focus();
      },
      pope:function(code){
      	this.$emit('total',{
          state:false,
          pay:code
        })
      }
    } ,
    //进入页面加载
    mounted () {

    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {
     list:function(v){
     	console.log(v.length);
     	var length = v.length;
     	var Plist = $(".impor p");
     	$.each(Plist, function(i) {
     		$(this).find("i").css("display","none");
     		//Plist.eq(i).html("")
     	});
     	console.log(Plist.length)
     	$.each(v, function(i) {
     		console.log(v[i]);
     		//Plist.eq(i).html(v[i]);
     		Plist.eq(i).find("i").css("display","inline-block");
     	});
     	if(length>=6){
        this.pope(true);
     	}

     }
    }

  }
</script>

<style lang="less" scoped>
img{
	width: 100%;
	vertical-align: middle;
}
  .round{
  	position: fixed;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	/*background: #000;
  	opacity: .7;*/
  	background: rgba(0,0,0,0.7);
  	z-index: 10000;
  	padding: 0 .12rem;
  }
  .shade{
  	padding: .12rem;
  	width: 3.26rem;
  	background: #fff;
  	position: relative;
  	top: 50%;
  	transform: translate(0,-50%);
  }
  .title{
  	border-bottom: 1px solid #eee;
  	padding-bottom: .12rem;
  }
  .title .close{
  	display: inline-block;
  	width: .25rem;
  	vertical-align: middle;
  	margin-right: .1rem;
  }
  .folte{
  	display: inline-block;
  	width: .4rem;
  	height: .4rem;
  	margin-right: .1rem;
  }
  .mony{
  	padding:.12rem 0;
  	border-bottom: 1px solid #eee;
  	p{
  		text-align: center;

  	}
  	.num{
  		font-size: .28rem;
  	}
  }
  .card {
  	padding: .12rem 0;
  	display: flex;
  	justify-content: space-between;
  	border-bottom: 1px solid #eee;
  	span{
  		display: inline-block;
  		width: .15rem;
  	}
  }
  .impor{
  	border: 1px solid #eee;
  	display: flex;
  	justify-content: flex-start;
  	margin-top: .12rem;
  	p{
  		height: .5rem;
  		width: .53rem;
  		border-right: 1px solid #eee;
  		text-align: center;
  		line-height: .5rem;
  		i{

  			width: .07rem;
  			height: .07rem;
  			background: #000;
  			border-radius: 50%;
  			display: none;

  		}
  	}
  }
  .impor p:last-child{
  	border-right: 0;
  }
  #aaa{
  	/*position: relative;
  	top: 0;*/
  	position: relative;
    z-index: -1;
    -webkit-text-security:disc;
    // text-security:disc; /*使用指定形状代替文字显示 circle圆圈 disc 圆形 square 正方形*/
  }
</style>
