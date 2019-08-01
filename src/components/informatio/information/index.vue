<template>
  <div class="activity">
    <p class="time">
      <span>{{info.updateDate|formattingDate}}</span>
    </p>
    <div class="bag">
      <div class="title">
        <p class="label" style="font-size: .15rem;">
          <span class="advices1">[校园生活]</span>
          <span>{{ info.mailContent }}</span>
        </p>
        <p class="smalltitle">
          <img v-for="img of imgs" :src="img" alt="反馈图片">
        </p>
      </div>
      <div class="catch " @click="toDetail">
        <p>查看详情</p>
        <span v-if="info.status ==2" class="advices1">已回复
          <img src="../../../assets/information/more.png">
        </span>
        <span v-else>未回复
          <img src="../../../assets/information/more.png">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    modifyMessageState
  } from "./../../../apis/app.api"

  export default {
    props: ['info'],
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
        imgs: []
      }
    },
    methods: {
      toDetail() {
        // 将信息置为已读 modifyMessageState
        this.$emit('detail-router', this.info.id)
      }
    },
    created() {
      if (this.info.img != null && this.info.img.length > 0) {
        this.$nextTick(() => {
          this.imgs = this.info.img.split('|');
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .activity {
    padding: .15rem .12rem;
  }

  .activity .time {
    text-align: center;
  }

  .activity .time span {
    display: block;
    line-height: .15rem;
    width: 1rem;
    background: #d5d5d5;
    font-size: .12rem;
    color: #fff;
    border-radius: .1rem;
    padding-top: .01rem;
    margin: 0 auto;
  }

  .bag {
    padding: .12rem .12rem 0 .12rem;
    border-radius: .05rem;
    margin-top: .11rem;
    background: #fff;
  }

  .advices1 {
    color: #ff3442;
  }

  .title {
    padding-bottom: .13rem;
    border-bottom: solid 1px #eee;
    .label {
      margin-bottom: .12rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .catch {
    display: flex;
    justify-content: space-between;
    line-height: .38rem;
    font-size: .12rem;
    color: #333333;
  }

  .catch p {
    width: 1rem;
  }

  .catch span {
    display: block;
    margin-top: .03rem;
  }

  .catch span img {
    width: .15rem;
    vertical-align: middle;
  }

  .smalltitle {
    display: flex;
    img {
      display: block;
      width: 1.05rem;
      height: 1.05rem;
      margin-right: .06rem;
    }
  }

</style>
<style>


</style>
