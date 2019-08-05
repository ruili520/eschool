<template>
  <div class="patriarch">
    <div class="title">
      <p><span style="color:#ff3442;">我是宝贝{{ data.familyTies }}</span></p>
      <p class="button" v-if="relieve" @click="relieveClick(data)">解除绑定</p>
    </div>
    <div class="patriarchCon">
      <div class="img" @click="identityClick(data)">
        <img v-if="data.stuHeadImg" :src="data.stuHeadImg" alt="" style="width: 100%;border-radius: 50%;display: inline-block;">
        <img v-else src="../../../assets/img/top.png" alt="" style="width: 100%;border-radius: 50%;display: inline-block;">
      </div>
      <div class="patriarchName" @click="identityClick(data)">
        <p style="font-size: 0.16rem">{{data.studentName}}</p>
        <p><span>学校</span><span>{{data.schoolName}}</span></p>
        <p><span>班级</span><span>{{data.className}}</span></p>
        <p><span>性别</span>
          <span>
            <img v-if="data.stuSex=='M' " src="../../../assets/img/m3.png" alt="" style="width: .12rem;margin-right: .05rem;vertical-align: middle" />
            <img v-else src="../../../assets/img/f3.png" alt="" style="width: .1rem;margin-right: .05rem;vertical-align: middle" />
          {{data.stuSex | Sex}}
          </span>
        </p>
        <p><span>生日</span><span>{{data.birthday | filtersD }}</span></p>
      </div>
    </div>
    <!--<div class="mark" v-if="data.defaultStatus == 1"></div>-->
  </div>
</template>

<script>
export default {
//引入的组件
  components: {},
//父组件传入的值
  props: {
    data:Object,
    relieve:{
      type:Boolean,
      default:false
    },
    identityClick:{
      type:Function,
      default:()=>{}
    },
    relieveClick:{
      type:Function,
      default:()=>{}
    }
  },
  data() {
    return {}
  },
//方法
  methods: {},
  filters: {
    filtersD(value) {
      if(!value){
        return false;
      }
      const padDate =function (value) {
        return value<10 ? '0' +value:value;
      };
      let date=new Date(value);
      let year = date.getFullYear();
      let month =padDate(date.getMonth()+1);
      let day = padDate(date.getDate());
      return year+'-'+month+'-'+day;
    },
    Sex(value){
      return value=='M'?'男':'女'
    }
  },
//进入页面加载
  mounted () {},
//计算属性
  computed: {},
//监控数据变化
  watch: {

  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.patriarch{
  margin:5px .1rem;
  background-color: #fff;
  border: .002rem solid #eee;
  padding:0.1rem .12rem;
  position: relative;
  border-radius: 5px;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      height: .3rem;
      font-size: 0.13rem;
      line-height: .3rem;
      &:nth-of-type(1){
        flex:3.25;
      }
      &:nth-of-type(2){
        flex:1;
        font-size: .13rem;
        text-align: center;
        color: #ff3442;
        height: .25rem;
        width: .56rem;
        line-height: .25rem;
        border: 1px solid #ff3442;
        border-radius: .05rem;
      }
    }
  }
  .patriarchCon{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img{
      margin-left: .2rem;
      width: .8rem;
      height: .8rem;
      color: #fff;
      background-size: 100% 100%;
      border-radius: 50%;
      overflow: hidden;
      text-align: center;
    }
    .patriarchName{
      padding: 0 .15rem;
      overflow: hidden;
      font-size: .13rem;
      flex: 1;
      color: #434343;
      p{
        height: .21rem;
        line-height: .21rem;
        span{
          &:nth-of-type(2){
            display: inline-block;
            float: right;
          }
        }
      }
    }
  }
}
</style>
