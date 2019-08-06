<template>
  <div class="serviceCon">
    <headcom title="园长信箱"></headcom>
    <div class="history" @click="linkHistory">
      <img src="../../assets/img/service-history.png" alt="">
    </div>
    <div class="opinionCon">
      <div class="title">意见类型</div>
      <div class="opinion">
        <a v-for="item in opinionTypes" :class="{action: item.id == opinionType.id}" @click="opinionType = item">{{item.name}}</a>
      </div>
    </div>
    <div class="opinionText">
      <div class="titleCon">
        <div class="title">您的反馈意见 </div>
        <div class="hint">您还可以输入{{wordNum}}个字</div>
      </div>
      <div class="input">
        <textarea ref='inputArea' v-model="opinion" maxlength="120" rows="6" cols="20" placeholder="写下您的宝贵意见"></textarea>
      </div>
    </div>
    <div class="uploadImgCon">
      <div class="title">上传图片</div>
      <div class="imgCon">
        <label class="img moban" style="display: none"><img src="" alt="图片" ></label>
        <label class="selectButton">
          <img src="../../assets/img/service-addImg.png" alt="添加" @click="selectImg">
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
  </div>
</template>

<script>
  import { MessageBox, Indicator, Toast } from "mint-ui";
  import { addTMailbox, uploadOSS, uploadOSSUrl } from "../../apis/app.api";
  import { lonIn } from "../../static/js/logIn";
  import headcom from "../../components/headcom";
  import Vue from 'vue'

  export default {

    components: {
      headcom
    },
    data() {
      return {
        opinionTypes: [{
          name: "校园生活",
          id: "5"
        }, {
          name: "教工工作",
          id: "2"
        }, {
          name: "家庭帮助",
          id: "3"
        }, {
          name: "校园费用",
          id: "4"
        }, {
          name: "基础设施",
          id: "1"
        }, {
          name: "校车",
          id: "6"
        }, ],
        opinionType: {
          name: "校园生活",
          id: "5"
        },
        // 当前用户选择的意见类型
        wordNum: 120,
        // 用户在输入框中输入的意见
        opinion: "",
        // 用户选择的图片
        imgs: [],
      }
    },
    //方法
    methods: {
      //跳转到历史
      linkHistory: function() {
        this.$router.push({
          name: "information",
        })
      },
      submit: function() {
        var vm = this;
        if(!this.opinion.length) {
          Toast('反馈意见不能为空哦');
          this.$refs.inputArea.focus();
          return;
        }
        let urls = this.imgs.join("|");
        this.$addTMailbox({
          "mailType": this.opinionType.id,
          "mailContent": this.opinion,
          "img": urls
        },function (res) {
          if(res.code == "000001") {
            Toast("感谢您的宝贵意见！");
            vm.linkHistory();
          } else if(res.code == "000002") {
            lonIn();
          } else {
            MessageBox({
              title: res.message
            });
          }
        },function (res) {
          MessageBox({
            title: "请求数据失败"
          });
        })
      },
      selectImg: function() {
        console.log("触发了选择图片")
      },
      //返回链的构建
      GoBack: function() {
        if(window.localStorage.routerData == undefined || JSON.parse(window.localStorage.routerData).length == 0) {
          var routerData = [{
            name: "service",
            query: this.$route.query
          }];
        } else {
          var routerData = JSON.parse(window.localStorage.routerData);
          routerData.unshift({
            name: "service",
            query: this.$route.query
          });
        }
        window.localStorage.routerData = JSON.stringify(routerData);
      }
    },

    //进入页面加载
    mounted() {
      this.GoBack();
      if(window.localStorage.state != undefined) {
        let state = JSON.parse(window.localStorage.state);
        console.log("从loc里面拿了数据", state);
        this.$store.replaceState(state);
      }

      $("body").scrollTop("0px");
      var that = this; ///////////////////////////////////////用户选择图片并上传
      $("#selectImg").change(function() {
        if(typeof FileReader == 'undefined') {
          alert("你的浏览器不支持图片上传！");
        }
        //检验是否为图像文件
        var file = document.getElementById("selectImg").files[0];

        var reader = new FileReader();
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          //显示文件
          //            console.log(this.result);
          var img = $(".imgCon .moban ").clone().show().removeClass("moban").addClass("uploadImg");
          $(img).find("img").attr("src", this.result);
          $(".selectButton").before(img);
          var input = $("#selectImg").clone().removeAttr("id").attr("id", "aaa");

          if($(".uploadImg").length == "4") {
            $(".selectButton").hide();
          }
          $("#imgCon").html(input).append('<input type="input" name="pathName" value="feedback"/>');
          //            $("#imgCon").submit();
          Indicator.open({
            spinnerType: 'fading-circle'
          });
          //var form = new FormData(document.getElementById("imgCon"));
          var form = new FormData();
          var files = document.getElementById("selectImg");
          form.append("file", files.files[0]);
          form.append("pathName", "feedback");

          $.ajax({
            url: uploadOSSUrl(),
            type: "POST",
            data: form,
            processData: false,
            contentType: false,
            success: function(data) {
              console.log(data);
              Indicator.close()
              if(data.code == "000001") {
                that.imgs.push(data.result.url);
              } else {
                Toast(data.message);
                $(".uploadImg:last-child").remove();
              }

            },
            error: function(e) {
              Indicator.close()
              console.log("图片上传错误", e);
            }
          });
          console.log(that.imgs);
        }
      })
    },
    //计算属性
    computed: {

    },
    //监控数据变化
    watch: {
      opinion: function(v) {
        if(v.length > 120) {
          this.opinion = v.substring(0, 120);
        }
        this.wordNum = 120 - v.length;
      }
    },
    //vue销毁前
    beforeDestroy() {
      window.localStorage.state = JSON.stringify(this.$store.state);
    }

  }
</script>

<style lang="less" scoped>
  .serviceCon {
    background-color: #F7F7F7;
    padding-bottom: .5rem;
  }

  .history {
    position: fixed;
    z-index: 9999;
    top: .1rem;
    right: .12rem;
  img {
    width: .24rem;
    height: .24rem;
  }
  }
  .opinionCon .title {
    color: #343434;
    font-size: .15rem;
    margin: .12rem;
  }

  .opinionCon .opinion {
    background-color: #FFFFFF;
  }

  .opinionCon .opinion a {
    display: inline-block;
    width: 33%;
    border-left: 1px solid #F0F0F0;
    border-bottom: 1px solid #F0F0F0;
    background-color: #FFFFFF;
    padding: .08rem 0;
    text-align: center;
    box-sizing: border-box;
    color: rgb(20, 19, 19);
  }

  .opinionCon .opinion a:nth-child(4n) {
    margin-right: 0;
  }

  .opinionCon .opinion .action {
    color: #fff;
    background-color: #ff3442;
  }

  .opinionText .titleCon {
    display: flex;
    justify-content: space-between;
    line-height: .3rem;
    padding: .12rem .12rem 0;
  }

  .opinionText .titleCon img {
    width: .2rem;
    vertical-align: middle;
  }

  .opinionText .titleCon .title {
    vertical-align: bottom;
    font-size: .17rem;
  }

  .opinionText .titleCon .hint {
    color: #CFCFCF;
  }

  .opinionText .input textarea {
    width: 100%;
    outline: none;
    resize: none;
    border: 0;
    margin-top: .12rem;
    padding: .12rem;
    box-sizing: border-box;
  }

  .uploadImgCon .title {
    padding: 0 .12rem;
  }

  .uploadImgCon .imgCon {
    padding: .12rem;
    background-color: #fff;
  }

  .uploadImgCon .imgCon .selectButton {
    display: inline-block;
    width: .5rem;
    height: .5rem;
    position: relative;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    vertical-align: middle;
    padding: .05rem;
  img {
    width: 100%;
    height: 100%;
  }
  }

  .selectButton #selectImg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .uploadImgCon .imgCon .img {
    width: .5rem;
    height: .5rem;
    margin: 0 .1rem;
    vertical-align: middle;
    display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
  }

  .submitOpinion {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  a {
    width: 100%;
    display: block;
    line-height: .5rem;
    text-align: center;
    color: #FFF;
    font-size: .2rem;
    background-color: #ff3442;
  }
  }
</style>


<style scoped>

</style>
