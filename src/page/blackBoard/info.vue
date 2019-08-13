<template>
  <div>
    <!--<div class="header">-->
      <!--<div class="goBack">-->
        <!--&lt;!&ndash;<img src="../../assets/search/goback.png" alt="返回"/>&ndash;&gt;-->
        <!--<span class="iconfont" @click="goBack">-->
            <!--&#xe615;-->
          <!--</span>-->
      <!--</div>-->
    <!--</div>-->
    <div style="margin-top: .02rem;font-size: 18px;text-align: center;font-weight: bold">{{news.articleTitle}}</div>
    <div style="text-align: center">
      <div>发布日期：{{this.util.formatDate(news.articleTime)}}&nbsp;&nbsp;&nbsp;&nbsp;作者：{{news.articleAuthor}}</div>
      <!--<div v-if="news.pageUrl!=null" style="width: 90%;margin: 0 auto">-->
        <!--<img :src="news.pageUrl" style="width: 100%">-->
      <!--</div>-->
    </div>
    <div style="width: 95%;margin: 0 auto" v-html="news.articleContent"></div>
  </div>
</template>

<script>
  import headcom from '../../components/headcom'
  export default {
    name:'info',
    components:{
      headcom
    },
    data(){
      return{
        news:[]
      }
    },
    methods:{
      getInfo(){
        let vm = this;
        this.$axios.post('/eduboot/hotnews/getHotnewsInfo',{articleId:this.$route.query.id},).then(function (res) {
          vm.news = res.data.result
          vm.news.articleContent = "<style>img{max-width: 100%}</style>"+res.data.result.articleContent
          console.log(res)
        }
        )
      },
      goBack(){
        this.$router.push('/colleges/Blackboard')
      }
    },
    mounted() {
      console.log(this.$route.query.id)
      this.getInfo()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @font-face {
    font-family: 'iconfont';
    /* project id 466348 */
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot');
    src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.woff') format('woff'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.ttf') format('truetype'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: .16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  #articleContent p img{
    width: 100%;
  }

  .header {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: .44rem;
    padding: 0 .12rem;
    background-color: #fff;
    z-index: 9999;
    box-sizing: border-box;
    color: #333;
  }

  .goBack {
    width: .6rem;
  }

  .goBack img {
    width: .18rem;
    vertical-align: middle;
    margin-bottom: .03rem;
  }

  .goBack span {
    line-height: .3rem;
  }

</style>
