<template>
  <div class="activity">
    <p class="time">
      <span>{{info.updateDate|formattingDate}}</span>
    </p>
		<div :class="{advices1:info.isRead == 0,advices2:info.isRead == 1}" class="bag">
      <div class="title">
        <p class="label" style="font-size: .15rem;">
          <span>园长回复了您：</span>
        </p>
        <p class="smalltitle">
          <span>{{ info.reply }}</span>
          <img v-if="imgs.length != 0" :src="imgs[0]" alt="反馈图片">
        </p>
      </div>
      <div class="catch " @click="toDetail">
        <p>查看详情</p>
        <span>
          <img src="../../../assets/img/information/more.png">
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

  .advices1{
    background: url(../../../assets/img/information/unread.png) no-repeat top left,#fff;
    background-size: .22rem .22rem;
  }
  .advices2{
    background: url(../../../assets/img/information/read.png) no-repeat top left,#fff;
    background-size: .22rem .22rem;
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
    font-size: .12rem;
    color: #aeaeae;
    display: flex;
    span{
      display: block;
      flex: 1;
    }
    img {
      display: block;
      width: .8rem;
      height: .8rem;
      margin-right: .06rem;
    }
  }

</style>
<style>


</style>
