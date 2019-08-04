<template>
    <section>
      <div class="groupTitle">
        <span class="groupTitleIcon"><img :src=childObject.img></span>
        <span class="groupTitleName">{{ childObject.name }}</span>
        <span v-if="childObject.index!=3" class="more" @click="goToNext(childObject.index)">更多</span>
      </div>
      <div v-if="childObject.index!=3" class="groupUl">
        <ul>
          <li style="color: #bbb;padding-top: 0.3rem;width: 100%;text-align: center;" v-if="childArray==null || childArray=='' ">
            暂无活动
          </li>
          <li v-for="item in childArray"  @click="linkSonPage(item,childObject.index)">
            <img :src=item.img alt="" />
          </li>
        </ul>
      </div>
      <div v-else class="groupBody">
        <span class="iconCon" v-for="item in childArray" @click="linkSonPage(item,childObject.index)">
          <div class="icon"><img :src="item.menuIcon" alt=""></div>
          <p class="name">{{item.menuName}}</p>
        </span>
      </div>
    </section>
</template>
<script>
  import { Swipe, SwipeItem, Indicator, MessageBox, Toast} from 'mint-ui';
  import {checkAuthority} from "../../apis/app.api";
  export default {
    props:{
      childArray:{
        type:Array,
        default:false
      },
      childObject:{
        type:Object,
        default:false
      }
    },
    data() {
        return {};
    },
    mounted(){
    },
    methods: {
      //group跳转到外部
      linkSonPage(item,index) {
        if(index==3){
          let type = "group";
          this.checkAuthority(item.id, item.menuUrl,type);
        }else{
          this.$router.push('/activityDetails?id='+item.id)
        }
      },
      //校验权限后跳转
      checkAuthority(id, url, type) {
        if (url == "") { Toast("敬请期待！");return; }
        if (id == "pass") { location.href = url;return; }
        Indicator.open({ spinnerType: "fading-circle" });
        checkAuthority({ menuId: id }).then(
          data => {
            Indicator.close();
            if (data.data.code === "0") {
              this.$router.push({name: "verification"}); return;
            } else if (data.data.code === "1") { Toast("您暂无权限访问！"); return;
            } else if (data.data.code === "2") { location.href = url; return;
            } else { MessageBox("提示", data.data.message); return;
            }
          },
          () => {
            Indicator.close();
            MessageBox("提示", "数据请求失败");
          }
        );
      },
      goToNext(index){
        //this.$emit('father',index);
        if(index==1){
          this.$router.push('/lombardIndex')
        }else{
          this.$router.push('/retrospect')
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
    section {
      padding: 0 0.12rem;
      background-color: #fff;
      margin: 0.12rem 0;
      clear: both;
      .groupTitle {
        border-bottom: 1px solid #ebecee;
        .groupTitleIcon {
          width: 0.2rem;
          display: inline-block;
          vertical-align: middle;
          img {
            width: 100%;
          }
        }
        .groupTitleName {
          vertical-align: middle;
          font-size: 0.13rem;
          line-height: 0.3rem;
          height: 0.3rem;
        }
        .more {
          vertical-align: middle;
          font-size: 14px;
          line-height: 0.32rem;
          width: 50px;
          text-align: right;
          color:#afaeae;
          padding-right: 14px;
          background: url("../../assets/img/verifica/more.png") no-repeat center right;
          background-size: 15px;
          height: 0.3rem;
          float: right;
        }
      }
      .groupUl {
        width:100%;
        height:.9rem;
        ul {
          width: 100%;
          height:.9rem;
        }
        li {
          display: table-cell;
          float: left;
          height: .9rem;
          width: 32%;
          padding: 0.1rem 0 0.1rem 2%;
          &:nth-of-type(1) {
            padding-left: 0;
          }
          img {
            width: 100%;
          }
        }
      }
      .groupBody {
        .iconCon {
          display: inline-block;
          width: 33%;
          padding: 0.12rem 0;
          .icon {
            width: 100%;
            text-align: center;
            @iconSize: 0.35rem;
            img {
              width: @iconSize;
              height: @iconSize;
            }
          }
          .name {
            font-size: 0.12rem;
            text-align: center;
          }
        }
      }
    }
</style>
