<!--选择学校页面-->
<template>
  <div>
    <headcom title="选择学校"></headcom>
    <div class="search">
      <div class="seek">
        <p>
          <img src="../../assets/img/seek.png" />
          <input type="text" placeholder="学校" v-model="field" style="width: 2.6rem"/>
          <!--<img @click="close" src="../../assets/img/close.png" />-->
        </p>
        <!--<span><img @click="close" src="../assets/verifica/close.png" /></span>-->
      </div>
      <!--<span>取消</span>-->
    </div>
    <div class="design">
      <p>全部学校</p>
      <ul>
        <li v-for="(item,index) in list" @click="chooseSchool(item.schoolName,item.id,item.schoolType)">
          {{item.schoolName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import headcom from '../../components/headcom'
  export  default {
    name:'',
    components:{
      headcom
    },
    data(){
      return{
        field:'',
        page:1,
        list:[
          {schoolName:'测试学校1'},{schoolName:'测试学校2'},{schoolName:'测试学校3'},{schoolName:'测试学校4'}
        ]
      }
    },
    mounted(){
      this.getSchoolList(this.field)
    },
    methods:{
      //搜索框关闭
      close(){

      },
      //获取学校列表
      getSchoolList(schoolName){
        var vm = this;
        var obj = {
          schoolName:schoolName
        }
        this.$getSchoolList(obj,
        function (res) {
          console.log(res)
          vm.list = res.result
        },function (res) {

          })
      },
      //选择学校
      chooseSchool(name,id,schoolType){
        sessionStorage.setItem('name', JSON.stringify(name));
        sessionStorage.setItem('id', JSON.stringify(id));
        sessionStorage.setItem('schoolType', JSON.stringify(schoolType));
        if(this.$route.query.url=='signUp'){
          this.$router.push('/signUp?school='+id+'&authority='+this.$route.query.authority);
        }else if(this.$route.query.url=='schoolSummary'){
          this.$router.push('/schoolSummary?schoolId='+id);
        }else{
          this.field = name;
          //this.$router.push({"name": "verification", "query": {"type": 2}});//
          this.$router.push({"name": "joinGarten", "query": {"schoolId": id}});
        }
      }
    },
    watch:{
      field(v){
        console.log(this.field)
        this.getSchoolList(this.field)
      }
    }
  }
</script>

<style lang="less" scoped>
  input{
    background: none;
    border: none;
    outline: none;
  }
  .search{
    margin-top: .44rem;
    display: flex;
    justify-content: space-between;
    padding: .12rem .18rem;
    span{
      line-height: .4rem;
    }
  }
  .seek{
    display: flex;
    justify-content: space-between;
    width: 3.6rem;
    line-height: .4rem;
    background-color: #fff;
    border-radius: .04rem;
    text-align: left;
    padding-left: .1rem;
    font-size: .16rem;
    img{
      width: .2rem;
      vertical-align: middle;
      margin-right: .05rem;
    }
  }
  .design{
    text-indent: .07rem;
    p{
      padding: 0 .12rem .12rem .12rem;
      font-size: .12rem;
      color: #aeaeae;
    }
    ul{
      padding: 0 .12rem;
      background: #fff;
      li{
        line-height: .65rem;
        font-size: .14rem;
        color: #646464;
        border-bottom: 1px solid #ebecee;
      }
    }
  }
  .design ul li:last-child{
    border-bottom: none;
    position: relative;
  }
</style>
