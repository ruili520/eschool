<template>
    <div class="navigation">
      <div class="navigationLife" >
        <span class="iconfont" @click="goBack">&#xe615;</span>
        <!--<span class="iconfont" @click="close" style="margin-left: .2rem">&#xe633;</span>-->
      </div>
      <div class="navigationCentre">
        <!--<div class="title">{{title}}</div>-->
      </div>
      <div class="navigationRight">
        <div class="perch">
          <div class="menu" @click="menuClick">
            <img src="../../assets/img/add.png" alt="身份">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import{ getBindedInfo } from "../../apis/app.api";
    export default{
      //父组件传入的数据
      props: {
        title:String,
        menu:{//分享按钮
          type:Boolean,
          default: false
        },
        backColor: {
          type:String,
          default: "#fff"
        }
      } ,
      //本地数据
      data(){
          return {}
      } ,
      //方法
      methods: {
        goBack: function (){
          window.native.PopViewController();
          // if(location.href.indexOf("mode=open")> -1){
          //   this.close();
          //   return
          // }
          // history.go(-1);
          // return
        },
        //关闭按钮
        close(){
          window.native.PopViewController();
        },
        menuClick(){
          var vm = this;
          this.$getBindedInfo({},function (res) {
            console.log(res)
            if(res.code == "000001") {
              let role='';
              if(res.result.length!=0){
                role= res.result[0].roleId
              }
              if(!role){
                vm.$router.push('/school');
              }else if(role=='2'){
                vm.$router.push('/identity');
              }else if(role=='3'){
                vm.$router.push('/teacherMessage');
              }
            }else {
              vm.$messagebox("提示", res.message);
            }
          },function (res) {
            vm.$messagebox("提示", "数据请求失败");
          })
        }
      } ,
      //进入页面加载
      mounted () {},
      //计算属性
      computed: {},
      //监控数据变化
      watch: {}
    }
</script>

<style lang="less" scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 466348 */
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot');
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.woff') format('woff'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:.16rem;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .navigation{
    display: flex;
    position: fixed;
    top:0;
    left: 0;
    width:100%;
    justify-content: space-between;
    align-items: center;
    height: .44rem;
    padding: 0 .12rem;
    z-index: 9999;
    box-sizing: border-box;
    background-color:rgba(0,0,0,0);
    color: #fff;
  }
  .navigationLife,.perch,.inputButton{
    width: .6rem;
    display: block;
  }
  .navigationLife span{
    line-height: .22rem;
    position: relative;
    top: 1px;
  }
  .navigationLife img{
    width: .16rem;
    vertical-align: middle;
  }
  .navigationCentre{
    flex: 1;
    text-align: center;
    .title{
      font-size: .18rem;
    }
  }
  .navigationCentre .seek{
    line-height: .3rem;
    background-color: #fff;
    border-radius: .2rem;
    text-align: left;
    padding-left: .1rem;

    background-color: #f7f7f7;
  }
  .navigationCentre .seek img{
    width: .2rem;
    vertical-align: middle;
  }
  .navigationCentre .seek input{
    width:80%;
    background:none;
    outline:none;
    border:0px;
    /*text-indent: 1em;*/
  }
  .navigationRight{
    .inputButton{
      text-align: center;
    }
  }
  .perch{
    display: flex;
    justify-content: flex-end;
  }
  .collect,.share,.menu{
    margin-left: .2rem;
    width:.2rem;
    img{
      vertical-align: bottom;
      width:100%;
    }
  }
  .collect{
    margin-left: 0;
  }

  .menuListCon{
    position: fixed;
    top:.5rem;
    right:.1rem;
    z-index: 999;
    width: 1.1rem;
    border-radius: .05rem;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 0 3px #aaa;
    padding:.05rem .05rem .05rem .1rem;
  }
</style>
