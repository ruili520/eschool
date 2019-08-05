<!--助力考页面-->
<template>
  <div>
    <div class="header">
      <div class="goBack">
        <span class="iconfont" @click="goBack">
            &#xe615;
          </span>
      </div>
      <div class="seekConent" style="margin: 0 auto;font-family: PingFangSC-Semibold, sans-serif;font-size: 19px;color: #607483">
        <p>助力考</p>
      </div>
    </div>
    <div style="margin-top: 44px;">
      <div v-if="mall_domain_ignore" style="text-align: center;color: #26a2ff;line-height: 300px">商城页面测试，正在完善。。。</div>
      <iframe  id="iframe" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
  import {lonIn,shortLogIn} from "../../static/js/logIn";
  import { neigouLogin } from '../../apis/app.api.js';
  export default {
    name:'',
    data(){
      return{
        mall_domain_ignore:false
      }
    },
    methods:{
      getuserData(){
        this.mall_domain_ignore = true
        var vm =this;
        lonIn((data)=>{
          console.log(data)
          this.$MallLogin({
            "userId":data.data.result.userIdStr
          },function (res) {
              vm.mall_domain_ignore = false
              const oIframe = document.getElementById('iframe');
              oIframe.src=res
            },function (res) {
              const oIframe = document.getElementById('iframe');
              oIframe.src="http://eschool.uchung.com/test"
            })
        })
      },
      goBack(){
        window.native.PopViewController();
      },
      test(){
        window.native.LoginStatus();
      }
    },
    // created(){
    //   sessionStorage.setItem('test',true)
    // },
    mounted() {
      // <!--* iframe-宽高自适应显示-->
      const oIframe = document.getElementById('iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
      oIframe.style.height = (Number(deviceHeight)-44) + 'px'; //数字是页面布局高度差
      console.log(this.$route.query.mall_domain_ignore)
      if(this.$route.query.mall_domain_ignore == "true"){
        this.mall_domain_ignore = true;
      }else {
        this.getuserData();
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  iframe{
    width: 100vw;
  }
  @font-face {
    font-family: 'iconfont';
    /* project id 466348 */
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot');
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.woff') format('woff'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.ttf') format('truetype'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: .16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .header {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: .44rem;
    padding: 0 .12rem;
    background-color: #fff;
    z-index: 9999;
    box-sizing: border-box;
    color: #333;
  }

  /*.goBack {*/
  /*width: .6rem;*/
  /*}*/

  .goBack img {
    width: .18rem;
    vertical-align: middle;
    margin-bottom: .03rem;
  }

  .goBack span {
    line-height: .3rem;
  }
  .seekConent{
    text-align: center;
  }
</style>

