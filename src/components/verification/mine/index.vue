<template>
  <div>
    <div class="center">
	    	<ul>
	    		<li>
	    			<p class="head"></p>
	    			<div class="informa">
	    				<p class="name">明明</p>
	    				<p>学校: 上海市复旦大学附属高级小学</p>
	    				<p>年级: 三年级二班</p>
	    				<p>手机: 187****432</p>
	    				<p>学籍号: 2310004541*****152</p>
	    			</div>
	    		</li>
	    		<li>
	    			<p class="head"></p>
	    			<div class="informa">
	    				<p class="name">明明</p>
	    				<p>学校: 上海市复旦大学附属高级小学</p>
	    				<p>年级: 三年级二班</p>
	    				<p>手机: 187****432</p>
	    				<p>学籍号: 2310004541*****152</p>
	    			</div>
	    		</li>
	    	</ul>
	  </div>
	  <div class="add" @click="addinfor">
	  	<p><span><img src="../../../assets/verifica/add.png"></span>关联其他学生</p>
	  	<span><img src="../../../assets/verifica/2_icon_3.png"></span>
	  </div>
  </div>
</template>

<script>



  export default{
    //组件
    components: {} ,
    //父组件传入的数据
    props: {

    } ,
    //本地数据
    data(){
      return {

      }
    } ,

    //方法
    methods: {
      addinfor:function(){
      	this.$router.push({"name":"verification","query":{
      		"type":"2"
      	}});
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
  	padding: 0 .12rem;
  	ul{
  		li{
  			margin-top: .12rem;
  			display: flex;
  			justify-content: flex-start;
  			width: 3.27rem;
				height: 1.44rem;
				padding: .12rem;
				background: url(../../../assets/verifica/bg.png);
				background-size: 100% 100%;
				border-radius: 0.08rem;
				font-size: .13rem;
				color: rgba(255, 255, 255, 0.8);
				p{
					line-height: .23rem;
				}
				.informa{
					margin-top: .16rem;
				}
  		}
  		.head{
  			width: 0.64rem;
				height: 0.64rem;
				background-color: #ebecee;
				border: solid 0.03rem #6eb5ff;
				border-radius: 50%;
				margin-right: .13rem;
  		}
  		.name{
  			font-size: .18rem;
  			color: #fff;
  			margin-bottom: .12rem;
  		}
  	}
  }
  .add{
  	display: flex;
  	justify-content: space-between;
  	padding: .12rem;
		background-color: #ffffff;
		margin-top: .2rem;
		font-size: .15rem;
		color: #858585;
		span{
			display: inline-block;
			width: .15rem;
			height: .15rem;
			margin-right: .1rem;
			img{
				width: 100%;
			}
		}
  }
</style>
