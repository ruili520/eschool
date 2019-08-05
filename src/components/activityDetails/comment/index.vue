<template>
  <div class="commentCon">
    <div class="commentTitle">
      <div class="title">热门评论</div>
      <div class="value" @click="discuss">
        <img src="../../../assets/img/comment/comment.png" alt="">
        <span>写评论</span>
      </div>
    </div>

    <div class="commentCellCon" > 
      <div class="commentCell" v-for="item in data">
        <div class="userData">
          <div class="userImg">
            <img src="https://xuebankoss.oss-cn-shanghai.aliyuncs.com/smart_campus/smallbanker/img.png" alt="">
          </div>
          <div class="userName">
            <p class="name">{{item.userName}}</p>
            <p class="time">{{item.updateDate|timeFormatting('MDHM')}}</p>
          </div>
        </div>
        <p class="commentText">
          {{item.content}}
        </p>
      </div>

    </div>

  </div>
</template>

<script>
// import HeaderComponent from './components/header.vue';
export default {
	filters: {
    timeFormatting: function (value,type) {
      //元素的补零计算
      function addZero(val){if(val < 10){return "0" +val;}else{return val;}};
      var dataTime="";
      var data = new Date();  
      data.setTime(value); 
      var year   =  data.getFullYear();  
      var month  =  addZero(data.getMonth() + 1);  
      var day    =  addZero(data.getDate()); 
      var hour   =  addZero(data.getHours());
      var minute =  addZero(data.getMinutes());
      var second =  addZero(data.getSeconds());
      if(type == "YMD"){
      dataTime =  year + "/"+ month + "/" + day;
      }else if(type == "MDHM"){
      dataTime = month + "-" + day + " " +hour+ ":"+minute;
      }else if(type == "HMS"){
      dataTime = hour+":" + minute+":" + second;
      }else if(type == "YM"){
      dataTime = year + "-" + month;
      }
      return dataTime;//将格式化后的字符串输出到前端显示
    }
  },
//引入的组件
  components: {
		
  },
//父组件传入的值
  props: {
    data:Array,
    discuss:{
      type:Function,
      default:()=>{}
    },
		urlId:[String,Number]
  },
  data() {
    return {

    }
  },
//方法
  methods: {
  	
  },
//进入页面加载
  mounted () {},
//计算属性
  computed: {},
//监控数据变化
  watch: {
  	urlId:function(v){
  		console.log(v)
  	}
  }
}
</script>

<style scoped lang="less">
.commentCon{
  background-color: #fff;
  margin: .12rem 0;
}
.commentTitle{
  display: flex;
  justify-content: space-between;
  padding: .12rem;
  font-size: .12rem;
  .value{
    color: #4993f8;
    vertical-align: middle;
    img{
      width: .14rem;
      height: .14rem;
      display: inline-block;
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
  }
}

.commentCellCon{
  .commentCell{
    padding: .06rem 0;
    .userData{
      display: flex;
      align-items: center;
      padding: 0 .12rem;
      .userImg{
        width: .32rem;
        height: .32rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .12rem;
        margin-top: -.06rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .userName{
        flex: 1;
        color: #464646;
        line-height: .21rem;
        
        .time{
          font-size: .12rem;
        }
      }
    }

  }
  
}
.commentText{
  font-size: .12rem;
  line-height: .21rem;
  padding: 0 .12rem;
  color: #464646;
}

</style>
