<template>
  <div class="page">
    <div class="activeCon">
      <div class="img">
        <img :src="data.img" alt="">
      </div>
      <div class="text">
        <div class="name">{{data.activityName}}</div>
        <div class="detailsCon">
          <div class="details">
            <p>
              <span>适龄对象：</span>
              <span>{{data.ageSmall}}-{{data.ageBig}}岁</span>
            </p>
            <p>
              <span>报名人数：</span>
              <span class="num">
                <span class="numTrue">{{data.enrollNum}}</span>
                <span>/{{data.maxmember}}</span>
              </span>
            </p>
            <p>
              <span>举办方：</span>
              <span>{{data.name}}</span>
            </p>
            <p>
              <span>时间：</span>
              <span>{{data.startDate|timeFormatting('YMD')}}-{{data.endDate|timeFormatting('YMD')}}</span>
            </p>
          </div>
          <div v-if="buttonTrue" class="button" @click="linkActivityDetails">
            <div>报名</div>
          </div>
        </div>
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
    buttonTrue:{
      type:Boolean,
      default:true
    },
    data:Object

  },
  data() {
    return {

    }
  },
//方法
  methods: {
    linkActivityDetails: function () {
      this.$router.push({
        "name": "activityDetails",
        "query": {
          id: this.data.id
        }
      });
    }
  },
//进入页面加载
  mounted () {
    console.log(this.data);
    
  },
//计算属性
  computed: {},
//监控数据变化
  watch: {
   
  }
}
</script>

<style scoped lang="less">
.activeCon{
  padding: .12rem 0;
  margin: 0 .12rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  .img{
    margin-right: .12rem;
    img{
      width: 1rem;
      height: 1rem;
    }
  }
  .text{
    flex: 1;
    .name{
      width: 2.4rem;
      font-size: .15rem;
      color: #464646;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .detailsCon{
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: .2rem;
      .details{
        width: 1.7rem;
        font-size: .12rem;
        color: #aeaeae;
        .numTrue{
          color: #4993f8;
        }
      }
      .button{
        div{
          background-color: #ff3442;
          color: #fff;
          border-radius: .03rem;
          padding: 3px 12px;
          font-size: .12rem;

        }
      }
    }
  }

}
</style>
