<template>
  <div>
    <div class="nav">
      <!-- <img src="./../assets/memberCentre/head.jpg" alt=""> -->
      <div class="goback">
          <span class="iconfont" @click="goback">
            &#xe615;
          </span>
        <span class="iconfont" @click="close" style="margin-left:.08rem;">
            &#xe633;
          </span>
      </div>
      <div class="navTitle">校园监控</div>
      <div class="medal" @click="LinkMedal"></div>
    </div>

    <div class="user" style="margin-top: .4rem">
      <div class="userInfor">
        <img @click="linkRecharge" class="payIcon" src="../../assets/img/memberCentre/payIcon.png" alt="">
        <p class="portrait"><span><img :src="port"></span></p>
        <p class="name">{{username}}</p>
        <p class="stop">截止至{{stopTime}}会员到期</p>
        <p class="stop">（剩余{{surplusTime}}分钟未观看）</p>
        <div class="contact">
          <p><i><img src="../../assets/img/memberCentre/vip.png"></i><span> 银校通会员</span></p>
          <p class="phone"><i><img src="../../assets/img/memberCentre/user.png"></i><span>{{telephone}}</span></p>
        </div>
      </div>
    </div>

    <div class="rechargeCon">
      <ul v-for="(list,index) in imgData">
        <li v-for="(item,id) in list" @click="member(item.itemAmout,index,id,item.id)">
          <p class="caption">{{item.itemName}}</p>
          <div class="round" :class="{red:item.state}">
            <p class="price">￥{{item.itemAmout}}</p>
            <p class="time">可观看时间{{item.itemTime}}分钟</p>
          </div>
          <span class="mark" v-if="item.state"><img src="../../assets/img/schoolfees/sess.png"></span>
        </li>
      </ul>
    </div>
    <div class="paymentCon">
      <div class="payment" v-for="(item, index) in payList" @click="switchoverPay(item.id,index)">
        <p class="left"><span></span>{{item.name}}</p>
        <p><span><img class="pitch" :class="{chosered:item.state}" src="../../assets/img/schoolfees/duihao.png"></span></p>
      </div>
      <p class="other" v-if="false">其他支付方式<span><img src="../../assets/img/memberCentre/up.png"></span></p>
    </div>

    <div class="payButton">
      <p @click="pay">立即支付{{money}}元</p>
    </div>

    <!--支付提交的表单-->
    <div v-show="false" id="pay">
      <form id="icbcPay" name="icbcPay" action="https://mywap2.icbc.com.cn/ICBCWAPBank/servlet/ICBCWAPEBizServlet"
            method="post">
        <input id="interfaceName" name="interfaceName" type="text" v-model="interfaceName" size="120">
        <input id="interfaceVersion" name="interfaceVersion" type="text" v-model="interfaceVersion" size="120">
        <textarea id="tranData" name="tranData" cols="120" rows="5">{{tranData}}</textarea>
        <input id="merSignMsg" name="merSignMsg" type="text" size="120" v-model="signMsg">
        <input id="merCert" name="merCert" type="text" size="120" v-model="certs">
        <input id="clientType" name="clientType" type="text" v-model="clientType">
        <!--<input type="submit" value=" 提 交 订 单 ">-->
      </form>
    </div>
    <!--<schoolpag :show = show v-on:total="child"  :money="money"></schoolpag>-->
  </div>
</template>

<script>
  // import HeaderComponent from './components/header.vue'
  import schoolpag from "../../components/schoolpag";
  import {Toast, MessageBox, Indicator} from 'mint-ui';
  import {
    selectKdgVipUserInfo,getKdgVipItemListBySchoolId,
    createOrder,payInfo,wechatpayInfo
  } from "../../apis/app.api"
  import {shortLogIn,lonIn} from "../../static/js/logIn";


  export default {
    //组件
    components: {
      schoolpag
    },
    //父组件传入的数据
    props: {},
    //本地数据
    data(){
      return {
        imgData: [],
        payList: [
          {"name": "e支付", "state": true, "id": 1},
          {"name": "微信支付", "state": false, "id": 2}
        ],
        money: "",//订单金额
        show: false,
        username: "",
        stopTime: "", //截止日期
        telephone: "",
        port: "", //用户头像
        schoolId: null, //学校id
        surplusTime: "", //剩余观看时间
        payId: "1", //支付方式，e支付：，微信：
        itemId: "", //订单id
        interfaceName: "", // 支付的数据
        interfaceVersion: "", // 支付的数据
        tranData: "", // 支付的数据
        signMsg: "", // 支付的数据
        certs: "", // 支付的数据
        clientType: "", // 支付的数据
      }
    },
    //方法
    methods: {
      linkRecharge: function () {
        this.$router.push({"name": "recharge"});
      },
      //选择会员
      member: function (data, index, id, itemId) {
        this.itemId = itemId;//订单id
        this.money = data;//订单金额
        var vipData = this.imgData;
        $.each(vipData, function (i) {
          $.each(vipData[i], function (j) {
            vipData[i][j].state = false;
          });
        });
        this.imgData[index][id].state = true;

      },
      //立即支付
      pay() {
        lonIn((data)=>{
          if(this.payId=='1'){
            let result = data.data.result;
            if(data.data.code == "000001"){
              if(result.userlevel === '0'){
                this.createOrder();
              }else{
                MessageBox({
                  title: '提示',
                  message:'仅支持激活智慧校园卡后使用，</br>请进入【我的】激活智慧校园卡',
                });
              }
            }else{
              MessageBox({
                title: result.messages
              });
            }
          }else {
            this.createOrder();
          }
        });
      },
      close: function () {
        window.native.PopViewController();
      },
      goback: function () {
        if (localStorage.videoPay == undefined) {
          this.$router.push({
            "name": "wisdomCampusIndex", "query": {
              mode: "open"
            }
          });
          return false
        }
        if (location.href.indexOf("mode=open") > -1) {
          this.close();
          return false
        }
        history.go(-1);
        return false
      },
      LinkMedal: function () {
        console.log("LinkMedal");
      },
      //切换支付方式
      switchoverPay: function (code, index) {
        this.payId = code;
        var pay = this.payList;
        $.each(pay, function (i) {
          pay[i].state = false;
        });
        pay[index].state = true;
      },
      //获取会员信息
      selectKdgVipUserInfo: function (data) {
        Indicator.open({spinnerType: 'fading-circle'});
        selectKdgVipUserInfo().then((data)=> {
          Indicator.close();
          if (data.body.code == "000001") {
            var vipData = data.body.result;
            console.log(vipData);
            var reveTime = vipData.remainderTime;
            if (reveTime.indexOf(".") > -1) {
              reveTime = reveTime.substr(0, reveTime.indexOf(".") + 3);
            } else {
              reveTime = vipData.remainderTime;
            }
            this.stopTime = this.formatDate(new Date(vipData.ipcEndDate));
            this.telephone = vipData.phoneNumber;
            this.username = vipData.userName;
            if (vipData.headimg == "" || vipData.headimg == null) {
              this.port = require("../../assets/img/schoolfees/title.png");
            } else {
              this.port = vipData.headimg;
            }
            this.surplusTime = reveTime;
          } else {
            MessageBox("提示", data.body.message);
          }
        }, (data)=> {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      //获取会员列表
      getKdgVipItemListBySchoolId: function (data) {
        Indicator.open({spinnerType: 'fadizng-circle'});
        getKdgVipItemListBySchoolId({
          id: this.schoolId
        }).then((data)=> {
          Indicator.close();
          console.log(data)
          if (data.body.code == "000001") {
            var vipList = data.body.result;
            console.log(vipList);
            var menu = [];
            var allData = [];
            var length = vipList.length;
            console.log(length);
            $.each(vipList, function (i) {
              menu.push({
                "itemAmout": vipList[i].itemAmout,
                "itemName": vipList[i].itemName,
                "state": false,
                "itemTime": vipList[i].itemTime,
                "id": vipList[i].id,
                "itemType": vipList[i].itemType,
              });
              if (i % 2) {
                console.log(menu)
                allData.push(menu);
                menu = [];
              }
              ;
              if (length % 2) {
                if (i == length - 1) {
                  allData.push(menu);
                  menu = [];
                }
              }
            });
            //列表的默认值
            this.imgData = allData;
            this.imgData[0][0].state = true;
            this.money = this.imgData[0][0].itemAmout;
            this.itemId = this.imgData[0][0].id;

          } else {
            MessageBox("提示", data.body.message);
          }
        }, (data)=> {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      isAndroid: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        return isAndroid
      },
      //创建会员订单
      createOrder(data) {
        Indicator.open({spinnerType: 'fading-circle'});
        createOrder(
          {"itemId": this.itemId, "orderAmountStr": this.money}
        ).then((data)=> {
          Indicator.close();
          if (data.body.code == "000001") {
            let orderId = data.data.result;
            if(this.payId == '1'){
              shortLogIn("", (data)=> {
                if (data.code == "0") {
                  const result = data.data;
                  this.ifPayType(orderId);
                } else {
                  MessageBox({title: "登录失败"});
                }
              })
            }else{
              this.wechatpayInfo(orderId);
              //this.ifPayType(orderId);
            }
          } else {
            MessageBox("提示", data.body.message);
          }
        }, (data)=> {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      },
      //判断支付方式
      ifPayType: function (orderId) {
        var url = location.origin + "/html/smartCampuskdg/icbcPay/smartCampusIndex.html?orderId=" + orderId;
        if(this.isAndroid()) {
          //android支付
          window.native.AndroidPayForICBCWebView(url);
          //this.payInfo(orderId);（原先的方式）
        }else{
          // ios的支付（因为需要打开工行的webview，所以版本在转接页面处理了--icbcPay项目）
          window.native.PayForICBCWebView(url);
        }
        MessageBox({
          title: '提示',
          message: '如您已完成支付，请点击我已支付！',
          showCancelButton: true,
          confirmButtonText: "我已支付",
          cancelButtonText: "取消"
        }).then(action=> {
          if (action === "confirm") {
            console.log("点击了确定");
            this.$router.push({"name": "recharge"});
          } else if (action === "cancel") {
            console.log("点击了取消");
          }
        });
      },
      //工银e支付
      payInfo: function (orderId) {
        Indicator.open({spinnerType: 'fading-circle'});
        payInfo(orderId).then((data)=> {
          Indicator.close();
          if (data.data.code == "000001") {
            var payData = data.body.result;
            this.interfaceName = payData.interfaceName;
            this.interfaceVersion = payData.interfaceVersion;
            this.tranData = payData.tranData;
            this.signMsg = payData.merSignMsg;
            this.certs = payData.merCert;
            this.clientType = payData.clientType;

            setTimeout(function () {
              $("#icbcPay").submit();
            }, 0);
          } else {
            MessageBox("提示", data.data.message);
          }
        }, ()=> {
          Indicator.close();
          MessageBox("提示", "数据请求失败");
        })
      },
      //微信支付
      wechatpayInfo: function (orderId) {
        var sceneType = null;
        var ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > -1) {
          sceneType = "IOS";
        } else if (ua.indexOf('Android') > -1) {
          sceneType = "Android";
        } else {
          sceneType = "Wap";
        }
        let inData = {
          orderId: orderId,
          sceneType: sceneType,
          source: "kdg",  //source来源：kdg=幼儿园 dx=大学
          version: "1"
        };
        Indicator.open({spinnerType: 'fading-circle'});
        wechatpayInfo(inData).then((data)=> {
          Indicator.close();
          if (data.data.code == '000001') {
            var result = data.data.result;
            location.href = result.url;
          } else {
            MessageBox('提示', data.data.message);
          }
        }, ()=> {
          Indicator.close();
          MessageBox('提示', '数据请求失败');
        })
      },
      //时间格式化
      formatDate: function (date) {
        let Year = date.getFullYear();
        let Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        let Date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let Hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let Minut = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return Year + "-" + Month + "-" + Date + " " + Hours + ":" + Minut;
      },
      //获取url后的id
      getParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
      }
    },
    //进入页面加载
    mounted () {
      this.schoolId = this.$route.query.schoolId;
      this.selectKdgVipUserInfo();
      this.getKdgVipItemListBySchoolId();
      if (this.schoolId == 18) {//限制莱芜幼儿园只有一种支付方式
        this.payList = [{"name": "e支付", "state": true, "id": 1}]
      }
    },
    //计算属性
    computed: {},
    //监控数据变化
    watch: {}

  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  @font-face {
    font-family: 'iconfont';  /* project id 466348 */
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot');
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.woff') format('woff'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: .16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    width: 100%;
  }

  p {
    text-align: center;
  }

  .nav {
    width: 100%;
    position: fixed;
    top: 0;
    height: .46rem;
    z-index: 1000;
    background-image: linear-gradient(90deg, #f53b49, #f56f6f);
  }

  .nav .navTitle {
    color: #fff;
    line-height: .44rem;
    text-align: center;
    font-size: .18rem;
  }

  .nav img {
    width: 100%;
    display: block;
  }

  .nav .goback, .nav .medal {
    position: absolute;
    width: .7rem;
    height: 100%;
    top: 0;
  }

  .nav .goback {
    left: 0;
    color: #fff;
    line-height: .44rem;
  }

  .nav .goback span {
    color: #fff;
    line-height: .44rem;
    height: .44rem;
    padding-left: .12rem;
  }

  .nav .medal {
    right: 0;
  }

  .user {
    padding: 0 .23rem .1rem .23rem;
    background: url(../../assets/img/schoolfees/top.png) no-repeat;
    background-size: 100%;
  }

  .userInfor {
    position: relative;
    /*background: #fff;*/
    border-radius: .06rem;
    /*box-shadow: 0rem 0.03rem 0.1rem 0rem rgba(200, 15, 28, 0.31);*/
    padding-bottom: .12rem;
    background: url(../../assets/img/schoolfees/bag.png) no-repeat;
    background-size: 100% 100%;

  .portrait {
    text-align: center;

  span {
    margin-top: .13rem;
    display: inline-block;
    width: 0.52rem;
    height: 0.52rem;
    background-color: #fff;
    border: 3px solid #ff5763;
    border-radius: 50%;
  }

  }
  .name {
    margin: .12rem 0 .1rem 0;
    font-size: .18rem;
    color: #595050;
  }

  .stop {
    font-size: .1rem;
    color: #b1b1b1;
  }

  }
  .userInfor .payIcon {
    width: .24rem;
    height: .24rem;
    position: absolute;
    top: .12rem;
    right: .12rem;
  }

  .contact {
    display: flex;
    justify-content: center;
    font-size: .1rem;
    color: #ff8e93;
    margin-top: .12rem;

  p i {
    display: inline-block;
    width: .18rem;
    height: .18rem;
    vertical-align: middle;
    margin-right: .1rem;
  }

  .phone {
    margin-left: .5rem;
  }

  }
  .rechargeCon {
    padding: 0 .24rem;

  ul {
    display: flex;
    justify-content: space-between;

  }

  ul li {
    position: relative;
    margin-top: .12rem;
    width: 1.57rem;
    box-shadow: 0rem 0.03rem 0.1rem 0rem rgba(200, 15, 28, 0.31);

  .caption {
    width: 1.57rem;
    line-height: 0.48rem;
    background-color: #ff5e66;
    border-top-left-radius: .04rem;
    border-top-right-radius: .04rem;
    font-size: .15rem;
    color: #fff;
  }

  .round {
    font-size: .1rem;
    color: #f54c54;
    padding-bottom: .12rem;
    background: #fff;
    border-bottom-left-radius: .04rem;
    border-bottom-right-radius: .04rem;

  .price {
    font-size: .21rem;
    padding: .11rem 0;
  }

  .time {
    color: #dedede;
  }

  }
  .red {
    color: #fff;
    background: #ff5e66;
  }

  }
  ul li:nth-child(Odd) {
    margin-right: .12rem;
  }

  }
  .paymentCon {
    float: left;
    width: 100%;
    margin: .12rem 0;
    font-size: .12rem;
    color: #ff5e66;

  .payment {
    line-height: 0.4rem;
    padding: 0 .12rem;
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #eee;
  }

  .left {

  span {
    display: inline-block;
    width: 0.03rem;
    height: 0.14rem;
    background-color: #ff6f76;
    vertical-align: middle;
    margin-right: .13rem;
  }

  }
  }
  .other {
    color: #929292;
    line-height: 0.3rem;
    background-color: #ffffff;

  span {
    display: inline-block;
    width: .13rem;
    height: .13rem;
    margin-left: .05rem;
  }

  }

  .checked {
    width: .2rem;
    height: .2rem;
    margin-right: .12rem;
    border: 1px solid #ff3442;
    border-radius: 50%;
  }

  .checked img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .border0 {
    border: 0px;
  }

  .payButton {
    float: left;
    width: 100%;
    text-align: center;
    line-height: .44rem;
    color: #fff;

  p {
    margin: 0 .12rem .14rem .12rem;
    background: #ff5e66;
    border-radius: .05rem;
  }

  }
  .mark {
    position: absolute;
    right: -.06rem;
    bottom: -.08rem;
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
  }

  .pitch {
    display: inline-block;
    width: 0.15rem;
    height: 0.15rem;
    border: solid 0.01rem #ff5e66;
    border-radius: 50%;
    vertical-align: middle;
  }

  .chosered {
    background: #ff5e66;
  }


</style>
