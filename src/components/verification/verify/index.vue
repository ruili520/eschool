<template>
  <div>
  	<!--身份选择-->
    <div class="center" v-show="ifshow&&active">
	    	<ul>
	    		<li v-for="(item,index) in list" :id="item.id" @click="stand(item.id,index)" :class="{easyui:!item.state}">
	    			{{item.name}}
	    			<span v-show="item.state"><img src="../../../assets/verifica/ok.png"/></span>
	    			<span class="uncheck" v-show="!item.state"><img src="../../../assets/verifica/unchk.png"></span>
	    		</li>
	    	</ul>
	    </div>
		<!--信息填写-->
		<div class="identity" v-show="!ifshow&&active">
			<ul v-show="inforstate1">
				<li class="school" @click="link">
					<span>学校</span>
					<i>{{tach}}</i>
					<b><img src="../../../assets/verifica/more.png"></b>
				</li>
				<li>
					<span>学籍号</span>
					<input type="text" placeholder="请填写学籍号" v-model="studentNo"/>
				</li>
			</ul>
			<ul v-show="inforstate2">
				<li class="school" @click="link">
					<span>孩子学校</span>
					<i>{{tach}}</i>
					<b><img src="../../../assets/verifica/more.png"></b>
				</li>
				<li>
					<span>孩子学籍号</span>
					<input type="text" placeholder="请填写学籍号" v-model="studentNo"/>
				</li>
				<li>
					<span>家长姓名</span>
					<input type="text" placeholder="请填写姓名" v-model="userName"/>
				</li>
			</ul>
			<ul v-show="inforstate3">
				<li class="school" @click="link">
					<span>学校</span>
					<i>{{tach}}</i>
					<b><img src="../../../assets/verifica/more.png"></b>
				</li>
				<li>
					<span>学工号</span>
					<input type="text" placeholder="请填写学籍号" v-model="employNo"/>
				</li>
			</ul>
			<!--<p class="pdu"><span><img src="../../../assets/verifica/ok.png"></span>已同意开通协议</p>-->
			<!--<p class="p">实名信息将通过银行卡进行校验</p>-->
		</div>
		<!--审核通过-->
		<div class="pass" v-show="!active">
			<div class="achieve">
				<img src="../../../assets/verifica/pa.png">
				<p>审核通过</p>
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
      ifshow:Boolean,
      active:Boolean,
      tach:String,
      schoolState:Boolean,
      startTakeData:Boolean,
      takeData:{
      	type:Function,
      	default:function(){}
      }
    } ,
    //本地数据
    data(){
      return {
        list:[
		 			/*{"name":"学生","state":true,"id":1},*/
		 			{"name":"家长","state":true,"id":2},
		 			{"name":"老师","state":false,"id":3}
		 		],
		 		inforstate1:false,
		 		inforstate2:false,
		 		inforstate3:false,
		 		id:"1",//选择身份的id值
		 		userName:"",//家长姓名
		 		studentNo:"",//学籍号
		 		employNo:""
      }
    } ,
    //方法
    methods: {
      link(){
      	this.$router.push({"name":"school","query":{
      		"id":this.id
      	}});
      },
      stand(iemId,index){
      	//置灰老师
	  		/*for(var i=0;i<this.list.length;i++){
	  		this.list[i].state = 	false;
	      	};
	      	this.list[index].state = 	true;
	      	this.id = iemId;
	      	sessionStorage.setItem('verstate',JSON.stringify(iemId));*/
      },
      //获取页面选择身份的数据
      indent:function(){
      	var invstate = JSON.parse(sessionStorage.getItem('verstate'));
      	if(invstate==null||invstate==undefined){
      		sessionStorage.setItem('verstate',JSON.stringify(2));
      		invstate = 2;
      	};
      	console.log(invstate);
      	if(invstate == 1){
      		this.inforstate1 = true;
      	}else if(invstate == 2){
      		this.inforstate2 = true;
      	}else if(invstate == 3){
      		this.inforstate3 = true;
      	}
      }
    } ,
    //进入页面加载
    mounted () {
     this.indent();
    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {
    	startTakeData:function(v){
    		var Id = JSON.parse(sessionStorage.getItem('id'));
    		var schoolType = JSON.parse(sessionStorage.getItem('schoolType'));
    		var roleId = JSON.parse(sessionStorage.getItem('verstate'));
    		var data = {
    			schoolId:Id,
    			roleId:roleId,
    			userName:this.userName,
    			studentNo:this.studentNo,
    			campusType:schoolType,
    			employNo:this.employNo
    		};
    		this.takeData(data);
    	},
     		id:function(v){
     			this.inforstate1 = false;
     			this.inforstate2 = false;
     			this.inforstate3 = false;
     			console.log(v);
     			this.id = v;
     			if(v==1){
     				this.inforstate1 = true;
     			}else if(v==2){
     				this.inforstate2 = true;
     			}else if(v==3){
     				this.inforstate3 = true;
     			}
     		}
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
 i,b{
 	font-style: normal;
	font-weight: normal;
 }
	input{
		background: none;
		border: none;
		outline: none;
	}
	img{
		width: 100%;
	}
  .center{
		background: #fff;
		margin-top: .45rem;
		padding: 0 .12rem;
		font-size: .14rem;
		ul li{
			display: flex;
			justify-content: space-between;
			line-height: .65rem;
			span{
				display: inline-block;
				width: 0.2rem;
				img{
					vertical-align: middle;
				}
			}
		}
	}
	.identity{
		margin-top: .45rem;
		font-size: .14rem;
		ul{
			background: #fff;
			padding: 0 .12rem;
		}
		ul li{
			line-height: .65rem;
			border-bottom: 1px solid #ebecee;
			padding-left: .14rem;
			font-size: .14rem;
			/*text-indent: .14rem;*/
			span{
				display: inline-block;
				width: .75rem;
				margin-right: .25rem;
			}
		}
	}
	.identity ul li:last-child{
		border-bottom: none;
		position: relative;
	}
	.school{
		i{
			color: #aeaeae;
		}
		b{
			position: absolute;
			right: .19rem;
			display: inline-block;
			width: .15rem;
			height: .15rem;
		}
	}
	.pdu{
		padding: .1rem .12rem .1rem .12rem;
		font-size: .1rem;
		color: #aeaeae;
		/*margin-top: .12rem;*/
		/*line-height: .3rem;*/
		span{
			display: inline-block;
			width: .13rem;
			margin-right: .05rem;
			vertical-align: middle;
		}
	}
	.p{
		font-size: .1rem;
		color: #aeaeae;
		padding: 0 .12rem;
		margin-top: .24rem;
	}
	.pass{
			width: 3.75rem;
	    margin-top: .45rem;
	    padding: .31rem 0;
	    background: #fff;
	    .achieve{
	    	width: .88rem;
	    	font-size: .21rem;
	    	color: #464646;
	    	margin: 0 auto;
	    }
	}
	.easyui{
		color: #aeaeae;
	}
	.uncheck{
		width: 18px;
	}
</style>
