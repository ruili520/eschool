<template>
  <div>
    <headcom title="账单详情"></headcom>
    <div class="content" style="margin-top: .4rem">
      <div class="informa">
        <div class="bottom">
          <p class="stuinfo">付款学生：
            <span>{{payData.studentName}}</span>
          </p>
          <p class="stuinfo">付款金额：
            <span class="money" style="font-size:.18rem;color: rgb(255, 156, 156);font-weight:600;">{{payData.amount|currency}}</span>
          </p>

        </div>
        <p class="button">费用详情：</p>
        <div class="top">
          <div class="itemCellCon">

            <div class="heightCon">
              <div class="itemCell" v-for="(item,index) in itemDetails" :key="item.index">
                <p class="itemCellName">{{item.itemName}}</p>
                <p class="itemCellAmount">￥{{item.itemAmount|currency}}</p>
              </div>
            </div>
          </div>
        </div>
        <p class="stuinfo" style="margin-left:.12rem;margin-top: .16rem;">交易单号
          <span style="float:right;margin-right:.12rem">{{payData.orderId }}</span>
        </p>
        <p class="stuinfo" style="margin-left:.12rem;margin-top: .16rem;">交易时间
          <span  style="float:right;margin-right:.12rem">{{payData.payDate | timeFormatting }}</span>
        </p>
      </div>
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
        return year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
        // return year + "-"+month + "-" + day + " " ;

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
        itemDetails:[]  //详细信息
      }
    },
    //方法
    methods: {
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
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        getFeeDetail({
          taskId:this.$route.query.itemId
        }).then((data)=>{
          Indicator.close();
          // console.log('63636363',this.$route.query.itemId)
          if (data.data.code == "000001") {
            this.payData = data.data.result.list;
            this.accountsType = data.data.result.accountsType;
            console.log('79797979',this.payData);
            console.log('4040404',this.accountsType);
            getFeeItemDetail({
              taskId:this.$route.query.itemId
            }).then((data)=>{
              if(data.data.code == "000001"){
                this.selectedProperties = this.itemDetails = data.data.result;
              }else{
                MessageBox({title: data.data.message})
              }
            })
          } else {
            MessageBox({
              title: data.data.message
            })
          }
        },()=>{
          Indicator.close();
          MessageBox({ title: "请求数据失败" })
        })
      },
      //短登录
      shortLogIn() {
        console.info(this.accountsType)

        if(this.selectedProperties.length==0){
          Toast('请勾选要选择缴费的项目');
          return false;
        }
        lonIn((data)=>{
          let result = data.data.result;
          if(data.data.code == "000001"){
            if(result.userlevel === '0'){
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
        createOrderSchool({
          "itemId":ids.join(','),
          "accountsCode": this.payData.accoutsCode,
          "taskId": this.payData.taskId,
          "schoolId": this.payData.schoolId,
          "studentName": this.payData.studentName,
          "studentNo": this.payData.studentNo,
          "studentId": this.payData.studentId,
          "itemAmount": (money/100)+''
        }).then((data) => {
          Indicator.close();
          if (data.data.code == "000001") {
            let orderId = data.data.result;
            this.payInfoSchool(orderId);
          } else {
            MessageBox({
              title: data.data.message
            })
          }
        }, () => {
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
        payInfoSchool(orderId).then((data) => {
          Indicator.close();
          if (data.data.code == "000001") {
            let result = JSON.parse(data.data.result);
            console.log(result.result);
            this.submitForm = result.result;
            setTimeout(() => {
              document.forms[0].submit();
            }, 0);

          } else if (data.data.code == "000003") {
            MessageBox({
              title: "该功能仅支持实名用户使用"
            })
          } else {
            MessageBox({
              title: data.data.message
            })
          }
        }, () => {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          })
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
        icbcPublicPayPayInfo(orderId).then((data) => {
          Indicator.close();
          if (data.data.code == "000001") {
            // var url = location.origin + "/html/smartCampuskdg/icbcPay/smartCampusIndex.html?orderId=" + orderId;
            // if(this.isAndroid()){
            //   window.native.AndroidPayForICBCWebView(url);
            // }else {
            //   window.native.PayForICBCWebView(url);
            // }
            let result = JSON.parse(data.data.result);
            console.log(result.result);
            this.submitForm = result.result;
            setTimeout(() => {
              document.forms[0].submit();
            }, 0);


          } else if (data.data.code == "000003") {
            MessageBox({
              title: "该功能仅支持实名用户使用"
            })
          } else {
            MessageBox({
              title: data.data.message
            })
          }
        }, () => {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          })
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
        icbcPublicPayCreateOrder({
          "itemId":ids.join(','),
          "computeId": sceneType,
          "busiCode": this.payData.busiCode,
          "taskId": this.payData.taskId,
          "schoolId": this.payData.schoolId,
          "studentId": this.payData.studentId,
          "itemAmount": this.payData.amount
        }).then((data) => {
          Indicator.close();
          if (data.data.code == "000001") {
            let orderId = data.data.result;
            this.payInfoSchool2(orderId);

          } else {
            MessageBox({
              title: data.data.message
            })
          }
        }, () => {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          })
        })
      },

    },
    //进入页面加载
    mounted() {
      this.getFeeDetail();
    },
    created(){
      //   this.studentId = this.$route.query.studentId;
      //   this.taskName = this.$route.query.taskName;
      //   this.itemId = this.$route.query.itemId;
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
    margin-left: 0.71rem;
    padding-top: 0.09rem;
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
    font-size: 0.16rem;
    color: rgb(67,67,67);
    font-family:SourceHanSansCN-Regular;
  >span {
    color: #464646;
    float: right;
    font-size: 0.16rem;
  }

  }

  }


  .button{
    padding-left: .12rem ;
    font-size: .16rem;
    font-family: SourceHanSansCN-Regular;
    color: rgb(255, 156, 156);
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
