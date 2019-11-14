<!--请假页面-->
<template>
  <div class="serviceCon">
    <headcom title="请假"></headcom>
    <div class="history" @click="linkHistory">
      <img src="../../assets/img/vacate-list.png" alt="">
    </div>
    <div class="opinionCon">
      <div class="opinion">
        <div style="height:.12rem;"></div>
        <mt-cell title="" is-link @click.native="popupVisible2 = true" :value="leaveType.name">
          <p slot="title"><span style='color:#ff3442'>*</span>请假类型</p>
        </mt-cell>
        <!--<div style="height:.12rem;"></div>-->
        <mt-cell title="开始时间" is-link @click.native="open('startDate')" :value="startDateText">
          <p slot="title">
            <span style='color:#ff3442'>*</span>开始时间
          </p>
        </mt-cell>
        <mt-cell title="结束时间" is-link @click.native="open('endDate')" :value="endDateText">
          <p slot="title">
            <span style='color:#ff3442'>*</span>结束时间
          </p>
        </mt-cell>
        <mt-cell
          title="时长" :value="dayTime+'天'"><p slot="title"><span style='color:#ff3442'>*</span>时长</p>
        </mt-cell>

      </div>
    </div>
    <div class="opinionText">
      <div class="titleCon">
        <div class="title">
          <span style='color:#ff3442'>*</span>请假事由
        </div>
        <div class="hint">您还可以输入{{wordNum}}个字</div>
      </div>
      <div class="input">
        <textarea v-model="opinion" maxlength="120" rows="6" cols="20" placeholder="写下您的宝贵意见"></textarea>
      </div>
    </div>
    <div class="uploadImgCon">
      <div class="title">上传图片</div>
      <div class="imgCon" >
        <label class="img moban" style="display: none">
          <img  src="" alt="图片" >
        </label>
        <label class="selectButton" >
          <img src="../../assets/img/service/addImg.png" alt="添加" @click="selectImg">
          <input id="selectImg" type="file" name="file" accept="image/*">
        </label>
      </div>
      <div v-show="false">
        <iframe name=myiframe width=0 height=0 scrolling="no"></iframe>
        <form id="imgCon" target="myiframe" action="" enctype="multipart/form-data" method="POST">
        </form>
      </div>
    </div>
    <div class="submitOpinion" @click="submit">
      <a>提交</a>
    </div>
    <!-- 开始时间 -->
    <mt-datetime-picker
      v-if="startTrue"
      ref="startDate"
      v-model="startDateTransitory"
      type="date"
      @confirm="setStartDate"
      :startDate="minDate1"
      :endDate="maxDate1"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <!-- 结束时间 -->
    <mt-datetime-picker
      v-if="endDateTrue"
      ref="endDate"
      v-model="endDateTransitory"
      type="date"
      @confirm="setEndDate"
      :startDate="minDate2"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <!-- 开始的上午下午 -->
    <mt-popup
      v-if="AmPmTrue"
      class="popup"
      v-model="popupVisible1"
      position="bottom">
      <div class="buttom">
        <p class="cancel" @click="cancel">取消</p>
        <p class="confirm" @click="confirmStartAmPm">确定</p>
      </div>
      <mt-picker valueKey="name" :slots="slots1" @change="onValuesChange1"></mt-picker>
    </mt-popup>
    <!-- 结束的上午下午 -->
    <mt-popup
      v-if="AmPmTrue"
      class="popup"
      v-model="popupVisible3"
      position="bottom">
      <div class="buttom">
        <p class="cancel" @click="cancel">取消</p>
        <p class="confirm" @click="confirmEndAmPm">确定</p>
      </div>
      <mt-picker valueKey="name" :slots="slots1" @change="onValuesChange3"></mt-picker>
    </mt-popup>
    <!-- 请假类型 -->
    <mt-popup
      class="popup"
      v-model="popupVisible2"
      position="bottom">
      <div class="buttom">
        <p class="cancel" @click="cancel">取消</p>
        <p class="confirm" @click="confirmLeaveType">确定</p>
      </div>
      <mt-picker valueKey="name" :slots="slots2" @change="onValuesChange2"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import headcom from '../../components/headcom'
  import {calculateDaytime,leaveSubmit} from "../../apis/app.api";
  import {lonIn} from "../../static/js/logIn";
  import {MessageBox,Indicator,Toast} from 'mint-ui';
  export default {
    name:'',
    components:{
      headcom
    },
    data(){
      return{
        AmPmTrue:true,// 上午下午的插件刷新
        endDateTrue:true, //结束时间插件刷新
        startTrue:true, //结束时间插件刷新
        minDate1: new Date(), //请假时间开始的最小时间
        maxDate1: new Date("2028-01-01"), //请假时间开始的最大时间
        minDate2: new Date(), //请假时间结束的最小时间
        startDate:null, //用户选择的开始时间
        startDateTransitory:null, //用户选择的开始时间
        startDateText:"请选择", //用户选择的开始时间
        endDate:null, //用户选择的结束时间
        endDateTransitory:null, //用户选择的结束时间
        endDateText:"请选择", //用户选择的结束时间
        leaveType:{id:false,name:"请选择"},//请假类型
        leaveTypeTransitory:{id:false,name:"请选择"},//请假类型
        startAmPm:{id:false,name:""},//开始时间上午下午
        startAmPmTransitory:{id:false,name:""},//开始时间上午下午
        endAmPm:{id:false,name:""},//结束时间上午下午
        endAmPmTransitory:{id:false,name:""},//结束时间上午下午
        wordNum: 120,
        opinion:"" ,//用户在输入框中输入的意见
        dayTime:"0" ,//请假的天数
        imgs: [],  //用户选择的图片
        slots1:[{ //上午下午
          flex: 1,
          values: [{AmPm:"1",name:'上午'}, {AmPm:"2",name:'下午'}],
        }],
        popupVisible1:false, //开始时间的上午下午
        popupVisible3:false, //结束时间的上午下午
        slots2:[{ //请假类型
          flex: 1,
          values: [{leaveType:"2",name:'事假'}, {leaveType:"1",name:'病假'}]
        }],
        popupVisible2:false, //请假
      }
    },
    //方法
    methods: {
      cancel:function () {
        this.popupVisible3 = false;
        this.popupVisible2 = false;
        this.popupVisible1 = false;
      },
      open(picker) {
        this.$refs[picker].open();
      },
      //开始时间上下午的滑动选择
      onValuesChange1:function (picker, values) {
        this.startAmPmTransitory = values[0];
      },
      //结束时间上下午的滑动选择
      onValuesChange3:function (picker, values) {
        this.endAmPmTransitory = values[0];
      },
      //请假类型的滑动选择
      onValuesChange2:function (picker, values) {
        this.leaveTypeTransitory = values[0];
      },
      // 请假类型的确定按钮
      confirmLeaveType:function(){
        this.popupVisible2 = false;
        this.leaveType = this.leaveTypeTransitory;
      },
      //开始时间上下午的确定按钮
      confirmStartAmPm:function(){
        this.popupVisible1 = false;
        this.startAmPm = this.startAmPmTransitory;
        this.startDate = `${this.startDateTransitory.getFullYear()}-${this.startDateTransitory.getMonth()+1}-${this.startDateTransitory.getDate()}`
        this.startDateText = this.startDate + this.startAmPm.name;
        this.calculateDaytime();//计算时长
        this.endDateTrue = false;
        this.minDate2 = this.startDateTransitory;
        setTimeout(() => {
          this.endDateTrue = true;
        }, 0);
      },
      //结束时间上下午的确定按钮
      confirmEndAmPm:function(){
        this.popupVisible3 = false;
        this.endAmPm = this.endAmPmTransitory;
        this.endDate = `${this.endDateTransitory.getFullYear()}-${this.endDateTransitory.getMonth()+1}-${this.endDateTransitory.getDate()}`
        this.endDateText = this.endDate + this.endAmPm.name;
        this.calculateDaytime();//计算时长
        this.startTrue = false;
        this.maxDate1 = this.endDateTransitory;
        setTimeout(() => {
          this.startTrue = true;
        }, 0);
      },

      //接收开始时间
      setStartDate:function (value) {
        this.startDateTransitory = value;
        if(this.endDate != null&&value.getDate() == new Date(this.endDate).getDate()){
          console.log("相等");
          if(this.endAmPm.AmPm == 1){
            this.slots1[0].values = [{AmPm:"1",name:'上午'}];
          }else{
            this.slots1[0].values = [{AmPm:"1",name:'上午'},{AmPm:"2",name:'下午'}];
          }
        }else{
          this.slots1[0].values = [{AmPm:"1",name:'上午'},{AmPm:"2",name:'下午'}];
        }
        this.AmPmTrue = false;
        setTimeout(() => {
          this.AmPmTrue = true;
        }, 0);
        this.popupVisible1 = true;
      },
      //接收结束时间
      setEndDate:function (value) {
        this.endDateTransitory = value;
        if(this.startDate != null&&value.getDate() == new Date(this.startDate).getDate()){
          console.log("相等");
          if(this.startAmPm.AmPm == 2){
            this.slots1[0].values = [{AmPm:"2",name:'下午'}];
          }else{
            this.slots1[0].values = [{AmPm:"1",name:'上午'},{AmPm:"2",name:'下午'}];
          }
        }else{
          this.slots1[0].values = [{AmPm:"1",name:'上午'},{AmPm:"2",name:'下午'}];
        }
        this.AmPmTrue = false;
        setTimeout(() => {
          this.AmPmTrue = true;
        }, 0);
        this.popupVisible3 = true;
      },
      //跳转到历史
      linkHistory: function () {
        this.$router.push({
          "name": "vacateDetails"
        })
      },
      //计算请假时长
      calculateDaytime: function () {
        if(!this.startDate||!this.endDate){return};
        var vm = this;
        this.$calculateDaytime({"startDate":this.startDate,
          "startAmPm":this.startAmPm.AmPm,
          "endDate":this.endDate,
          "endAmPm":this.endAmPm.AmPm},function (res) {
            console.log(res);
          if(res.code == "000001"){
            vm.dayTime = res.result;
          }else{
            MessageBox({title: res.message});
          }
        },function (res) {
        })
      },

      submit: function (){
        let url = this.imgs.join("|");
        if(this.leaveType.name == "请选择"||this.startDate == null||
          this.endDate == null||this.opinion == ""){
          Toast("信息填写不完整");
          return
        };
        console.log(this.leaveType);
        Indicator.open({ spinnerType: 'fading-circle' });
        var vm = this;
        this.$leaveSubmit({"startDate":this.startDate,
          "startAmPm":this.startAmPm.AmPm,
          "endDate":this.endDate,
          "endAmPm":this.endAmPm.AmPm,
          "dayTime":this.dayTime,
          "leaveType":this.leaveType.leaveType,
          "leaveContent":this.opinion,
          "img":url},function (res) {
            console.log(res);
          Indicator.close()
          if(res.code == "000001"){
            Toast("请假已提交");
            vm.$router.push(/*{
              "name": "wisdomCampusIndex",
              "query": {
                mode: "open"
              }
            }*/
              '/index');
          }else if(res.code == "000002"){
            lonIn();
          }else{
            MessageBox({title: res.message});
          }
        },function (res) {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      },
      selectImg: function (){
        console.log("触发了选择图片")
      },

    } ,

    //进入页面加载
    mounted () {

      $("body").scrollTop("0px");
      var that = this;///////////////////////////////////////用户选择图片并上传
      $("#selectImg").change(function (){
        if(typeof FileReader == 'undefined'){
          alert("你的浏览器不支持图片上传！");
        }
        //检验是否为图像文件
        var file = document.getElementById("selectImg").files[0];

        var reader = new FileReader();
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload=function(e){
          //显示文件
//            console.log(this.result);
          var img = $(".imgCon .moban ").clone().show().removeClass("moban").addClass("uploadImg");
          $(img).find("img").attr("src",this.result);
          $(".selectButton").before(img);
          var input  = $("#selectImg").clone().removeAttr("id").attr("id","aaa");

          if($(".uploadImg").length == "3"){
            $(".selectButton").hide();
          }
          $("#imgCon").html(input).append('<input type="input" name="pathName" value="feedback"/>');
//            $("#imgCon").submit();
          Indicator.open({ spinnerType: 'fading-circle' });
//            var form = new FormData(document.getElementById("imgCon"));
          var form = new FormData();

          var files = document.getElementById("selectImg");
          form.append("file", files.files[0]);
          form.append("pathName", "feedback");

          // console.log( "客服上传data",form);
          $.ajax({
            url:"/smart-campuskdg/ossFile/uploadOSS",
//              url:"https://m.xuebank.com/eduboot/ossFile/uploadOSS",
            type:"POST",
            data:form,
            processData:false,
            contentType:false,
            success:function(data){
              Indicator.close()
              if(data.code == "000001"){
                that.imgs.push(data.result.url);
              }else {
                Toast(data.message);
                $(".uploadImg:last-child").remove();
              }

            },
            error:function(e){
              Indicator.close()
              console.log("图片上传错误",e);
            }
          });

          console.log(that.imgs);
          //result.innerHTML='<img src="' + this.result +'" alt="" />';
        }
      })/////////////////////////////////////////////////////////用户选择图片并上传结束

    } ,
  }
</script>

<style lang="less" scoped>
  .popup{
    width: 100%;
    .buttom{
      display: flex;
      border-bottom: 1px solid #f7f7f7;
      justify-content: space-between;
      p{
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
      }
    }

  }
  .serviceCon{
    background-color: #F7F7F7;
    padding-bottom: .5rem;
  }
  .history{
    position: fixed;
    z-index: 9999;
    top: .1rem;
    right: .12rem;
    img{
      width: .24rem;
      height: .24rem;
    }
  }
  .opinionCon{
    margin-top: .44rem;
  }
  .opinionCon .title{
    color: #343434;
    font-size: .15rem;
    margin: .12rem;
  }

  .opinionText .titleCon{
    display: flex;
    justify-content: space-between;
    padding:0 .1rem 0;

  }
  .opinionText .titleCon img{
    width:.2rem;
    vertical-align: middle;
  }
  .opinionText .titleCon .title{
    vertical-align: bottom;
  }
  .opinionText .titleCon .hint{
    color: #CFCFCF;
  }
  .opinionText .input textarea{
    width:100%;
    outline:none;
    resize:none;
    border:0;
    padding:.12rem;
    box-sizing: border-box;
  }

  .uploadImgCon .title{
    padding: 0 .12rem;
  }
  .uploadImgCon .imgCon{
    padding:.12rem;
    background-color: #fff;
  }
  .uploadImgCon .imgCon .selectButton{
    display: inline-block;
    width:.5rem;
    height: .5rem;
    position: relative;
    border:1px solid #CBCBCB;
    box-sizing: border-box;
    vertical-align: middle;
    padding:.05rem;
    img{
      width:100%;
      height: 100%;
    }
  }
  .selectButton #selectImg{
    position: absolute;
    top:0;left: 0;right: 0;bottom: 0;
    width:100%;
    height: 100%;
    opacity: 0;

  }
  .uploadImgCon .imgCon .img{
    width:.5rem;
    height: .5rem;
    margin:0 .1rem;
    vertical-align: middle;
    display: inline-block;
    img{
      width:100%;
      height: 100%;
    }
  }
  .submitOpinion{
    width:100%;
    position: fixed;
    bottom: 0;
    left: 0;
    a{
      width:100%;
      display: block;
      line-height: .5rem;
      text-align: center;
      color: #FFF;
      font-size: .2rem;
      background-color: #ff3442;
    }
  }

</style>
