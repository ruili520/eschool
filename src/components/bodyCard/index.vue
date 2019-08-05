<template>
    <div>
      <ul class="sideslip-wrapper" style="margin-top:10px;">
        <li v-for="(item, index) in sideslipList" :key="index" data-type='0' ref="sides">
          <div class="sideslip-content" @click="resetCurrentSide" @touchstart="touchStart" @touchend="touchEnd">
            <div class="content">
              <p class="top">
                {{ item.studentName }}
              </p>
              <p class="desc">卡号：{{ item.cardNo }}</p>
            </div>
          </div>
          <div class="delete" @click="removeSide(item.cardNo)">
            删除
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
  import { getCardList,deleteCardBind } from './../../apis/app.api';
  import {MessageBox,Indicator,Toast} from "mint-ui";
  export default {
    data() {
      return {
        sideslipList: '',
        startX: 0, // 滑动初始位置
        endX: 0 // 滑动结束位置
      };
    },
    //父组件传入的数据
    props: {
      state: Boolean
    },
    watch: {
      state:function(){
        this.getCard();
      }
    },
    mounted(){
      this.getCard()
    },
    methods: {
      getCard(){
        this.$getCardList({},function (res) {
          if(res.code == "000001"){
            this.sideslipList = res.result;
            if(this.sideslipList.length==0){
              Toast('您还未绑定考勤卡')
            }
          }else{
            MessageBox("提示",res.message);
          }
        },function (res) {
          MessageBox("提示",res);
        })
      },
      // 滑动开始
      touchStart(e) {
        // 记录滑动开始的位置
        this.startX = e.touches[0].clientX
      },
      // 滑动结束
      touchEnd(e) {
        // 记录滑动结束的位置
        this.endX = e.changedTouches[0].clientX
        // 计算滑动前后滑动后的差值
        let diffX = this.startX - this.endX
        // 获取滑动元素的父元素
        let parentElem = e.currentTarget.parentElement
        if (parentElem.dataset.type === '0' && diffX > 30) {
          this.resetPos()
          parentElem.dataset.type = 1
        } else if (parentElem.dataset.type === '1' && diffX < -30) {
          this.resetPos()
          parentElem.dataset.type = 0
        }
      },
      // 复位所有side
      resetPos() {
        let childrenEleList = this.$refs.sides
        childrenEleList.forEach(item => {
          item.dataset.type = 0
        })
      },
      // 判断是否有side左滑
      isCheck() {
        let childrenEleList = this.$refs.sides
        let len = childrenEleList.length
        for (let i = 0; i < len; i++) {
          if (childrenEleList[i].dataset.type === '1') {
            return true
          }
        }
        return false
      },
      // 点击当前side并复位
      resetCurrentSide() {
        if (!this.isCheck()) return
        this.resetPos()
      },
      // 删除某一行
      removeSide(cardNo) {
        this.resetPos();
        deleteCardBind({cardNo:cardNo}).then((data)=>{
          Indicator.close();
          if(data.data.code == "000001"){
            Toast('删除成功')
            this.getCard();
          }else{
            MessageBox("提示",data.body.message);
          }
        },()=>{
          Indicator.close();
          MessageBox({title: "请求数据失败"});
        })
        //this.sideslipList.splice(index, 1)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .sideslip-wrapper {
    overflow: hidden;
    li {
      position: relative;
      height: 1.1rem;
      padding: .15rem 0.2rem .05rem 0;
      margin-left: 1%;
      border-top: 1px solid #eee;
      box-sizing: border-box;
      margin-bottom: .05rem;
      border-radius:.1rem;
      transition: transform .1s linear;
      &:nth-of-type(3n+1) {
        background: #fff url("../../assets/img/babyCard-card1.png") no-repeat;
        background-size: 99% 1.1rem;
      }
      &:nth-of-type(3n+2) {
        background: #fff url("../../assets/img/babyCard-card2.png") no-repeat;
        background-size: 99% 1.1rem;
      }
      &:nth-of-type(3n) {
        background: #fff url("../../assets/img/babyCard-card3.png") no-repeat;
        background-size: 99% 1.1rem;
      }
      .sideslip-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .content {
          flex: 1;
          overflow: hidden;
          padding-left: 0.15rem;
          color: #fff;
          p {
            width: 100%;
            &:nth-of-type(1) {
              height: 0.6rem;
              font-size: 0.2rem;
            }
            &:nth-of-type(2) {
              text-align: right;
              font-size: 0.16rem;
            }
          }
        }
      }
      .delete {
        width: 0.8rem;
        line-height: 1.1rem;
        background-color:#FF7B7B;
        color: #fff;
        font-size: .16rem;
        text-align: center;
        position: absolute;
        right: -.8rem;
        top: -1px;
      }
    }
  }
  .sideslip-wrapper li[data-type='0'] {
    transform: translate3d(0, 0, 0);
  }
  .sideslip-wrapper li[data-type='1'] {
    transform: translate3d(-.8rem, 0, 0);
    padding-left: .8rem;
  }
</style>
