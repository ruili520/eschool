<template>
  <div class="cook">
    <div class="title" v-if="state == 1">早餐</div>
    <div class="title" v-if="state == 2" :class="{lunch:state == 2}">中餐</div>
    <div class="title" v-if="state == 3" :class="{dinner:state == 3}">晚餐</div>
    <div class="cookCon">
      <div class="img"><img :src="img" alt=""></div>
      <div class="cookName" :class="{moreState:moreState}">
        <p v-for="item in cookName">{{item}}</p>
      </div>
    </div>
    <div v-if="this.cookName.length > 4" class="more" @click="moreClick">
      <span>{{moreText}}</span>
      <img :class="{arrows:moreState}" src="./../../../assets/img/cookbook-arrows.png" alt="">
    </div>
  </div>
</template>

<script>
// import HeaderComponent from './components/header.vue';
export default {
//引入的组件
  components: {

  },
//父组件传入的值
  props: {
    data:Object
  },
  data() {
    return {
      moreState:false,
      moreText:"展开更多",
      state:1,
      img:"",
      text:"",
      cookName:[],
      list:''
    }
  },
//方法
  methods: {
    moreClick:function(){
      this.moreState = !this.moreState;
    }
  },
//进入页面加载
  mounted () {
    this.state = this.data;
    console.log(this.state);
    //this.img = this.data.img;
    //this.text = this.data.text;

  },
//计算属性
  computed: {},
//监控数据变化
  watch: {
    moreState:function(v){
      if(v){
        this.moreText = "收起更多";
      }else{
        this.moreText = "展开更多";
      }
    },
    text:function(v){
      var val = v.split("；");
      console.log(val)
      this.cookName = val;
    }
  }
}
</script>

<style scoped lang="less">
.cook{
  background-color: #fff;
  margin: .12rem;
  padding: .12rem;
  position: relative;
  .title{
    position: absolute;
    top: -6px;
    background-color:#45B9FB;
    color: #fff;
    padding: 0rem .06rem;
    font-size: .10rem;
  }
  .lunch{
    background-color: #FBBD52;
  }
  .dinner{
    background-color: #58C662;
  }
}
.cookCon{

  display: flex;
  .img{
    margin-left: .2rem;
    width: .8rem;
    height: .8rem;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .cookName{
    padding: 0 .12rem ;
    height: .8rem;
    overflow: hidden;
    margin-left: .12rem;
    font-size: .13rem;
    line-height: .2rem;
  }
  .moreState{
    height: auto;
  }

}
.more{
  text-align: right;
  color: #ff3442;
  font-size: .13rem;
  span{
    vertical-align: middle;
  }
  img{
    transform: rotate(180deg);
    transition: all .5s;
    width: .12rem;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
  .arrows{
    transform: rotate(0deg);
  }

}
</style>
