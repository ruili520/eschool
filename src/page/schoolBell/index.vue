<template>
  <div class="main">
    <headcom :title="$route.meta.title"></headcom>
    <!--通知列表-->
    <bell v-if="notis.length" v-for='(noti, index) of notis' :key='index' :info="noti" @detail-router='toBellInfo($event)'></bell>
    <nodata v-else></nodata>
  </div>
</template>

<script>
  import headcom from "../../components/headcom";
  import nodata from "../../components/schoolMsg/noData";
  import bell from "../../components/schoolMsg/Bell";
  import { getTSchoolNoticeList } from '../../apis/app.api.js';
  import { Indicator, MessageBox, Toast } from 'mint-ui';

  export default {
    components: {
      headcom,
      nodata,
      bell,
    },
    data() {
      return {
        // 数据源
        notis: []
      }
    },
    methods: {
      // 通知详情路由：路由传参
      toBellInfo(info) {
        this.$router.push({
          name: 'schoolBellInfo',
          params: {
            noti: info
          }
        })
      },
      // 通知列表路由
      queryNotis() {
        Indicator.open({
          text: 'loading...',
          spinnerType: 'triple-bounce'
        });
        getTSchoolNoticeList({}).then((res) => {
          Indicator.close();
          if(res.body.code == "000001") {
            this.notis = res.body.result;
          } else {
            MessageBox({
              title: res.body.message
            })
          }
        }, (err) => {
          Indicator.close();
          MessageBox({
            title: "请求数据失败"
          })
        });
      }
    },
    mounted() {
      this.queryNotis();
    },
  }
</script>
