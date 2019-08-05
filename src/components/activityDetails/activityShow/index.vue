<template>
  <div class="page">
    <div class="activityCon">
      <div class="textCon">
        <p class="title">{{getData.activityName}}</p>
        <p>
          <span>活动时间：</span>
          <span>{{getData.startDate|timeFormatting('YMD')}}-{{getData.endDate|timeFormatting('YMD')}}</span>
        </p>
        <p>
          <span>活动地址：</span>
          <span>{{getData.address}}</span>
        </p>
        <p>
          <span>报名人数：</span>
          <span><span class="num">{{getData.enrollNum}}</span>/{{getData.maxmember}}</span>
        </p>
        <p>
          <span>适龄对象：</span>
          <span>{{getData.ageSmall}}-{{getData.ageBig}}岁</span>
        </p>
        <p>
          <span>本场积分：</span>
          <span>{{getData.points}}</span>
        </p>
        <p>
          <span>举办方：</span>
          <span>{{getData.name}}</span>
        </p>
        <p v-if="getData.field1 != null">
          <!-- <span>备注1：</span> -->
          <span>{{getData.field1}}</span>
        </p>
        <p v-if="getData.field2 != null">
          <!-- <span>备注2：</span> -->
          <span>{{getData.field2}}</span>
        </p>
      </div>
      <div class="imgCon">
        <img :src="getData.img" alt="">
      </div>
    </div>
    <div class="introduce">
      <p class="introduceTitle">活动内容：</p>
      <p class="introduceText" v-if="unfoldtext" style="-webkit-box-orient: vertical;">
        {{getData.content}}
      </p>
      <p class="textshow" v-if="!unfoldtext">
      	{{getData.content}}
      </p>
      <p class="unfold" @click="unfoldShow">{{text}}>></p>
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
      }else if(type == "YMDHMS"){
      dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
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
		datail:Object,
		data:Object
  },
  data() {
    return {
			getData:{},
			unfoldtext:true,
			text:"展开"
    }
  },
//方法
  methods: {
  	unfoldShow:function(){
  		this.unfoldtext = !this.unfoldtext;
  		if(this.unfoldtext){
  			this.text = "展开";
  		}else{
  			this.text = "收起";
  		}
  	}
  },
//进入页面加载
  mounted () {
  	
  },
//计算属性
  computed: {},
//监控数据变化
  watch: {
  	datail:function(v){
  		this.getData = v;
  		console.log(this.getData)
  	}
  }
}
</script>

<style scoped lang="less">
.page{
    background-color: #fff;
    margin-top: .06rem;
}
.activityCon{
  padding: .12rem;
  display: flex;
  .textCon{
    flex: 1;
    .title{
      font-size: .14rem;
      font-weight: bold;
      color: #000;
    }
    p{
      font-size: .12rem;
      color: #aeaeae;
      line-height: .2rem;
      .num{
        color: #4993f8;
      }
    }
  }
  .imgCon{
    width: .83rem;
    height: .83rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
}

.introduce{
  padding: 0 .12rem;
  color: #464646;
  font-size: .12rem;
  line-height: .21rem;
  .introduceText{
    /*height: .63rem;*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 3;  
  }
  .unfold{
    color: #4993f8;
    text-align: right;
  }
}
</style>
