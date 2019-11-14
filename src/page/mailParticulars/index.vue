<template>
  <div class="page">
    <headcom title="详情 "></headcom>
    <div class="time" style="margin-top: .4rem">
      <p>{{info.updateDate|formattingDate}}</p>
      <p v-if="info.status == 2">已回复</p>
      <p v-if="info.status == 1" class="advices1">未回复</p>
    </div>
    <p class="label" style="font-size: .15rem;">
      <span class="advices1">[校园生活]</span>
      <span>{{ info.mailContent }}</span>
    </p>
    <div class="imgCon">
      <span>{{ info.mailContent }}</span>
      <img v-if="imgs != 0" v-for="img of imgs" :src="img" alt="反馈图片">
    </div>
    <div class="line"></div>
    <div v-if="info.status == 2" class="reply">
      <span>院长回复</span>
    </div>
    <div v-if="info.status == 2" class="replyText">
      {{info.reply}}
    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom";
  import {
    getTMailboxInfo
  } from "../../apis/app.api";
  import {
    MessageBox,
    Toast
  } from 'mint-ui';

  export default {
    components: {
      headcom
    },
    filters:{
      //格式化时间
      formattingDate: function (timedata) {
        var date = new Date(timedata);
        var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return Month + "-" + d + " " + h + ":" + m;
      }
    },
    data() {
      return {
        mailId: null,
        info: {
          updateDate:new Date()
        },
        imgs: []
      }
    },
    methods: {
      getClickTMailboxInfo: function () {
        var vm = this;
        vm.$getTMailboxInfo(vm.mailId, function (res) {
          console.log("//////")
          console.log(res)
          console.log("//////")
          if (res.code === '000001') {
            vm.info = res.result;
            vm.imgs = vm.info.img.split('|');
          } else {
            Toast(res.message);
          }
        }, function (res) {
          vm.table = false;
          MessageBox({
            title: '提示',
            message: '获取数据失败',
          })
        });
      }
    },
    created() {
      this.mailId = this.$route.query.mailId
      this.getClickTMailboxInfo();
    }
  }

</script>

<style scoped lang="less">
  .page {
    background-color: #fff;
  }
  .line{
    height: .12rem;
    background-color: #f6f6f6;
  }

  .time {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: .12rem;
    color: #aeaeae;
  }

  .label {
    margin-bottom: .12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: .12rem;
  }

  .advices1 {
    color: #ff3442;
  }

  .imgCon {
    padding: .12rem;
  img {
    width: 100%;
  }
  }
  .reply{
    padding: .12rem;
  span{
    border-left: 1px solid #ff3442;
    padding-left: .06rem;
  }
  }
  .replyText{
    padding: 0 .12rem .12rem;
  }

</style>
