<template>
  <div class="childCon">
    <div class="name" @click="identityClick">
      <img src="./../../assets/img/child.png" alt="">
    </div>
  </div>
</template>
<script>
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
//方法I:
  methods: {
     identityClick() {
       var vm =this;
       this.index++;
       if(this.index==this.identityData.length){
         this.index = 0;
       }
       this.$switchDefaultInfo(vm.identityData[vm.index],function (res) {
         if(res.code == "000001"){
           vm.$toast({
             message: "已切换为："+vm.identityData[vm.index].studentName,
             position: 'bottom'
           });
           vm.callBack();
         }
       })
      },
      //请求孩子数据
      getChildData(){
       var vm =this;
       this.$getBindedInfo({},function (res) {
         if(res.code == "000001"){
           if(res.result.length == 0){
             vm.identityData = [];
           }else{
             vm.identityData = res.result;
           }
         }
       },function (res) {

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
