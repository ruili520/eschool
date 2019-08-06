<!--商城测试页-->
<template>
  <div>
    <div>这是一个功能测试页面</div>
    <mt-button @click="getCity">获取定位</mt-button><input v-model="city"><br>
    <mt-button @click="OpenQRCodeScanner">调用二维码</mt-button><br>
    <mt-button @click="Opentell(18737015525)">打电话</mt-button><br>
    <mt-button @click="DeviceType">获取设备类型</mt-button><br>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        city:''
      }
    },methods:{
      getCity(){
        window.native.getCity(data => {
          console.log(JSON.parse(data).data)
          this.city=JSON.parse(data).data.locality;})
      },
      OpenQRCodeScanner(){
        window.native.OpenQRCodeScanner(data=>{})
    },
      Opentell(){
        window.native.OpenTelephone('18737015525')
      },
      DeviceType(){
        window.native.DeviceType(data=>{
          console.log("设备类型",data)
        })
      }
    }
  }
</script>
