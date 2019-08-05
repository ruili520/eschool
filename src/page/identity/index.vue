<template>
  <div>
    <headcom title="我的宝贝" :callbackTrue="true" :callback="back"></headcom>
    <div class="relieveText"  @click="relieveTextClick">
      {{ relieveText }}
    </div>
    <div class="conter" style="margin-top: .5rem">
      <patriarch :relieve="relieve"
                   v-for="(item,index) in identityData"
                   :relieveClick = "relieveClick"
                   :identityClick = "identityClick"
                   :data="item">
      </patriarch>
    </div>
    <div class="add">
      <p @click="binding">+ 添加宝贝</p>
    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import {switchDefaultStatus,unBind} from '../../apis/app.api';
  import patriarch from "../../components/identity/patriarch"
  export default{
    //组件
    components: {
      headcom,
      patriarch
    },
    //父组件传入的数据
    props: {},
    //本地数据
    data(){
      return {
        identityData:[],
        relieve:false
      }
    },
    //方法
    methods: {
      //返回首页
      back() {
        this.$router.push('/index');
      },
      binding(){
        //this.$router.push({"name": "verification"});
        if(this.identityData.length==0){
          this.$router.push('/school');
        }else{
          this.$router.push('/joinGarten?schoolId='+this.identityData[0].schoolId+'&isShow=binding');
        }
      },
      identityClick(identityData) {
        switchDefaultStatus(identityData).then((data)=>{
          if(data.data.code == "000001"){
            this.getChildData();
          }
        })
      },
      // 改变编辑状态
      relieveTextClick() {
        if(this.relieve){
          this.relieve = false;
        }else{
          this.relieve = true;
        }
      },
      //删除一个孩子
      relieveClick(relieveData){
        this.$messagebox({
          title: '提示',
          message: '您确定要解除与该孩子的绑定关系吗?',
          showCancelButton: true
        }).then((action) => {
          if(action == "confirm"){
            this.deleteRelieve(relieveData);
          }
        });
      },
      deleteRelieve(relieveData) {
        unBind({
          schoolId:relieveData.schoolId+"", stuTeaNo:relieveData.studentNo, type:'1'
        }).then((data)=>{
          if(data.data.code == "000001"){
            Toast("解绑成功");
            this.getChildData();
          }else{
            MessageBox({
              title: '提示',
              message: data.data.message
            })
          }
        })
      },
      //请求孩子数据
      getChildData(){
        var vm = this;
        this.$getBindedInfo({},function (res) {
          console.log(res)
          if(res.code == "000001"){
            if(res.result.length == 0){
              vm.$toast('您还没有绑定宝贝身份信息');
              vm.identityData = [];
              vm.$router.push('/index');
            }else{
              vm.identityData = res.result;
            }
          }
        },function (res) {

        })
      }
    } ,
    //进入页面加载
    mounted () {
      //判断是否有孩子信息
      this.getChildData();
    } ,
    //计算属性
    computed: {
      relieveText(){
        return !this.relieve?'管理':'完成'
      }
    } ,
    //监控数据变化
    watch: {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .relieveText{
    position: absolute;
    top: .12rem;
    right: .22rem;
    height: .25rem;
    font-size: .13rem;
    z-index: 9999;
  }
  .add{
    width: 100%;
  p{
    background-color: #fff;
    height: .5rem;
    margin:15px .1rem 0 .1rem;
    line-height: .5rem;
    text-align: center;
    border: .008rem dashed #aaa;
    border-radius:.06rem;
  }
  }
</style>
