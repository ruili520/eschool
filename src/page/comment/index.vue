<template>
  <div class="commentCon">
    <headcom title="评论" ></headcom>

    <div class="comment" style="margin-top: .44rem">
      <textarea placeholder="请在这里输入您评论内容" @focus="stream = true" @blur="stream = false" v-model="estimateData.msg" maxlength="300" draggable="false" rows="6"></textarea>
      <p>{{characterNum}}/300</p>
    </div>

    <div class="save" @click="saveData">
      <a>提交</a>
    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import {addMessage} from "../../apis/app.api"

  // import HeaderComponent from './components/header.vue'
  import {
    MessageBox,
    Indicator,
    Toast
  } from 'mint-ui';


  export default {
    //父组件传入的数据
    props: {},
    components: {
      headcom
    },
    //本地数据
    data() {
      return {
        stream: false, //input框得焦为true
        estimateData: {
          msg: ""
        },
        id:"",
      }
    },
    //方法
    methods: {

      //点击保存提交信息
      saveData: function () {
        Indicator.open({ spinnerType: 'fading-circle' });
        addMessage({
          "activityId":this.id,
          "content":this.estimateData.msg
        }).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            Toast("提交成功");
            this.$router.push({
              "name": "activityDetails",
              "query": {
                id: this.id
              }
            });
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      },

    },
    //进入页面加载
    mounted() {
      this.id = this.$route.query.id;
      console.log(this.id)
    },
    //计算属性
    computed: {

      characterNum() {
        let length = this.estimateData.msg.length;
        return length;
      },

    },
    //监控数据变化
    watch: {}

  }

</script>

<style lang="less" scoped>
  .comment {
    padding: .12rem;
    margin-top: .06rem;
    background-color: #fff;
  }

  .comment p {
    text-align: right;
    font-size: .13rem;
    color: #c5c5c5;
  }

  .comment textarea {
    resize: none;
    width: 100%;
    padding: .12rem;
    color: #939393;
    outline: none;
    border: 0px solid #c5c5c5;
    box-sizing: border-box;
    font-size: .13rem;

  }

  .save {
    position: fixed;
    width: 20%;
    right: 0;
    top: 0;
    z-index: 9999;
    padding: 0 .12rem;
    box-sizing: border-box;
    background-color: #fff;
  }

  .save a {
    color: #ff3442;
    display: block;
    text-align: center;
    line-height: .4rem;
    font-size: .13rem;
  }



</style>
