<template>
  <div class="childCon">
    <div class="name" @click="identityClick">
      <img src="./../../assets/img/child.png" alt="">
    </div>
  </div>
</template>
<script>
  import {getBindedInfo,switchDefaultStatus} from './../../apis/app.api';
  import {MessageBox,Indicator,Toast} from "mint-ui";

export default {
//引入的组件
  components: {

  },
//父组件传入的值
  props: {
    callBack:{
      type:Function,
      defaul:()=>{}
    }

  },
  filters: {
    substr: function (value) {
      if (!value) return '';
      value = value.toString().substr(-2);
      return value;
    }
  },
  data() {
    return {
      identityData:[],
      index:0 //当前用户的孩子

    }
  },
//方法
  methods: {
     identityClick:function () {
       this.index++;
       if(this.index==this.identityData.length){
         this.index = 0;
       }
        switchDefaultStatus(this.identityData[this.index]).then((data)=>{
          if(data.data.code == "000001"){
            Toast({
              message: "已切换为："+this.identityData[this.index].studentName,
              position: 'bottom'
            });
            this.callBack();
          }
        })
      },
      //请求孩子数据
      getChildData:function(){
        getBindedInfo().then((data)=>{
          if(data.data.code == "000001"){
            if(data.data.result.length == 0){
              this.identityData = [];
            }else{
              this.identityData = data.data.result;
            }
          }
        })
      }
  },
//进入页面加载
  mounted () {
    this.getChildData();
  },
//计算属性
  computed: {},
//监控数据变化
  watch: {}
}
</script>

<style scoped lang="less">
.childCon{
  position: relative;
  .name{
    font-size: 4px;
    position: absolute;
    display: inline-block;
    width: .3rem;
    height: .3rem;
    img{
      width: 100%;
      vertical-align: middle;
    }
  }
}

</style>
