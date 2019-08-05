<template>
  <div class="page"  :style="{ height: contentHeight + 'px'}">
    <v-head title="加入幼儿园" :callbackTrue="true" :callback="back"></v-head>
    <div class="relieveText" v-if="isTeacher!=3 " @click="myIsTeacher">
      <span v-if="$route.query.isShow!= 'binding' ">我是老师</span>
    </div>
    <!---->
    <div class="top">

      <p class="tip">请您完善个人信息</p>
      <p class="selectButton">
        <label>
          <img :src="field.headImg" alt="添加">
          <input id="selectImg" type="file" name="file" accept="image/*" @change="handleClickImg($event,0)">
        </label>
      </p>
    </div>
    <div class="inputs">
      <p class="inputs-tip">填写幼儿园登记的{{ userTypeName }}信息</p>
      <div>
        <mt-field :label="labelName" placeholder="请输入姓名" v-model="field.stuTeaName"></mt-field>
        <p class="sex">
          <label>性别</label>
          <label>
            <span><img @click="chooseSex('F')" :src="F" alt="" /></span>
            <span><img @click="chooseSex('M')" :src="M" alt="" /></span>
          </label>
        </p>
        <mt-field readonly="readonly" label="生日" placeholder="请选择" v-model="field.birthDate" @click.native="check('picker')"></mt-field>
        <mt-field readonly="readonly" v-if="!isTeacher" label="您与孩子关系" placeholder="请选择您与孩子关系" v-model="field.familyTies"
                  @click.native="check(3)"></mt-field>
        <mt-field v-else label="验证号码" placeholder="身份证号、手机号、或工号" v-model="field.idPhoneNo"></mt-field>
      </div>
    </div>
    <mt-button @click="bind()" :disabled="isDis" class="submit" type="danger" size="large">确定</mt-button>
    <!-- <a href="http://192.168.35.73:8082/#/joinGarten?schoolId=7&isShow=binding">111111</a> -->

    <!-- <mt-datetime-picker ref="picker" v-model="dataVal" type="date" :startDate="minDate" :endDate="maxDate" @confirm="handleChange"></mt-datetime-picker> -->
    <!-- <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field> -->
    <div>
      <mu-container v-show="dddat" style="" >
        <mu-flex justify-content="between" align-items="end" wrap="wrap">
          <mu-paper :z-depth="1" class="demo-date-picker">
            <mu-date-picker display-color='#FF7B7B' color='#FF7B7B' @change="change" :date.sync="date"></mu-date-picker>
          </mu-paper>
        </mu-flex>
      </mu-container>
    </div>
    <mt-popup v-model="popupVisible2" position="bottom" class="popup2" style="top:50%;margin-top: -1.625rem">
      <div class="relationship">
        <p><span>选择您与孩子的关系</span></p>
        <div>
          <ul>
            <li class="li"><span :class="{active:show=='爸爸'}" @click="choose('爸爸')">爸爸</span></li>
            <li><span :class="{active:show=='妈妈'}" @click="choose('妈妈')">妈妈</span></li>
          </ul>
          <ul>
            <li class="li" v-for="item in relationshipList" :key="item.index">
              <span :class="{active:show==item}" @click="choose(item)">{{item}}</span>
            </li>
          </ul>
        </div>
        <mt-button @click="popupBtn()" class="button" type="danger" size="large">确定</mt-button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import {
    toBind,
    uploadOSSUrl
  } from "../../apis/app.api"
  import headcom from "../../components/headcom"
  import {
    Indicator,
    MessageBox,
    Toast,
    Field
  } from 'mint-ui';




  export default {
    data() {
      return {
        field: {
          stuTeaName: '',
          stuTeaSex: '',
          birthDate: '',
          familyTies: null,
          idPhoneNo: null,
          userId: '',
          userType: '1',
          headImg: require('../../assets/img/photo.png')
        },
        sex: [{
          name: '男',
          value: '男'
        }, {
          name: '女',
          value: '女'
        }],
        show: '爸爸',
        relationshipList: [
          '爷爷', '奶奶', '外公', '外婆', '叔叔', '婶婶', '舅父', '舅妈',
          '姑父', '姑妈', '姨父', '姨妈', '哥哥', '姐姐', '亲属',
        ],
        M: require('../../assets/img/m1.png'),
        F: require('../../assets/img/f1.png'),
        isTeacher: this.$route.query.state,
        popupVisible2: false,
        dataVal: new Date(),
        date: undefined,
        dddat:false,
      }
    },
    //计算属性
    computed: {
      isDis() {
        if (!this.isTeacher) {
          if (this.field.stuTeaName != '' && this.field.stuTeaSex != '' && this.field.birthDate != '' && this.field.familyTies !=
            null) {
            return false
          } else {
            return true
          }
        } else {
          if (this.field.stuTeaName != '' && this.field.stuTeaSex != '' && this.field.birthDate != '' && this.field.idPhoneNo !=
            null) {
            return false
          } else {
            return true
          }
        }
      },
      contentHeight() {
        return document.documentElement.clientHeight
      },
      userTypeName() {
        return !this.isTeacher ? '宝贝' : '教师'
      },
      labelName() {
        return !this.isTeacher ? '宝贝姓名' : '教师姓名'
      },
      minDate() {
        let year = new Date().getFullYear();
        let day = '';
        if (!this.isTeacher) {
          day = (year - 19) + '-12-31'
        } else {
          day = (year - 65) + '-12-31'
        }
        return new Date(day)
      },
      maxDate() {
        let year = new Date().getFullYear();
        let day = '';
        if (!this.isTeacher) {
          day = new Date()
        } else {
          day = (year - 20) + '-12-31'
        }
        return new Date(day)
      }
    },
    components: {
      'v-head': headcom
    },
    mounted() {},
    methods: {
      //返回首页
      back() {
        if (this.isTeacher == 3) {
          this.isTeacher = this.$route.query.state;
        } else {
          this.$router.push('/identity');
        }
      },
      myIsTeacher() {
        this.isTeacher = 3;
      },
      isWx() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        } else {
          return false;
        }
      },
      check(index) {
        if (index == 1) {

        } else if (index == 'picker') {
          // this.$refs[index].open();
          // this.$refs.picker.open();
          this.dddat=true
        } else {
          this.popupVisible2 = true
        }
      },
      change(value) {
        this.field.birthDate = this.util.formatDate(value);
        this.dddat=false
      },
      chooseSex(name) {
        if (name == "F") {
          this.F = require('../../assets/img/f2.png');
          this.M = require('../../assets/img/m1.png')
        } else {
          this.M = require('../../assets/img/m2.png');
          this.F = require('../../assets/img/f1.png')
        }
        this.field.stuTeaSex = name;
      },
      onNation(picker, values) {
        this.field.familyTies = values[0];
      },
      popupBtn(index) {
        this.popupVisible2 = false;
        this.field.familyTies = this.show;
      },
      choose(name) {
        this.show = name
      },
      handleClickImg(obj, index) {
        let _this = this;
        //检验是否为图像文件
        if (typeof FileReader == 'undefined') {
          _this.$message({
            message: '你的浏览器不支持图片上传!',
            type: 'warning'
          });
          return false
        }
        for (var i = 0; i < obj.target.files.length; i++) {
          var file = obj.target.files[i];
          var img = document.createElement('img');
          var reader = new FileReader();
          reader.onload = this.getOnloadFunc(img, index);
          reader.readAsDataURL(file);
        }
      },
      getOnloadFunc(aImg, index) {
        let _this = this;
        return function (evt) {
          var image = new Image();
          let fileType = 'image/png';
          let cvs = document.createElement('canvas');
          image.onload = function () {
            var scale = 1;
            if (this.width > 400 || this.height > 400) { //800只是示例，可以根据具体的要求去设定
              if (this.width > this.height) {
                scale = 400 / this.width;
              } else {
                scale = 400 / this.height;
              }
            }
            cvs.width = this.width * scale;
            cvs.height = this.height * scale; //计算等比缩小后图片宽高
            let ctx = cvs.getContext('2d');
            ctx.clearRect(0, 0, cvs.width, cvs.height); // 清除画布
            ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
            let newImageData = cvs.toDataURL(fileType, 0.9); //重新生成图片,
            _this.uploadImg(index, newImageData);
          };
          image.src = evt.target.result;
        };
      },
      uploadImg(index, result) {
        let _this = this;
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        var form = new FormData();
        var dataUrl = _this.util.convertBase64UrlToBlob(result.replace("data:" + 'image/png' + ";base64,", ''));
        form.append('file', dataUrl, 'active.png');
        form.append("pathName", "feedback");
        $.ajax({
          url: uploadOSSUrl(),
          type: "POST",
          data: form,
          processData: false,
          contentType: false,
          success: function (data) {
            Indicator.close()
            if (data.code == "000001") {
              _this.field.headImg = data.result.url
            } else {
              Toast(data.message);
            }
          },
          error: function (e) {
            Indicator.close()
          }
        });
      },
      bind() {
        this.field.campus_type = '1';
        if (this.field.stuTeaName == '') {
          Toast('请填写宝贝姓名');
          return false;
        }
        if (this.field.stuTeaSex == '') {
          Toast('请选择宝贝性别');
          return false;
        }
        if (this.field.birthDate == '') {
          Toast('请选择宝贝生日');
          return false;
        }
        if (!this.isTeacher) {
          this.field.roleId = 2;
          if (this.field.familyTies == null) {
            Toast('请选择您的孩子的关系');
            return false;
          }
        } else {
          this.field.roleId = 3;
          if (this.field.idPhoneNo == null) {
            Toast('请输入验证号码');
            return false;
          }
        }
        this.field.schoolId = this.$route.query.schoolId;
        if (this.isWx()) {
          this.field.userType = "2";
          this.field.userId = 100;
        } else {
          this.field.userType = "1";
          this.field.userId = '';
        }
        if (this.field.headImg.substr(0, 4) == 'data') {
          this.field.headImg = '';
        }
        Indicator.open()
        toBind(this.field).then(
          data => {
            Indicator.close();
            if (data.data.code == "000001") {
              if (data.body.result == "0") {
                Toast("绑定失败");
              } else if (data.body.result == "1") {
                if (this.isTeacher == 3) {
                  this.$router.push('/teacherMessage');
                } else {
                  // this.$router.push('/identity');
                  this.$router.push('/wisdomCampusIndex');

                }
              } else {
                MessageBox("提示", data.body.message);
              }
            } else {
              MessageBox("提示", data.data.message);
            }
          }, () => {
            Indicator.close();
            MessageBox("提示", "数据请求失败");
          });
      }
    }
  }

</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page {
    width: 100%;
    background-color: #fff;

  .relieveText {
    position: absolute;
    top: .12rem;
    right: .22rem;
    height: .25rem;
    font-size: .13rem;
    z-index: 9999;
  }

  .top {
    width: 100%;

  .tip {
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    background-color: rgba(255, 247, 153, .3);
    font-size: .12rem;
    color: #434343;
  }

  .selectButton {
    margin: .23rem 0;
    width: 100%;
    height: .71rem;

  label {
    display: inline-block;
    width: .71rem;
    height: .71rem;
    border-radius: 50%;
    text-align: center;
    position: relative;
    left: 50%;
    margin-left: -.355rem;

  img {
    width: 100%;
    height: 100%;
    display: inline-block;
    border-radius: 50%;
  }

  #selectImg {
    display: none;
    border-radius: 50%;
    opacity: 0;
  }
  }
  }
  }

  .inputs {
  .inputs-tip {
    color: #bfbfbf;
    padding-left: 10px;
    font-size: 12px;
    padding-bottom: 5px;
  }

  .sex {
    height: .47rem;
    line-height: .47rem;
    background-color: #fff;
    border-top: .01rem solid rgba(238, 238, 238, .9);

  label {
    font-size: 16px;
    margin-left: .1rem;
    display: inline-block;
    padding-top: .03rem;
    height: .35rem;
    width: 105px;
    color: #434343;

  &:nth-of-type(2) {
     padding-right: .1rem;
     margin-left: 0;
     background-color: #fff;
     width: 1.4rem;

  span {
    display: inline-block;
    height: .35rem;
    width: .6rem;

  img {
    width: .5rem;
    display: inline-block;
  }
  }
  }

  }
  }
  }

  .popup1 {
    width: 100%;
    height: 80px;

  div {
    width: 100%;
    height: 80px;

  p {
    height: 40px;
    line-height: 40px;
    font-size: 16px;

  &:nth-of-type(1) {
     border-bottom: .002rem solid #ddd;
   }
  }
  }
  }

  .popup2 {
    width: 90%;
    height: 3.65rem;
    border-radius: 10px;

  .relationship {
    width: 100%;

  .button {
    width: 90%;
    position: relative;
    margin: .2rem .15rem 0 .15rem;
  }

  p {
    height: .7rem;
    line-height: .8rem;
    text-align: center;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-size: 0.21rem;
    background-color: #FFE5E5;
  }

  div {
    height: 2.1rem;

  ul {
  &:nth-of-type(1) {
     margin-top: .05rem;
     display: flex;

  li {
    flex: 1;
    text-align: center;
  }
  }

  &:nth-of-type(2) {
     width: 96%;
     height: 300px;
     margin-left: 2%;

  li {
    float: left;
    width: 25%;
    text-align: center;
  }
  }

  li {
    line-height: .3rem;
    margin-top: .1rem;

  span {
    display: inline-block;
    padding: 0 .18rem;
    border-radius: .1rem;
    border: .01rem solid #ccc;
  }

  .active {
    background-color: #FF7B7B;
  // border:1px solid #FF7B7B;
    color: #fff;
  }
  }
  }
  }

  }
  }

  .submit {
    position: absolute;
    top: 4.6rem;
    width: 94%;
    left: 3%;
  }
  .demo-date-picker {
  // margin: 8px;
    z-index: 999;
    position: absolute;
    top: 15%;
    left: 8%;


  }
  }

</style>
