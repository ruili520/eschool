<!--黑板报页面-->
<template>
  <div>
    <!--<div v-if="isAndroid()"  class="blackboard">-->
      <!--<div style="background: #fff;">-->
        <!--<div v-if="blackboard.length!=0" class="mainMsg1" @click="linkInformation(blackboard[0].articleId)">-->
          <!--<div class="nameCon1">-->
            <!--<div class="tuijian">推荐</div>-->
            <!--<div class="name" style="-webkit-box-orient: vertical;">{{blackboard[0].articleTitle}}</div>-->
            <!--<div class="praise"><span>{{blackboard[0].articleTime}}</span></div>-->
          <!--</div>-->
          <!--<div class="img1"><img :src="blackboard[0].pageUrl" alt="配图"></div>-->
        <!--</div>-->
        <!--<div class="msgCon">-->
          <!--<div class="msg" v-for="item in blackboard" @click="linkInformation(item.articleId)">-->
            <!--<div class="addImg"><img :src="item.pageUrl" /></div>-->
            <!--<div class="addCon">-->
              <!--<p class="over" style="-webkit-box-orient:vertical;">{{item.articleTitle}}</p>-->
              <!--<p class="num"><span>{{item.articleTime}}</span></p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div style="height: .12rem; background: #f6f6f6;"></div>-->
    <!--</div>-->
    <div  class="blackboard">
    <div style="background: #fff;">
      <div v-if="blackboard.length!=0" class="mainMsg" @click="linkInformation(blackboard[0].articleId)">
        <div class="nameCon">
          <div class="tuijian">推荐</div>
          <div class="name" style="-webkit-box-orient: vertical;">{{blackboard[0].articleTitle}}</div>
          <div class="praise"><span>{{blackboard[0].articleTime}}</span></div>
        </div>
        <div class="img"><img :src="blackboard[0].pageUrl" alt="配图"></div>
      </div>
      <div class="msgCon">
        <div class="msg" v-for="item in blackboard" @click="linkInformation(item.articleId)">
          <div class="addImg"><img :src="item.pageUrl" /></div>
          <div class="addCon">
            <p class="over" style="-webkit-box-orient:vertical;">{{item.articleTitle}}</p>
            <p class="num"><span>{{item.articleTime}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div style="height: .12rem; background: #f6f6f6;"></div>
  </div>
  </div>
</template>

<script>
  import {MessageBox,Indicator,Toast} from 'mint-ui';
  export default {
    name:'',
    data(){
      return{
        blackboard: [],  //黑板报的数据
      }
    },
    methods:{
      isAndroid(){
        var vm = this;
        var u = navigator.userAgent
        console.log(u)
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        return isAndroid;
      },
      getBlackboard(){
        var vm = this;
        var data={
          cityName:"上海",
          isHot:"0",
          page:1,
          size:10,
          isRecommend:"1",
          more:"0",
          schoolType:"1"
        };
        this.$getBlackBoard(data
        ,function (res) {
          console.log(res)
          vm.blackboard = res.result.data
            vm.blackboard.forEach(function (item, index) {
              item.articleTime=vm.util.formatDate(item.articleTime)
            });
          },function (res) {
          console.log(res)
        })
      },
      linkInformation(id){
        this.$router.push('/colleges/BlackboardInfo?id='+id)
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
    height: 1.2rem;
    display: flex;
    background-color: #F6F6F6;
    overflow: hidden;
    margin:0 .12rem .12rem .12rem;
    position: relative;
  }
  .mainMsg1{
    height: 1.2rem;
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
    height: 1.2rem;

  }
  .img1 img{
    width:2.13rem;
    /*height: 100%;*/
    height: 1.2rem;

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
    width: 1.36rem;
    height: 1.2rem;
    padding: 0 .12rem;
    background: url(../../assets/img/blackboard.png) no-repeat;
    background-size: 100% 100%;
  }
  .nameCon1{
    width: 1.36rem;
    height: 1.2rem;
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
