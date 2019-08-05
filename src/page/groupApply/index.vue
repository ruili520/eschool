<template>
  <div class="registrants">
    <!-- 个人报名 -->
    <headcom title="团体报名" ></headcom>

    <!-- 报名的form表单 -->
    <div class="formCon">
      <div class="label">
        <div class="name">联系人姓名：</div>
        <div class="value">
          <input type="text" maxlength="10" v-model="applyData.name">
        </div>
      </div>
      <div class="label">
        <div class="name">联系方式：</div>
        <div class="value">
          <input type="tel" maxlength="11" v-model="applyData.phone">
        </div>
      </div>
      <div class="label" v-if="false">
        <div class="value">
          <input type="text" maxlength="10" v-model="applyData.verifyCode">
        </div>
        <div class="getVerificationCode">获取验证码</div>
      </div>
      <div class="label">
        <div class="name">学校名字：</div>
        <div class="value">
          <input type="text"  maxlength="20" v-model="applyData.schoolName">
        </div>
      </div>
      <div class="label">
        <div class="name">社区/楼盘：</div>
        <div class="value">
          <input type="text"  maxlength="20" v-model="applyData.community">
        </div>
      </div>
      <div class="label">
        <div class="name">详细地址：</div>
        <div class="value">
          <input type="text"  maxlength="50" v-model="applyData.address">
        </div>
      </div>
      <div class="label">
        <div class="name">总人数：</div>
        <div class="value">
          <input type="tel"  maxlength="3" v-model="applyData.count">
        </div>
      </div>
      <div class="label">
        <div class="name">孩子年龄段：</div>
        <div class="value">
          <input class="ageInput" type="tel" maxlength="2" v-model="applyData.ageSmall">岁
        </div>
        <div>至</div>
        <div class="value">
          <input class="ageInput" type="tel" maxlength="2" v-model="applyData.ageBig">岁
        </div>
      </div>
    </div>

    <div class="btnCon">
      <div class="submitBtn" @click="getApplyData">确认报名</div>
    </div>

  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import {
    Button,
    Indicator,
    MessageBox,
    Toast
  } from 'mint-ui';
  import {addEnroll} from "../../apis/app.api"

  export default {
    //组件
    components: {
      headcom
    },
    //父组件传入的数据
    props: {},
    //本地数据
    data() {
      return {
        applyData:{
          name:"",
          phone:"",
          count:"",
          ageSmall:"",
          ageBig:"",
          schoolName:"",
          community:"",
          address:""
        }

      }
    },
    //方法
    methods: {
      getApplyData:function () {
        for (const key in this.applyData) {
          if (this.applyData.hasOwnProperty(key)) {
            const element = this.applyData[key];
            if(element == ""){
              Toast("请完善信息后提交！");
              return
            }
          }
        }

        Indicator.open({ spinnerType: 'fading-circle' });
        addEnroll({
          "activityId":this.$route.query.activityId,
          "type":"2",
          "count":this.applyData.count,
          "name":this.applyData.name,
          "tel":this.applyData.phone,
          "ageSmall":this.applyData.ageSmall,
          "ageBig":this.applyData.ageBig,
          "schoolName":this.applyData.schoolName,
          "community":this.applyData.community,
          "address":this.applyData.address
        }).then((data)=>{
          Indicator.close();
          if (data.data.code == "000001") {
            Toast("提交成功");
            setTimeout(()=>{
              this.$router.push({
                name:"activityDetails",
                query:{
                  id:this.$route.query.activityId
                }
              })
            },1000)
          }else{
            MessageBox({title: data.data.message});
          }

        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })

      }

    },
    //进入页面加载
    mounted() {

    },
    //计算属性
    computed: {},
    //监控数据变化
    watch: {

    }

  }

</script>

<style lang="less" scoped>
  .formCon{
  .label{
    padding: 0 .12rem;
    margin: .12rem 0;
    display: flex;
    line-height: .3rem;
    justify-content: space-between;
  .name{
    width: 1.1rem;
    line-height: .3rem;
  }
  .value{
    flex: 1;
    border-radius: .03rem;
    overflow: hidden;
    background-color: #fff;
  input{
    width: 100%;
    line-height: .3rem;
    outline: none;
    text-indent: 1em;
    border: 0px;
  }

  .ageInput{
    width: 75%;
  }
  }
  .getVerificationCode{
    background-color: #ff3442;
    width: 1.1rem;
    line-height: .3rem;
    text-align: center;
    color: #fff;
    border-radius: .03rem;
    overflow: hidden;
    margin-left: .12rem;
  }
  }
  }

  .btnCon{
    background-color: #ffffff;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: .12rem 0;


  .submitBtn{
    width: 3.51rem;
    line-height: 0.49rem;
    background-color: #ff3442;
    border-radius: 0.04rem;
    margin: 0 auto;
    text-align: center;
    font-size: 0.18rem;
    color: #fff;
  }
  }


</style>
