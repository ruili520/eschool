<template>
  <div class="main">
    <headcom :title="$route.meta.title"></headcom>
    <div class="bellInfo" v-if="noti != null">
      <div class="topTitle">
        <h1>{{ noti.title }}</h1>
        <p> {{ noti.updateDate | formattingDate }}</p>
      </div>
      <p class="content">
        {{ noti.content }}
      </p>
      <p class="content">
        {{ noti.remark }}
      </p>
    </div>
    <nodata v-else></nodata>
  </div>
</template>

<script>
  import headcom from "../../components/headcom";
  import nodata from "../../components/schoolMsg/noData";

  export default {
    components: {
      headcom,
      nodata,
    },
    data() {
      return {
        noti: null,
      }
    },
    filters: {
      //格式化时间
      formattingDate: function(timedata) {
        var date = new Date(timedata);
        var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return date.getFullYear() + "." + Month + "." + d + " " + h + ":" + m;
      }
    },
    methods: {

    },
    mounted() {
      // 路由传参
      this.$nextTick(() => {
        if(this.$route.params.noti) {
          this.noti = this.$route.params.noti;
        }
      })
    }
  }
</script>

<style lang="less" scoped="scoped">
  .main {
    background: #FFFFFF;
  }

  .bellInfo {
  .topTitle {
    padding: .1rem;
    border-top: solid #F6F6F6 1px;
    border-bottom: solid #F6F6F6 1px;
  h1 {
    font-size: .18rem;
  }
  p {
    color: #AEAEAE;
    font-size: .14rem;
    padding-top: .05rem;
  }
  }
  .content {
    padding: .1rem;
    text-align: justify;
  }
  }
</style>
