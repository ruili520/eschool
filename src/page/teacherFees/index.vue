<template>
  <div class="page" style="width: 100%;height: 100%;">
    <headcom :title="titleName" :callbackTrue="true" :callback="back"></headcom>
    <div class="mian" v-for="item in  feelist" :key="item.index" >
      <div class="yuanhuan" >
        <p v-if="pecent == 'NaN'" class="one">0%</p>
        <p v-if="pecent !=='NaN' " class="one">{{pecent}}%</p>
        <p class="two">缴费完成情况</p>
      </div>
      <div class="right">
        <div>
          <img src="../../assets/img/tuoyuan2.png" alt="">
          <span>已缴费宝贝{{item.paidNum}}人</span>
        </div>
        <div>
          <img src="../../assets/img/tuoyuan1.png" alt="">
          <span>未缴费宝贝{{item.unpaidNum}}人</span>
        </div>
        <!-- <span>小一班：35人</span><img src="../assets/sanjiao.png" alt=""> -->
      </div>
      <div  class="m_top"  >
        <select id="feeTypes" v-model="xxx" @change="qieclass" >
          <!-- <option  disabled value="">请选择</option>
          <option>{{items.classId}}</option> -->
          <!-- <option v-for="items in xxxlist" :key="items.index" v-bind:value="items.classId"  >{{items}}</option> -->

          <option v-for="items in xxxlist"  :value="items.classId" :key="items.index">
            {{ items.className }}
          </option>
        </select>
      </div>
    </div>
    <div class="xxx" style="margin-top:10px;">
      <mt-navbar v-model="selected" class="top" @click.native="test()">
        <mt-tab-item id="1">已缴费账单</mt-tab-item>
        <mt-tab-item id="0">未缴费账单</mt-tab-item>
      </mt-navbar>
      <scroll style="margin-top:344px" v-if="listLength!=0" :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
        <mt-tab-container v-model="selected" style="margin-top:10px;" v-for=" itt in xiangxiList" :key="itt.index">
          <mt-tab-container-item id="1">
            <div class='iiii' style="width: 100%;height: 93px;background-color: #fff;">
              <div class="i_left" style="position: absolute;top: 13px;left: 20px;line-height: 25px;">
                <img style="width: 13px;height: 14px;" src="../../assets/img/jiaofei.png" alt=""><span style="font-size:15px;color: #ff7b7b;">{{itt.taskName}}</span>
                <p style="font-size:15px;color: #434343;">交费宝贝：{{itt.studentName}}</p>
                <p style="font-size:15px;color: #434343;">收费截止时间：{{itt.endDate |formatDate }}</p>
              </div>
              <div class="i_right" style="position: absolute; right: 20px; top: 15px; font-size: 16px; color: #ff7b7b;">
                <p>{{ itt.amount  }}</p>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="0">
            <div class='iiii' style="width: 100%;height: 93px;background-color: #fff;">
              <div class="i_left" style="position: absolute;top: 13px;left: 20px;line-height: 25px;">
                <img style="width: 13px;height: 14px;" src="../../assets/img/jiaofei.png" alt=""><span style="font-size:15px;color: #ff7b7b;">{{itt.taskName}}</span>
                <p style="font-size:15px;color: #434343;">交费宝贝：{{itt.studentName}}</p>
                <p style="font-size:15px;color: #434343;">收费截止时间：{{itt.endDate |formatDate }}</p>
              </div>
              <div class="i_right" style="position: absolute; right: 20px; top: 15px; font-size: 16px; color: #ff7b7b;">
                <p>{{ itt.amount  }}</p>
              </div>
            </div>
          </mt-tab-container-item>

        </mt-tab-container>
      </scroll>
      <p v-if="listLength == 0" style="text-align:center;color:#999;padding:120px 0;font-size: 16px;">
        <img src="../../assets/img/void1.png" alt="" style="width:153px">
      </p>
    </div>
    <!-- <p v-if="status== '0' " class="payCard" @click="swtich">缴费记录</p>

		<nodata v-if="allList.nonpay.length == 0&&allList.payIng.length == 0&&allList.paidList.length == 0"></nodata>
    <p v-if="status!= '0' " style="font-size: 12px;text-align: center;padding-bottom: .1rem">仅展示一年的记录</p> -->
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  import {   getFeeClassList ,getTeaFeeClassList } from "../../apis/app.api"
  import {    Navbar,    TabItem  } from 'mint-ui';
  import scroll from '../../components/pull.vue'



  export default {
    components: {
      headcom,
      scroll
    },
    data() {
      return {
        scrollData: {
          noFlag: false
        },
        pageSize: 10,
        pageNum: 1,
        listLength: '',
        isSelect:true,
        titleName: '缴费情况',
        status: '0',
        selected: '1',
        feelist:[],
        xxx:'',
        xxxlist:[],
        pecent:'',
        studentlist:[],
        xiangxiList:[],
        calsslist:[],

      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' ;
      }
    },


    methods: {


      back() {
        if (this.status != '0') {
          this.status = '0';
          this.getFeeClassList()
        } else {
          this.$router.push({
            "name": "wisdomCampusIndex",
            "query": {
              mode: "open"
            }
          });
        }
      },
      qieclass(){
        this.pageNum = 1
        this.xiangxiList=[]
        this.getFeeClassList(this.xxx);
      },
      test() {
        // let vm =this;
        this.pageNum = 1
        this.studentlist =[]
        this.xiangxiList=[]
        this.getFeeClassList(this.xxx);
        // this.getList();
      },
      getclass(){
        let vm =this;
        let obj = {
          classId: '',
          page: '',
          size: '',
          status: '',
        }

        getTeaFeeClassList(obj).then((res)=>{
          console.log(res,'ppppppppppppppppp')
          //   for (let item of res.data.result) {
          //    this.xxxlist.push({classId:item.classId,className:item.className})
          //    console.log(this.xxxlist,'............')
          //     vm.xxx = vm.xxxlist[0].classId

          //     //  console.log( vm.xxxlist[0].classId,'6666666666666')
          //     // this.getFeeClassList(vm.xxx)
          // }
          this.xxxlist=res.body.result
          console.log(res.body.result,'......2222......')
          vm.xxx = vm.xxxlist[0].classId
          this.getFeeClassList(vm.xxx)
        })
      },
      getFeeClassList(ttt) {
        let vm = this;

        let obj = {
          classId: ttt,
          page: vm.pageNum,
          size: vm.pageSize,
          status: vm.selected,
        }
        console.log(obj)
        // vm.feelist=[]
        // vm.xiangxiList=[]
        getFeeClassList(obj).then((res) => {
          // console.log(res,'........................')

          vm.feelist =res.body.result.list
          //  console.log(vm.feelist,'11111111')
          // this.xxxlist=[]
          //  for (let item of res.data.result) {
          //    this.xxxlist.push({classId:item.classId,className:item.className})
          //     vm.xxx = vm.xxxlist[0].classId

          //      console.log(this.xxxlist,'6666666666666')

          // }
          vm.feelist.forEach(function(item){
            let lll =item.paidNum/(item.paidNum+item.unpaidNum)
            vm.pecent = (lll * 100).toFixed(1)
            for (let kkk of item.list) {
              //  console.log(kkk,'kkkkkkkkkkkkkkkkkkkkkk')

            }

            // let lll =item.paidNum/(item.paidNum+item.unpaidNum)
            // vm.pecent = (lll * 100).toFixed(1)
            vm.studentlist =item.list
            vm.listLength = item.list.length
            // console.log(vm.studentlist,'88888888')
            //  console.log(vm.xxxlist,'6666666666666')
          })
          // vm.xxx = vm.xxxlist[0].classId
          // this.xiangxiList=[]
          for (let itt of vm.studentlist ){
            vm.xiangxiList.push(itt)
            //    console.log(vm.xiangxiList,'99999999999')
          }

        })
      },
      onRefresh(done) {
        this.xiangxiList = []
        this.pageNum = 1
        this.getFeeClassList(this.xxx)
        // this.getclass()
        done(); // call done
      },
      onInfinite(done) {
        this.pageNum++;
        let more = this.$el.querySelector('.load-more')
        if (this.listLength < this.pageSize) {
          more.style.display = 'none'; //隐藏加载条
          //走完数据调用方法
          this.scrollData.noFlag = true;
        } else {
          // this.getclass()
          this.getFeeClassList(this.xxx)
          more.style.display = 'none'; //隐藏加载条
        }
        done();
      }

    },
    created() {
      this.getclass()
    },
    mounted() {

      // this.xxx = this.xxxlist
      //  this.getFeeClassList();
      //  this.xxx = this.xxxlist[0].classId;

      console.log(this.xxxlist,'ooooooo')
      //  this.xxx = this.xxxlist[0].classId;
    },



  }

</script>
<style lang="less"  scoped>
  .mian {
    width: 95%;
    height: 231px;
    background-color: #ffffff;
    border-radius: 6px;
    margin-top: 10px;
    margin-left: 10px;
    text-align: center;
    position: relative;

  .yuanhuan {
    width: 162px;
    height: 162px;
    border: solid 12px #ff9c9c;
    opacity: 0.4;
    border-radius: 81px;
    text-align: center;
    position: absolute;
    top: 50px;
    left: 20px;

  .one {
    font-size: 40px;
    color: #ff7b7b;
    margin-top: 20px;
  }

  .two {
    font-size: 14px;
    color: #ff9c9c;

  }
  }

  .right {
    position: absolute;
    right: 20px;
    top: 105.5px;
    width: 130px;

  img {
    width: 11.5px;
    height: 11.5px;
  }

  span {
    font-size: 15px;
    color: #434343;
  }
  }
  .m_top{
    margin: auto;

  span {
    font-size: 15px;
  }
  img{
    width: 14px;
    height: 10px;
  }
  #feeTypes{
    border: none;
    color: #ff7b7b;
    height: 34px;
    width: 80px;
    text-align-last: center;
    font-size: 15px;
    background-color: #fff;
  }
  }

  .xxx {
    margin-top: 10px;
    font-size: 15px;
  .top {
    height: 45px;
  }
  p{
    font-size: 15px;
  }

  }




  .demo-text {
    width: 95%;
    height: 93px;
    background-color: red;
    border-radius: 10px;
    padding: 16px;
    background: #fff;
  // p {
     //     margin: 8px 0;
     //     }
  }

  }

</style>
