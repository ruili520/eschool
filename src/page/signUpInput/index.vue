<template>
  <div style="background-color: #fff;width: 100%;height: 100%;">
    <headcom title="填写信息"></headcom>
    <div style="width: 100%;margin-top: 1rem">
      <mt-field v-if="fileInput.name!=undefined" label='姓名' v-model="file.name" placeholder="请输入你的名字" type='text'></mt-field>
      <mt-field v-if="fileInput.idno!=undefined" label='身份证' :max-length="18" v-model="file.idno" placeholder="请输入你的身份证" type='text'></mt-field>
      <mt-field v-if="fileInput.nation!=undefined" readonly="readonly" label='民族' v-model="file.nation" @click.native="check(2)" placeholder="请选择民族" type='text'></mt-field>
      <mt-field v-if="fileInput.sex!=undefined" readonly="readonly" label='性别' v-model="file.sex" @click.native="check(1)" placeholder="请选择性别" type='text'></mt-field>
      <mt-field v-if="fileInput.birth!=undefined" readonly="readonly" label='出生日期' v-model="file.birth" @click.native="open('picker')" placeholder="请选择出生日期" type='text'></mt-field>
      <mt-field v-if="fileInput.location!=undefined" label='户口所在地' v-model="file.location" placeholder="请输入你的户口所在地" type='text'></mt-field>
      <mt-field v-if="fileInput.father!=undefined" label='父亲姓名' v-model="file.father" placeholder="请输入父亲姓名" type='text'></mt-field>
      <mt-field v-if="fileInput.mother!=undefined" label='母亲姓名' v-model="file.mother" placeholder="请输入母亲姓名" type='text'></mt-field>
      <mt-field v-if="fileInput.tel!=undefined" label='手机号码' v-model="file.tel" placeholder="请输入手机号码" type='tel'></mt-field>
      <mt-field v-if="fileInput.academy!=undefined" label='院校' v-model="file.academy" placeholder="请输入院校" ></mt-field>
      <mt-field v-if="fileInput.faculty!=undefined" label='院系' v-model="file.faculty" placeholder="请输入院系" ></mt-field>
      <mt-field v-if="fileInput.douyin!=undefined" label='抖音号' v-model="file.douyin" placeholder="请输入抖音号" ></mt-field>
      <div class="button">
        <button @click="fileUp()">我要报名</button>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker" type="date" :startDate="minDate1" :endDate="maxDate1"
      year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
      @confirm="handleChange">
    </mt-datetime-picker>
    <mt-popup v-model="popupVisible1" position="bottom" class="popup1">
      <div>
        <p v-for="item in sex" @click="chooseSex(item.name)" style="text-align: center">{{ item.name }}</p>
      </div>
    </mt-popup>
    <mt-popup v-model="popupVisible2" position="bottom" class="popup2">
      <p><span @click="popupBtn(1)">取消</span><span @click="popupBtn(2)">确定</span></p>
      <mt-picker :slots="nation" @change="onNation" :visible-item-count="3"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import headcom from "../../components/headcom";
  import {Swipe, SwipeItem, Indicator, MessageBox, Popup, Toast} from 'mint-ui';
  import { getActivityData,activitySign } from "../../apis/app.api"
  export default {
    data() {
      return {
        fileInput:'',
        file:{
          name:'', idno:'', location:'',tel:'',
          birth:'',sex:'',father:'',mother:'',
          nation:'',academy:'',faculty:'',douyin:''
        },
        minDate1: new Date("1950-01-01"), //请假时间开始的最小时间
        maxDate1: new Date(), //请假时间开始的最大时间
        nation: [{
          flex: 1,
          values: [
            "汉族","壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
            "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
            "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
            "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
          ],
          className: 'slot1'
        }],
        sex:[{name:'男'},{name:'女'}],
        popupVisible1:false,
        popupVisible2:false
      };
    },
    components: {
      headcom
    },
    mounted(){
      this.getActivityData()
    },
    methods: {
      open(picker) {
        this.$refs[picker].open();
      },
      handleChange(value) {
        this.file.birth=this.util.formatDate(value);
      },
      check(index){
        if(index==1){
          this.popupVisible1=true
        }else if(index==2){
          this.popupVisible2=true
        }
      },
      chooseSex(name){
        this.file.sex=name;
        this.popupVisible1=false
      },
      onNation(picker, values){
        this.file.nation= values[0];
      },
      popupBtn(index){
        this.popupVisible2=false
        if(index==1){
          this.file.nation=''
        }
      },
      getActivityData() {
        var vm = this;
        let res = {
          id: this.$route.query.activeId
        };
        Indicator.open({spinnerType: 'fading-circle'});
        console.log("qqqqq")
        console.log(res)
        console.log(res.id)
        console.log("qqqqq")
        vm.$getActivityData(res, function (a) {
          Indicator.close();
          if (a.code == "000001") {
            vm.fileInput = JSON.parse(a.result)
          } else {
            MessageBox("提示", a.message);
          }
        }, function (a) {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      },

      fileUp(){
        var vm = this;
        if(vm.fileInput.name!=undefined){
          if(vm.file.name==''){ Toast('姓名不能为空！'); return false; }
        }
        if(vm.fileInput.idno!=undefined){
          if(!vm.util.checkCardID(this.file.idno)){ Toast('请正确输入身份证号码！'); return false }
        }
        if(vm.fileInput.nation!=undefined){
          if(vm.file.nation==''){ Toast('请选择民族！'); return false }
        }
        if(vm.fileInput.birth!=undefined){
          if(vm.file.birth==''){ Toast('请选择出生日期！'); return false }
        }
        if(vm.fileInput.sex!=undefined){
          if(vm.file.sex==''){ Toast('请选择性别！'); return false }
        }
        if(vm.fileInput.tel!=undefined){
          if(!vm.util.checkPhone(vm.file.tel)){ Toast('请正确输入手机号码！'); return false }
        }
        if(vm.fileInput.location!=undefined){
          if(vm.file.location==''){ Toast('请输入户口所在地！'); return false }
        }
        if(vm.fileInput.father!=undefined){
          if(vm.file.father==''){ Toast('请输入父亲姓名！'); return false }
        }
        if(vm.fileInput.mother!=undefined){
          if(vm.file.mother==''){ Toast('请输入母亲姓名！'); return false }
        }
        if(vm.fileInput.academy!=undefined){
          if(vm.file.academy==''){ Toast('请输入院校！'); return false }
        }
        if(vm.fileInput.faculty!=undefined){
          if(vm.file.faculty==''){ Toast('请输入院系！'); return false }
        }
        if(vm.fileInput.douyin!=undefined){
          if(vm.file.douyin==''){ Toast('请输入抖音号！'); return false }
        }
        let res={
          id:vm.$route.query.activeId,name:vm.file.name,idno:vm.file.idno,nation:vm.file.nation,
          birth:vm.file.birth,sex:vm.file.sex,location:vm.file.location,father:vm.file.father,
          mother:vm.file.mother,tel:vm.file.tel,academy:vm.file.academy,faculty:vm.file.faculty,
          douyin:vm.file.douyin
        };
        Indicator.open({ spinnerType: 'fading-circle' });

        vm.$activitySign(res,function (a) {
          if(a.code === "000001"){
            MessageBox("提示",'恭喜您，报名成功');
            /*vm.$router.push({"name":"wisdomCampusIndex","query":{
                "mode":"open"
              }});*/
            vm.$router.push('/SignUp')
          }else{
            MessageBox("提示",a.message);
          }
        },function (a) {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .button {
    border-top: .012rem solid #ddd;
    height: 1rem;
    width: 100%;
  button{
    width: 92%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin-left: 4%;
    margin-top:40px;
    background-color: #ff7b7b;
    border: 1px solid #ff7b7b;
    border-radius:5px;
  }
  }
  .page-radio .mint-radiolist-title {
    font-size: 16px;
  }
  .popup1{
    width: 100%;
    height:80px;
  div{
    width: 100%;
    height: 80px;
  p{
    height:40px;line-height:40px;
    font-size: 16px;
  &:nth-of-type(1){
     border-bottom: .002rem solid #ddd;
   }
  }
  }
  }
  .popup2{
    width: 100%;
    height:200px;
  p{
    width: 80%;
    padding: 0 10%;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  span{
    font-size: 15px;
    color: #bbb;
    display: inline-block;
    height: 40px;
    width: 50px;
  &:nth-of-type(2){
     color:#FF7B7B;
     float: right;
     text-align: right;
   }
  }
  }
  }
</style>
