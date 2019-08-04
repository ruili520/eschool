<!--黑板报页面-->
<template>
  <div class="blackboard">
    <div style="background: #fff;">
      <div class="mainMsg" @click="linkInformation(blackboard[0].articleId)">
        <div class="nameCon">
          <div class="tuijian">推荐</div>
          <div class="name" style="-webkit-box-orient: vertical;">{{blackboard[0].articleTitle}}</div>
          <div class="praise"><span>{{blackboard[0].articlePv+blackboard[0].articlePvPlus}}</span><span>人说好</span></div>
        </div>
        <div class="img"><img :src="blackboard[0].pageUrl" alt="配图"></div>
      </div>
      <div class="msgCon">
        <div class="msg" v-for="item in blackboard" @click="linkInformation(item.articleId)">
          <div class="addCon">
            <p class="over" style="-webkit-box-orient:vertical;">{{item.articleTitle}}</p>
            <p class="num"><span>{{item.articlePv+item.articlePvPlus}}人说好</span></p>
          </div>
          <div class="addImg">
            <img :src="item.pageUrl" />
          </div>
        </div>
      </div>
    </div>
    <div style="height: .12rem; background: #f6f6f6;"></div>
  </div>
</template>

<script>
  import {MessageBox,Indicator,Toast} from 'mint-ui';
  export default {
    name:'',
    data(){
      return{
        blackboard: [
          {articleTitle:'测试调试文章',articlePv:'12',articlePvPlus:'16',pageUrl:'http://img1.imgtn.bdimg.com/it/u=398611630,1920598617&fm=26&gp=0.jpg'},
          {articleTitle:'测试调试文章',articlePv:'12',articlePvPlus:'16',pageUrl:'http://img1.imgtn.bdimg.com/it/u=398611630,1920598617&fm=26&gp=0.jpg'},
          {articleTitle:'测试调试文章',articlePv:'12',articlePvPlus:'16',pageUrl:'http://img1.imgtn.bdimg.com/it/u=398611630,1920598617&fm=26&gp=0.jpg'},
          {articleTitle:'测试调试文章',articlePv:'12',articlePvPlus:'16',pageUrl:'http://img1.imgtn.bdimg.com/it/u=398611630,1920598617&fm=26&gp=0.jpg'},
        ],  //黑板报的数据
      }
    },
    methods:{
      getBlackboard(){
        var vm = this;
        var data={
          cityName:"上海",
          isHot:"1",
          page:1,
          size:10,
          isRecommend:"1",
          more:"1",
          schoolType:"1"
        };
        this.$getBlackBoard(data
        ,function (res) {
          vm.blackboard = res.result.data;
          console.log(res)
        },function (res) {
          console.log(res)
        })
      }
    },
    mounted() {
      this.getBlackboard()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../static/less/title.less";
  .blackboard{
    margin-top: .2rem;
  }
  .titleName{
    text-align: left !important;
    font-size: .18rem;
    vertical-align: bottom;
    padding: .06rem;
  }
  .title a{
    top: .2rem;
  }
  .mainMsg{
    height: 1rem;
    display: flex;
    background-color: #F6F6F6;
    overflow: hidden;
    margin:0 .12rem .12rem .12rem;
    position: relative;
  }
  .tuijian{
    background: #ff3442;
    display: inline-block;
    color:#fff;
    font-size: .13rem;
    padding:.02rem .05rem;
  }
  .name{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    font-size: 0.13rem;
    color: #ffffff;
    margin-top: .06rem;
  }
  .img img{
    width:2.11rem;
    /*height: 100%;*/
    height: 1rem;

  }
  .praise{
    position: absolute;
    bottom: .05rem;
    left: .12rem;
    font-size: 0.1rem;
    color: #ffffff;
    margin-bottom: 0.04rem;
  }
  .msg:nth-child(1){
    display: none;
  }
  .msg{
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e6e6e6;
    padding:  .12rem .12rem;
    /*align-items: center;
    line-height: .34rem;
    color: #575757;*/
    .addCon{
      position: relative;
      width: 2.19rem;
      /*margin-right: .12rem;*/
      .briefTitle{
        font-size: .14rem;
        color: #373737;
        margin-bottom: .07rem;
      }
      span{
        font-size: .12rem;
        color: #aeaeae;
      }
    }
    .addImg{
      width: 1.2rem;
      height: 0.57rem;
    }
    .num{
      position: absolute;
      bottom: 0;
      width: 100%;
      /*margin-bottom: 0;*/
      display: flex;
      justify-content: space-between;
    }
    .over{
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-line-clamp:2;
      line-height: .18rem;
    }
  }
  .msg .text{
    width:3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-size: .13rem;
    -webkit-line-clamp: 1;
  }
  .msg div img{
    /*width: .2rem;
    height: .2rem;
    vertical-align: middle;*/
    width: 100%;
    height: 100%;
  }
  .nameCon{
    width: 1.16rem;
    height: 1rem;
    padding: 0 .12rem;
    background: url(../../assets/img/blackboard.png) no-repeat;
    background-size: 100% 100%;
  }
  .module{
    padding: .12rem;
    display: flex;
    justify-content: space-between;
    background: #fff;
    /*margin-top: .12rem;*/
    .model_left{
      width: 1.61rem;
      height: 1.6rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .model_right{
      width: 1.85rem;

      p{
        height: 0.78rem;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
