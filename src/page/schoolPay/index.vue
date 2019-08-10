<template>
  <div>
    <headcom title="支付详情"></headcom>
    <div class="content" style="margin-top: .4rem">
      <div class="informa">
        <div class="bottom">
          <p class="title">
            <img src="../../assets/img/schoolPay/pay.png" alt="">
            <span>账单信息</span>
          </p>
          <p class="stuinfo">交费学生：
            <span>{{payData.studentName}}</span>
          </p>
          <p class="stuinfo">所属班级：
            <span>{{payData.className}}</span>
          </p>
          <p class="stuinfo">缴费截止日期：
            <span>{{payData.endDate|timeFormatting}}</span>
          </p>
          <p class="stuinfo" v-if="payData.status != '0'">当前状态：
            <span>转账进行中</span>
          </p>
        </div>
        <p class="button">付费详情</p>
        <div class="top">
          <p class="name">{{payData.taskName}}</p>
          <p class="price">￥
            <span>{{payData.amount|currency}}</span>
          </p>
          <div class="itemCellCon">

            <div class="heightCon">
              <div class="itemCell" v-for="(item,index) in itemDetails" :key="item.index">
                <!-- <p class="itemCellIndex">{{index+1}}</p>   v-model="selectedProperties"    :value="item" -->
                <p class="itemInput"> <input  type="checkbox" v-model="selectedProperties"    :value="item" /></p>
                <p class="itemCellName">{{item.itemName}}</p>
                <p class="itemCellAmount">￥{{item.itemAmount|currency}}</p>
              </div>
            </div>
          </div>
          <div class="details">
            <span @click="detailsTextClick" class="detailsText">{{detailsText}}</span>
            <span class="drop" :class="{dropTrue:detailsTrue}"><img src="../../assets/img/schoolPay/drop.png" alt=""></span>
          </div>
        </div>
      </div>
      <p class="btn" @click="shortLogIn" v-if="payData.status == '0'">确认付款</p>
      <!-- <p class="roul">1.缴费前请确认学生信息，如信息有误，请联系班主任老师.</p>
      <p class="roul">2.如果您完成支付，请勿重复支付，支付结果将在24小时内给予确认。</p> -->
    </div>
    <div v-html="submitForm"></div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import {shortLogIn,lonIn} from "../../static/js/logIn";
  import {getFeeDetail,getFeeItemDetail,icbcPublicPayCreateOrder,icbcPublicPayPayInfo,createOrderSchool,payInfoSchool} from '../../apis/app.api.js';
  import {Indicator, MessageBox, Toast} from 'mint-ui';
  export default {
    //组件
    components: {
      headcom
    },
    filters: {
      currency: function (value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
          value = value.toString() + ".00";
          return value;
        }
        if (xsd.length > 1) {
          if (xsd[1].length < 2) {
            value = value.toString() + "0";
          }
          return value;
        }
      },
      timeFormatting(value,type) {
        //元素的补零计算
        function addZero(val){if(val < 10){return "0" +val;}else{return val;}};
        var data = new Date();
        data.setTime(value);
        var year   =  data.getFullYear();
        var month  =  addZero(data.getMonth() + 1);
        var day    =  addZero(data.getDate());
        var hour   =  addZero(data.getHours());
        var minute =  addZero(data.getMinutes());
        var second =  addZero(data.getSeconds());
        // return year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
        return year + "-"+month + "-" + day + " " ;

        //将格式化后的字符串输出到前端显示
      },
    },
    //父组件传入的数据
    props: {},
    //本地数据
    data() {
      return {
        submitForm: "",
        payData:{},
        selectedProperties: [],
        detailsText:"收起",
        detailsTrue:true,
        accountsType:null, //1、对私（原流程） 2、对公
        itemDetails:[],  //详细信息
        u:"",
        items:[],
        checked:false,
      }
    },
    //方法
    methods: {

      // xuanze(id){
      //     this.items.push(id)


      //       console.log(this.items,'-----------')

      // },

      //修改详情状态
      detailsTextClick () {
        this.detailsTrue = !this.detailsTrue;
        if(this.detailsTrue){
          var h = $(".heightCon").height();
          $(".itemCellCon").css("height",h+"px");
          this.detailsText = "收起";
        }else{
          $(".itemCellCon").css("height","0px");
          this.detailsText = "查看";
        }
      },
      //获取项目信息
      getFeeDetail() {
        console.log(this.$route.query.itemId)
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var vm = this;
        this.$getFeeDetail({
          taskId:this.$route.query.itemId
        },function (res) {
          console.log(res);
          Indicator.close();
          // console.log('63636363',this.$route.query.itemId)
          if (res.code == "000001") {
            vm.payData = res.result.list[0];
            vm.accountsType = res.result.accountsType;
            console.log('79797979', res.result);
            //  console.log('4040404',this.accountsType);
            vm.$getFeeItemDetail({
              taskId: vm.$route.query.taskId
            }, function (res) {
              console.log(res)
              if (res.code == "000001") {
                vm.selectedProperties = vm.itemDetails = res.result;
                //  this.itemDetails = data.data.result;
                console.log(vm.itemDetails, '--------')
              } else {
                MessageBox({title: res.message})
              }
            })
          } else {
            MessageBox({
              title: res.message
            })
          }
            },function (res) {
          Indicator.close();
          MessageBox({ title: "请求数据失败" })
            });
      },
      //短登录
      shortLogIn(u) {
        console.info(this.accountsType)
        if(this.selectedProperties.length==0){
          Toast('请勾选要选择缴费的项目');
          return false;
        }
        lonIn((data)=>{
          let result = data.data.result;
          if(data.data.code == "000001"){
            console.log(result)
            // if(result.userlevel === '1'){
              shortLogIn("",(data)=>{
                console.log(data);
                if(data.code == "0"){
                  const result = data.data;
                  console.log("1.回调短登录",result);
                  if (this.accountsType === "1") {
                    this.pay(); //对私
                  }else if(this.accountsType === "2"){
                    this.pay2();//对公
                  }
                }else {
                  MessageBox({title:"登录失败"});
                }
              })
            // }else{
            //   MessageBox({
            //     title: '提示',
            //     message:'仅支持激活智慧校园卡后使用，</br>请进入【我的】激活智慧校园卡',
            //   });
            // }
          }else{
            MessageBox({
              title: result.messages
            });
            // 判断支付是否成功并跳转成功页面
            if(data.data.code == "000001" && this.payData.status==1){
              this.$router.push({
                path:'/Paysess',
                query:{
                  itemId: u.taskId,
                  payData:u.payData
                }
              })
            }
          }
        })
      },
      //缴费
      pay() {
        let ids=[],money=0;
        for(let item of this.selectedProperties){
          ids.push(item.itemId);
          money=money+item.itemAmount*100;
        }
        console.log(this.selectedProperties)
        //创建定单
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var vm = this;
        this.$createOrderSchool({"itemId":ids.join(','),
          "accountsCode": this.payData.accoutsCode,
          "taskId": this.payData.taskId,
          "schoolId": this.payData.schoolId,
          "studentName": this.payData.studentName,
          "studentNo": this.payData.studentNo,
          "studentId": this.payData.studentId,
          "itemAmount": (money/100)+''
        },function (res) {
          Indicator.close();
          if (res.code == "000001") {
            let orderId = res.result;
            vm.payInfoSchool(orderId);
          } else {
            MessageBox({
              title: res.message
            })
          }
        },function (res) {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          })
        })
      },
      //拿订单号获取支付信息
      payInfoSchool(orderId) {
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var vm =this;
        this.$payInfoSchool(orderId,function (res) {
          Indicator.close();
          if (res.code == "000001") {
            let result = JSON.parse(res.result);
            console.log(result.result);
            vm.submitForm = result.result;
            setTimeout(() => {
              document.forms[0].submit();
            }, 0);
          } else if (res.code == "000003") {
            MessageBox({
              title: "该功能仅支持实名用户使用"
            })
          } else {
            MessageBox({
              title: res.message
            })
          }
        },function (res) {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          });
        })
      },
      isAndroid: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        return isAndroid
      },
      //拿订单号获取支付信息(对公)
      payInfoSchool2:function(orderId) {
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var vm = this;
        this.$icbcPublicPayPayInfo(orderId,function (res) {
          Indicator.close();
          if (res.code == "000001") {
            // var url = location.origin + "/html/smartCampuskdg/icbcPay/smartCampusPublic.html?orderId=" + orderId;
            // http://sckdg.xuebank.com/html/smartCampuskdg/index.html#/?mode=open  ?index='+result.result
            let result = JSON.parse(res.result);
            var url = location.origin+'/html/smartCampuskdg/index.html#/orderpay?index='+result.result;
            console.log(url,'-----------0000000')
            if(vm.isAndroid()){
              window.native.AndroidPayForICBCWebView(url);
              // this.$router.push(url);
            }else {
              window.native.PayForICBCWebView(url);
              // this.$router.push(url);
            }
            // let result = JSON.parse(data.data.result);
            //   console.log(result.result);
            //   this.submitForm = result.result;
            //   setTimeout(() => {
            //     document.forms[0].submit();
            //   }, 0);
          } else if (res.code == "000003") {
            MessageBox({
              title: "该功能仅支持实名用户使用"
            })
          }
          else {
            MessageBox({
              title: res.message
            })
          }
        },function (res) {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          });
        })
      },
      //缴费(对公)
      pay2() {
        //创建定单
        let ids=[]
        for(let item of this.selectedProperties){
          ids.push(item.itemId);
        }
        Indicator.open({ spinnerType: 'fading-circle' });
        var ua = navigator.userAgent;
        var sceneType=null;
        if (ua.indexOf('iPhone') > -1) {
          sceneType = "21";
        }else if(ua.indexOf('Android') > -1){
          sceneType = "22";
        }else {
          sceneType = "10";
        }
        var vm = this;
        this.$icbcPublicPayCreateOrder({
          "itemId":ids.join(','),
          "computeId": sceneType,
          "busiCode": this.payData.busiCode,
          "taskId": this.payData.taskId,
          "schoolId": this.payData.schoolId,
          "studentId": this.payData.studentId,
          "itemAmount": this.payData.amount
        },function (res) {
          Indicator.close();
          if (data.data.code == "000001") {
            let orderId = data.data.result;
            this.payInfoSchool2(orderId);

          } else {
            MessageBox({
              title: data.data.message
            })
          }
        },function (res) {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          });
        })
      },
    },
    //进入页面加载
    mounted() {
      console.log(this.items,'77777777----------')
      this.getFeeDetail();
    },
    //监控数据变化
    watch: {
      selected: function (v) {

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  img {
    width: 100%;
  }
  .content {
    padding: .12rem;
  }
  .btn {
    line-height: .5rem;
    background: rgb(255,123,123);
    border-radius: .06rem;
    text-align: center;
    color: #fff;
  // font-size: .21rem;
    font-size: .16rem;
    margin-top: .2rem;
    font-family: SourceHanSansCN-Regular;
  }

  .roul {
    font-size: .12rem;
    color: #aeaeae;
    margin-top: .03rem;
  }
  .informa {
    background: #fff;
  .top {
    padding: .18rem 0;
  // background: #69c9ff;
    border-top-left-radius: .06rem;
    border-top-right-radius: .06rem;
  p {
    text-align: center;
  // color: #fffefe;
    color: rgb(67,67,67);
    font-size: .15rem;
  }
  .name {
    font-size: .18rem;
    font-family: SourceHanSansCN-Regular;

  }
  .price {
  // font-size: .21rem;
    font-size: .3rem;
    margin: .15rem 0 .13rem 0;
    color: rgb(255,156,156);
  }
  }

  }
  .bottom {
    padding: .12rem .12rem;
    border-bottom-left-radius: .06rem;
    border-bottom-right-radius: .06rem;
  //
  .title{
    margin-bottom: .12rem;
  >img{
    width: .13rem;
    height: .15rem;
    vertical-align: middle;
    padding-right: .09rem;
  }
  >span{
    font-size: .16rem;
    font-family:SourceHanSansCN-Regular ;
  }
  }
  .stuinfo {
    line-height: .3rem;
    font-size: .15rem;
    color: rgb(67,67,67);
  // color: #aeaeae;
    font-family:SourceHanSansCN-Regular;
  span {
    font-size: .15rem;
    color: #464646;
  }
  }

  }
  .button{
    font-size: .16rem;
    border-radius: .06rem;
    margin-top: .2rem;
    width: 3.51rem;
    height: .5rem;
    background:rgb(255,156,156);
    color: #fff;
    text-align: center;
    line-height:.5rem;
    margin: 0 auto;
    margin-bottom:.2rem ;
    font-family: SourceHanSansCN-Regular;
  }
  .itemCellCon{
    transition: .5s all;
  // height: 0;
    overflow: hidden;
  .itemCell{
    display: flex;
    padding: 0 .12rem;
  .itemCellIndex,.itemCellName,.itemInput{
    text-align: left;
    flex: 1;
  }
  .itemInput{
    padding-top: 5px;
  /* input[checked=checked]{
     background: url("../assets/istrue.png")no-repeat center;
     background-size: 15px;
   }*/
  input[type='checkbox']:checked{
    background: url("../../assets/img/istrue.png")no-repeat center;
    background-size: 20px;
  }
  input[type='checkbox']{
    width: 20px;
    height:20px;
    background-color: #fff;
    -webkit-appearance:none;
    border: 1px solid #c9c9c9;
    border-radius: 10px;
    outline: none;
    color: #222;
  }
  }
  .itemCellName{
    flex: 2;
  }
  .itemCellAmount{
    text-align: right;
    flex: 1;
  }

  }
  }
  .itemCellConTrue{
    height: 300px;
  }
  .details{
    color: #FFF;
    font-size: .12rem;
    text-align: right;
    padding: .12rem .12rem 0;

  .detailsText{
    font-size: .13rem;
    margin-right: .04rem;
    color: rgb(255,156,156);
  }
  .drop{
    width: .12rem;
    display: inline-block;
    transform: rotate(0deg);
    transition: .5s all;
  img{
    width: 100%;
    vertical-align: middle;
    display: inline-block;
  }
  }
  .dropTrue{
    transform: rotate(-180deg);
  }
  }
</style>
