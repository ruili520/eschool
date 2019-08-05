<template>
  <div class="page" :style="{ height: contentHeight }">
    <headcom title="我的信息"></headcom>
    <div class="relieveText" @click="relieveClick">解除绑定</div>
    <div class="top" style="margin-top: .5rem">
      <p>
        <img v-if="teacher.teaHeadImg" :src="teacher.teaHeadImg" alt="" >
        <img v-else src="../../assets/img/top.png" alt="" >
      </p>
      <p>{{ teacher.schoolName }}</p>
    </div>
    <div class="content">
      <p><span>教师姓名：</span>{{ teacher.teacherName }}</p>
      <p><span>性别：</span>{{teacher.teaSex | Sex}}</p>
      <p><span>生日：</span>{{teacher.birthDate | filtersD}}</p>
      <p><span>手机号：</span>{{ teacher.phone }}</p>
      <p v-if="teacher.teaEntryDate !== null"><span>入职时间：</span>{{teacher.teaEntryDate | filtersD }}</p>
      <p v-if="teacher.teaEntryDate == null"><span>入职时间：</span> </p>

    </div>
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  import {getBindedInfo,unBind} from '../../apis/app.api';
  import {Indicator,MessageBox,Toast} from 'mint-ui';
  export default {

    data() {
      return {
        teacher:''
      };
    },
    //计算属性
    computed: {
      contentHeight(){
        return document.documentElement.clientHeight+'px'
      },
    },
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
    components: {
      headcom
    },
    mounted(){
      this.getChildData()
    },
    methods: {
      //删除一个孩子
      relieveClick(){
        MessageBox({
          title: '提示',
          message: '您确定要解除教师的绑定关系吗?',
          showCancelButton: true
        }).then((action) => {
          if(action == "confirm"){
            this.deleteRelieve();
          }
        });
      },
      deleteRelieve() {
        unBind({
          schoolId:this.teacher.schoolId+"",
          stuTeaNo:this.teacher.employNo,
          type:'2'
        }).then((data)=>{
          if(data.data.code == "000001"){
            Toast("解绑成功");
            this.$router.push('/index');
            ///this.getChildData();
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
        getBindedInfo().then((data)=>{
          if(data.data.code == "000001"){
            if(data.data.result.length == 0){
              Toast('您还没有绑定教师身份信息');
              this.teacher = '';
            }else{
              this.teacher = data.data.result[0];
            }
          }
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page{
    width: 100%;
    background: url("../../assets/img/black.png") no-repeat right .3rem bottom .46rem;
    background-size: 1.3rem 1rem;
  .relieveText{
    position: absolute;
    top: .12rem;
    right: .22rem;
    height: .25rem;
    font-size: .13rem;
    z-index: 9999;
  }
  .top {
    width: 100%;
    padding: .15rem 0;
  p{
    text-align: center;
    width: 100%;
    margin: .1rem 0;
  &:nth-of-type(1){
     width: .71rem;
     height: .71rem;
     border-radius: 50%;
     margin: auto;
  img{
    width: .71rem;
    height: .71rem;
    border-radius: 50%;
  }
  }
  &:nth-of-type(2){
     color: #434343;
     font-size: .18rem;
   }
  }
  }
  .content{
    padding: 0 .25rem;
  p{
    font-size: .16rem;
    color: #434343;
    padding: 0.1rem 0;
  }
  }
  }
</style>
