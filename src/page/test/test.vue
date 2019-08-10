<!--商城测试页-->
<template>
  <div>
    <div style="margin-top: 10px;font-size: 16px">
      <div style="text-align: center;" @click="goback">这是一个功能测试页面</div>
    </div>
    <div style="text-align: center;line-height: 30px">
      <div style="width: 30%;float: left">{{data1}}</div>
      <div style="width: 30%;float: left">{{data2}}</div>
      <div style="width: 30%;float: left">{{data3}}</div>
    </div>
    <div style="margin: auto 4%">
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff" @click="getCity">定位</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff" @click="OpenQRCodeScanner">二维码</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">二相册</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">打电话</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">颜色</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff" @click="loginIn">登录</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff" @click="shareClick">分享</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">网络</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff" @click="CacheUserInfo">元宝</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">系统</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">手机</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">UUID</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">运营商</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff">版本号</mt-button>
      <mt-button style="width: 30%;margin-top: 5px;background-color: #26a2ff" @click="openNew">新页</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        data1:'1',
        data2:'2',
        data3:'3'
      }
    },methods:{
      goback(){
        this.$router.push('/index')
      },
      shareClick:function(){
        console.log(this.collegeNo,this.userid);
        //console.log("qqqqq");
        //console.log(location.href+"?collegeNo="+this.collegeNo+"&userid="+this.userid);
        window.native.ShareByUI({
          title :"元宝财富排行",
          content:"下载工银e校园，领取元宝兑换奖品",
          urlStr :'https://www.baidu.com',
          image :"https://xuebankoss.oss-cn-shanghai.aliyuncs.com/xuebank_pro/feedback/20180326/201803261019071561_20180326101718.jpg"
        })
      },
      getCity(){
        window.native.getCity(data => {
            let cityData = JSON.parse(data);
            this.data1 = cityData;
            console.log(cityData)
        })
      },
      loginIn(){
        window.native.LoginStatus(data=>{
          this.data2 = data;
          console.log(data)
        })
      },
      OpenQRCodeScanner(){
        window.native.OpenQRCodeScanner(data=>{})
      },
      OpenQRCodeReader(){
        window.native.OpenQRCodeReader(data=>{})
      },
      CacheUserInfo(){
        window.native.LoginStatus(data=>{
          window.native.CacheUserInfo(data.body)
          this.data2 = data;
          console.log(data)
        })
      },
      Opentell(){
        window.native.OpenTelephone('18737015525')
      },
      DeviceType(){
        window.native.DeviceType(data=>{
          console.log("设备类型",data)
        })
      },
      openNew(){
        window.native.RetainNavigationBar(
          {
            webUrl:'https://www.baidu.com',
            isReload:true,
            title:"测试页面"
          }
        )
      }
    }
  }
</script>
