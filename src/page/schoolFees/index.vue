<template>
  <div>
    <headcom title="学校收费"></headcom>
    <div class="element">
      <card v-for="(item,index) in FeeList" :item = item :index = index></card>
    </div>
    <!--年度底部弹框-->
    <mt-popup v-model="yearState" position="bottom" style="width: 100%">
      <div>
        <mt-picker :slots="yearSlots" @change="year" :visible-item-count="5">
        </mt-picker>
      </div>
      <div class="buttonCon">
        <a @click="yearState = false">取消</a>
        <a @click="particular">确定</a>
      </div>
    </mt-popup>
    <!--支付状态底部弹框-->
    <mt-popup v-model="payStatus" position="bottom" style="width: 100%">
      <div>
        <mt-picker :slots="classifySlots" @change="selectClassify" :visible-item-count="5">
        </mt-picker>
      </div>
      <div class="buttonCon">
        <a @click="payStatus = false">取消</a>
        <a @click="selectcConfirm">确定</a>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import card from "../../components/schoolPag/card"
  import {Indicator,MessageBox,Toast} from 'mint-ui';
  import { getFeeList } from "../../apis/app.api";
  export default{
    //组件
    components: {
      headcom,
      card
    } ,
    //父组件传入的数据
    props: {

    } ,
    //本地数据
    data(){
      return {
        yearState: false,
        payStatus:false,
        classifySlots:[{
          flex: 1,
          values: ['全部','未支付','已支付']
        }],
        yearSlots:[{
          flex: 1,
          values: ['2017','2018','2019','2020']
        }],
        yearsole1:"",//年度
        pagsole:"",//支付状态
        yearday:"年度",//年度
        pagday:"支付状态",//支付状态
        payment:false,
        FeeList:[],
      }
    } ,
    //方法
    methods: {
      //获取列表信息
      getFeeList: function () {
        Indicator.open({ spinnerType: 'fading-circle' });
        getFeeList({}).then((data)=>{
          if(data.data.code == '000001'){
            this.FeeList = data.data.result;
          }else{
            MessageBox('提示',data.data.message);
          }
        },()=>{
          Indicator.close();
          MessageBox('提示','数据请求失败');
        })
      },
      //选择完分类之后点击确定的方法
      selectcConfirm (){
        this.payStatus = false;
        this.pagday = this.pagsole;
      },
      //选择分类时的触发方法
      selectClassify(picker, values) {
        this.pagsole = values[0];
      },
      //年份的选择
      year(picker, values){
        this.yearsole1 = values[0];
      },
      particular(){
        this.yearState = false;
        this.yearday = this.yearsole1;
      },
      gopage(){
        // this.$router.push({"name":"schoolPay"});
        MessageBox("提示","该页面只用于查询，缴费请关注公众号工银e校园（微信号gongyinexiaoyuan）");
      }
    } ,
    //进入页面加载
    mounted () {
      var nameState = JSON.parse(sessionStorage.getItem('statepay'));
      if(nameState==undefined||nameState==""||nameState==null){
        this.payment = false
      }else{
        this.payment = true
      }
      //获取列表信息
      this.getFeeList();
    } ,
    //计算属性
    computed: {} ,
    //监控数据变化
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  img {
    width: 100%;
    display: block;
  }
  input{
    border: none;
    outline: none;
    background: 0;
    height: .45rem;
    text-indent: .1rem;
    width: 2.9rem;
  }
  .seach{
    background: #fff;
    border-top: 1px solid #eee;
  .seachlink{
    display:flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    align-items: center;
  span{
    line-height: .45rem;
    width: .8rem;
    text-align: center;
    font-size: .15rem;
    color: #858585;
    /*border-left: 1px solid #eee;*/
  }
  i{
    width: .01rem;
    height: .35rem;
    background: #eee;
  }

  }
  }
  .nav{
    padding: .12rem .12rem;
    display: flex;
    justify-content: flex-start;

  }
  .condition{
    display: flex;
    justify-content: flex-start;
    margin-right: .3rem;
    font-size: .16rem;
  img{
    width: .15rem;
    height: .15rem;
    vertical-align: middle;
    margin-left: .05rem;
    margin-top: .03rem;
  }

  }
  .buttonCon{
    display: flex;
    justify-content: space-between;
    color: #30aaff;
    padding: 0 .3rem;
  a{
    display: inline-block;
    margin: .1rem .12rem;
  }
  }
  .cost{
    padding: .12rem;
  .bag2{
    margin-top: .12rem;
  }
  }
</style>
