<template>
  <div>
    <headcom title="选择身份"></headcom>
    <div class="plan" style="margin-top: .5rem">
      <div class="first">
        <p class="action"><span><img src="../../assets/img/verifica/right1.png"></span></p>
        <p class="size" :class="{red:true}">选择身份</p>
      </div>
      <p class="strip" :class="{bg:state1}"></p>
      <div class="first">
        <p class="action"><span :class="{'bgchange':!state1,'change':state1}"></span></p>
        <p class="size" :class="{red:state1}">身份核验</p>
      </div>
      <p class="strip" :class="{bg:state2}"></p>
      <div class="first finish">
        <p class="action"><span :class="{'fillchange':!state2,'paschange':state2}"></span></p>
        <p class="size" :class="{red:state2}">完成</p>
      </div>
    </div>
    <verify :ifshow="flsg" :active = "active" :tach="tach"
            :takeData="takeData"
            :startTakeData="startTakeData"
            :schoolState="schoolState">
    </verify>
    <div style="display: none;" class="read" v-if="lookFalg">
      <p>
	    			<span @click="agree">
		    			<img v-if="readFalg" src="../../assets/img/verifica/unchk.png">
		    			<img v-if="!readFalg" src="../../assets/img/verifica/ok.png">
		    		</span>
        我已经阅读并同意智慧幼儿园<a @click="look">《用户协议》</a>相关服务条款。
      </p>
      <p class="sure" v-if="sureFalg">请先同意用户协议</p>
    </div>
    <div class="btn" @click="next" v-show="mode&&active">
      <p>下一步</p>
    </div>
    <div class="btn" v-show="!mode&&active" @click="fulfill">
      <p>完成</p>
    </div>
    <div class="btn" v-show="!active" @click="open">
      <p>开启智慧生活</p>
    </div>
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  import verify from "../../components/verification/verify"
  import {MessageBox,Indicator,Toast} from "mint-ui";
  import {isExist,toBind} from "../../apis/app.api"
  export default{
    //组件
    components: {
      headcom,
      verify,
      /* informa*/
    } ,
    //父组件传入的数据
    props: {} ,
    //本地数据
    data(){
      return {
        state1:false,
        state2:false,
        flsg:true,
        mode:true,//完成和下一步的状态值
        active:true, //完成的开启状态
        tach:"请选择学校",
        lookFalg:true,
        schoolState:false,
        readFalg:true,
        sureFalg:false,
        rank:"0",
        startTakeData:false,//改变开始获取信息
        takeInputData:{},
        userType:"1",	//1：app，2：微信
        meter:{}
      }
    } ,
    //方法
    methods: {
      takeData(data){
        this.meter.campusType = data.campusType;
        this.meter.studentNo = data.studentNo;
        this.meter.employNo = data.employNo;
        this.meter.userName = data.userName;
        this.meter.roleId = data.roleId;
        this.meter.userType = this.userType;
        this.meter.unionid = "";
        this.meter.schoolId = data.schoolId;
        if(this.isWx()){
          this.meter.userId = 100;
        }
        let inforId = data.roleId;
        if(data.schoolId==null||data.schoolId==""){
          Toast("请填写完整信息！");
          return;
        }else{
          if(data.roleId==1){
            if(data.studentNo==""||data.studentNo==null){
              Toast("请填写完整信息！");
              return;
            }
          }else if(data.roleId==2){
            if(data.userName==""||data.studentNo==""){
              Toast("请填写完整信息！");
              return;
            }
          }else if(data.roleId==3){
            if(data.employNo==""){
              Toast("请填写完整信息！");
              return;
            }
          }
        }
        this.toBind(this.meter);
      },
      next(){
        this.lookFalg = false;
        this.state1 = true;
        this.flsg = false;
        this.mode = false;
      },
      fulfill(){
        this.startTakeData = !this.startTakeData;
        return;
      },
      open(){
        if(this.$route.query.url=='signUpInput'){
          this.$router.push('/signUpInput?activeId='+this.$route.query.activeId);
        }else{
          this.$router.push({"name":"wisdomCampusIndex","query":{
              "mode":"open"
            }});
        }
      },
      look(){
        this.$router.push({"name":"agreement"});
      },
      agree(){
        this.readFalg = !this.readFalg;
      },
      //判断页面来源
      page(){
        if(this.$route.query.type!=undefined){
          this.lookFalg = false;
        }
        if(this.$route.query.type == 2){
          this.state1 = true;
          this.flsg = false;
          this.mode = false;
        }
        var code = JSON.parse(sessionStorage.getItem('name'));
        if(code==""||code==null){
          this.schoolState = false;
        }else{
          this.tach = code;
          this.schoolState = true;
        }
      },
      isExist(){
        Indicator.open({ spinnerType: 'fading-circle' });
        isExist({
          "areaType":"2"
        }).then((data)=>{
          Indicator.close();
          if(data.data.code == "0"){
            this.active = false;
            this.state2 = true;
            this.state1 = true;
          }else if(data.data.code == "1"){
            this.active = true;
          }else{
            MessageBox("提示",data.body.message);
          }
        },(data)=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      toBind(data){
        Indicator.open()
        toBind(data).then((data)=>{
          Indicator.close()
          if(data.body.result == "0"){
            this.active = true;
            Toast("绑定失败");
          }else if(data.body.result == "1"){
            this.state2 = true;
            this.active = false;
            sessionStorage.setItem('name',JSON.stringify("请选择学校"));
            this.active = false;
          }else{
            MessageBox("提示",data.body.message);
          }
        },(data)=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      //判断是不是微信
      isWx(){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        } else {
          return false;
        }
      }
    } ,
    //进入页面加载
    mounted () {
      window.native.ManageStatusCololr("255,255,255,1");
      console.log(this.$route.query.type);
      this.page();
      if(this.isWx()){
        this.userType = "2";
      }else{
        this.userType = "1";
      }
      //this.isExist();
    } ,
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
  .plan{
    display: flex;
    justify-content: center;
    font-size: .14rem;
    color: #aeaeae;
    margin-top: .47rem;
  .action{
    text-align: center;
  }
  .size{
    margin-top: .16rem;
  }
  .finish{
    margin-left: .1rem;
  }
  }
  .first span{
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
  }
  .red{
    margin-top: .12rem;
    color: #ff3442;
  }
  .plan .bg{
    background: #ff3442;
  }
  .strip{
    width: 0.92rem;
    height: 0.02rem;
    background-color: #aeaeae;
    border-radius: 0.01rem;
    margin-top: .16rem;
  }
  .btn p{
    width: 3.51rem;
    line-height: 0.49rem;
    background-color: #ff3442;
    border-radius: 0.04rem;
    margin: 0 auto;
    margin-top: .64rem;
    text-align: center;
    font-size: 0.18rem;
    color: #fff;
  }
  .bgchange{
    background: url(../../assets/img/verifica/Unchecked1.png);
    background-size: 100% 100%;
  }
  .fillchange{
    background: url(../../assets/img/verifica/Unchecked2.png);
    background-size: 100% 100%;
  }
  .paschange{
    background: url(../../assets/img/verifica/achieve.png);
    background-size: 100% 100%;
  }
  .change{
    background: url(../../assets/img/verifica/right2.png);
    background-size: 100% 100%;
  }
  .read{
    padding: .5rem .12rem .12rem .12rem;
    margin-bottom: -.5rem;
    font-size: .12rem;
  span{
    display: inline-block;
    width: .2rem;
    font-size: .12rem;
    vertical-align: middle;
  }
  a{
    color: #ff3442;
    text-decoration: underline;
  }
  }
  .sure{
    color: #ff3442;
    font-size: .1rem;
    text-align: center;
    margin-top: .08rem;
  }
</style>
