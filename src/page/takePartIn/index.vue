<template>
  <div class="takePartIn">
    <headcom title="我参与的" ></headcom>
    <!-- 活动条 -->
    <div class="activeItemCon" v-infinite-scroll="loadBottom" infinite-scroll-disabled="allLoaded" infinite-scroll-distance="10">
      <activeItem @click.native="linkActivityDetails(item)" :buttonTrue="false" v-for="item in activityList" :data="item">
      </activeItem>
    </div>
  </div>
</template>

<script>
  import headcom from "../../components/headcom"
  import activeItem from "../../components/lombardIndex/activeItem"
  import {
    Swipe,
    SwipeItem,
    Indicator,
    MessageBox,
    Toast
  } from 'mint-ui';
  import {getTSmallbankerActivityByMyList} from "../../apis/app.api"
  export default {
    //组件
    components: {
      headcom,
      activeItem

    },
    //父组件传入的数据
    props: {},
    //本地数据
    data() {
      return {
        page:1,//分页
        activityList:[], //活动数据
        allLoaded:true, //是否全部加载完毕

      }
    },
    //方法
    methods: {
      //跳转到详情
      linkActivityDetails: function (data) {
        this.$router.push({
          "name": "activityDetails",
          "query": {
            id: data.id
          }
        });
      },
      loadBottom:function () {
        if(!thsi.allLoaded){
          console.log("触发到底加载");
          this.page++;
          this.getTSmallbankerActivityByMyList();
        }
      },
      //请求我参与活动的列表数据
      getTSmallbankerActivityByMyList: function (params) {
        Indicator.open({ spinnerType: 'fading-circle' });
        getTSmallbankerActivityByMyList({
          page:this.page,
          size:10
        }).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            console.log(data.data.result);
            let list = data.data.result.list;
            if(list.length<10){
              this.allLoaded = true;
            }else{
              this.allLoaded = false;
            }
            this.activityList = this.activityList.concat(list);
          }else{
            MessageBox("提示",data.body.message);
          }


        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
      }


    },
    //进入页面加载
    mounted() {
      this.getTSmallbankerActivityByMyList();
    },
    //计算属性
    computed: {},
    //监控数据变化
    watch: {

    }

  }

</script>

<style lang="less" scoped>


  .activeItemCon{
    margin-top: .12rem;
    background-color: #fff;

  }

</style>
