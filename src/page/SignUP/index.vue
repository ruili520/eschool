<template>
  <div class="page">
    <headcom :title=title :callbackTrue="true" :callback="back"></headcom>
    <p v-if="title=='报名'" class="history" @click="myActive()">我的报名</p>
    <div class="activeList" v-if="activeData.length>0" v-infinite-scroll="loadBottom"
         infinite-scroll-disabled="allLoaded"
         infinite-scroll-distance="10">
         <!---->
      <ul v-for="item of activeData">
        <li>
          <img :src="item.photo" alt="">
        </li>
        <li>
          <p style="font-size: 0.16rem">
            <span style="color: #464646;">{{ item.name }}</span>
            <span v-if="item.isShowSign=='1' ">已报：{{ item.amount }}人</span>
          </p>
          <p>
            <span style="float: right;" @click="signUp(item.id,item.activityType)">去报名</span>
          </p>
          <p style="margin-top:.06rem;clear: both;color: #aeaeae;font-size: .12rem">
            报名时间：
            <span>{{ item.startDate }}至{{ item.endDate }}</span>
          </p>
        </li>
      </ul>
    </div>
    <p v-else style="padding:40% 30% 0 30%">
      <img src="../../assets/img/void1.png" alt="" style="width: 100%">
    </p>
  </div>
</template>
<script>
  import headcom from "../../components/headcom"
  import { Indicator, MessageBox , Toast } from 'mint-ui';
  import { getActivityList } from "../../apis/app.api"
  import { lonIn } from "../../static/js/logIn";
  export default {
    data() {
      return {
        activeData: [
          {
            isShowSign: '1',
            amount: 1,
            activityType: '',
            startDate: '2019/7/31',
            endDate: '2019/8/1',
            photo: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=558577137,1343729075&fm=26&gp=0.jpg',
            name: '阿瓦达'
          },
          {
            isShowSign: '1',
            amount: 2,
            activityType: '',
            startDate: '2019/7/31',
            endDate: '2019/8/1',
            photo: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=558577137,1343729075&fm=26&gp=0.jpg',
            name: '部分'
          },
          {
            isShowSign: '1',
            amount: 3,
            activityType: '',
            startDate: '2019/7/31',
            endDate: '2019/8/1',
            photo: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=558577137,1343729075&fm=26&gp=0.jpg',
            name: '发'
          }
        ],
        title: '报名',
        page: 1,//分页
        allLoaded: true, //是否全部加载完毕
      };
    },
    components: {
      headcom
    },
    mounted() {
      this.getActivityList();
    },
    methods: {
      //返回首页
      back() {
        if (this.title == '报名') {
          this.$router.push('/index');
        } else {
          window.location.reload()
        }
      },
      signUp(id, activityType) {
        if (this.$route.query.authority == 1) {
          this.$router.push('/signUpDetails?activeId=' + id + '&authority=1');
        } else {
          this.$router.push('/signUpDetails?activeId=' + id);
        }
      },
      //触发到底加载
      loadBottom() {
        if (!this.allLoaded) {
          this.page = this.page + 1;
          if (this.title = '报名') {
            this.getActivityList()
          } else {
            this.myActive()
          }
        }
      },
      myActive() {
        this.title = '我的报名';
        let res = {
          schoolId: this.$route.query.school,
          type: '1', page: this.page, size: 10
        };
        Indicator.open({spinnerType: 'fading-circle'});
        this.activeData = [];

        var vm = this;
        this.$getActivityList(res, function (a) {
          console.log(a);
          Indicator.close();
          if (a.code == "000001") {
            let list = a.result.list;
            if (list.length < 10) {
              vm.allLoaded = true;
            } else {
              vm.allLoaded = false;
            }
            for (let item of list) {
              vm.activeData.push(item);
            }
          } else {
            MessageBox("提示", a.message);
          }
        }, function (a) {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      },

      getActivityList() {
        let _this = this;
        _this.title = '报名';
        let res = {
          schoolId: this.$route.query.school,
          page: _this.page, size: 10
        };
        Indicator.open({spinnerType: 'fading-circle'});
        _this.activeData = [];

        var vm = this;
        this.$getActivityList(res, function (a) {
          Indicator.close();
          if (a.code == "000001") {
            let list = a.result.list;
            if (list.length < 10) {
              _this.allLoaded = true;
            } else {
              _this.allLoaded = false;
            }
            for (let item of a.result.list) {
              _this.activeData.push(item);
            }
          } else if (a.code == "000002") {
            lonIn((a) => {
              let result = a.result;
              if (a.code == "000001") {
                _this.getActivityList();
              } else {
                MessageBox({
                  title: result.messages
                });
              }
            });
          } else {
            MessageBox("提示", a.message);
          }
        }, function (a) {
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        });
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page {
    background-color: #f5f5f5;
    font-family: PingFang-SC-Medium;
    height: 100%;
    margin-top: .44rem;
  .history {
    position: fixed;
    top: .10rem;
    right: .12rem;
    height: .25rem;
    z-index: 9999;
    color: #aeaeae;
    font-size: .12rem;
    line-height: .25rem;
  }
  .activeList{
    width: 100%;
    height: 100%;
  ul{
    background-color: #fff;
    height:.75rem;
    margin-bottom: 0.05rem;
    padding: .07rem .08rem;
  li{
    height:.65rem;
    display: inline-block;
  &:nth-of-type(1) {
     width: 26%;
  img{
    height:.65rem;
    width: .9rem;
    }
  }
  &:nth-of-type(2) {
     padding-left:.1rem;
     width:69%;
  p{
      color: #434343;
      &:nth-of-type(1) {
  span{
        &:nth-of-type(2){
        float: right;color: #aeaeae;font-size: .1rem
      }
    }
  }
  &:nth-of-type(2){
     width: 100%;
     height: .23rem;
     position: relative;
  span{
    width: .64rem;
    height: .22rem;
    position: absolute;
    right: 0;
    top: -0.03rem;
    text-align: center;
    line-height: .22rem;
    font-size: .1rem;
    color:#fff;
    background-color:#ff0000;
    border: 0.01rem solid #ff0000;
    border-radius:1px;
               }
             }
          }
          }
        }
      }
    }
  }


</style>
