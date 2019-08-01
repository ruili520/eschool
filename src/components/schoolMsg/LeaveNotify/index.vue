<template>
	<div class="activity">
		<p class="time"><span>{{info.updateDate|formattingDate}}</span></p>
		<div :class="{advices1:info.isRead == 0,advices2:info.isRead == 1}" class="bag">
			<div class="title">
        <p>审批</p>
        <p>{{info.studentName}}的请假</p>
        <p>
          <span class="name">请假类型：</span>
          <span>{{info.leaveType == 2?"事假":"病假"}}</span>
        </p>
        <p>
          <span class="name">开始时间：</span>
          <span>{{info.startDateStr}} {{info.startAmPm}}</span>
        </p>
        <p>
          <span class="name">结束时间：</span>
          <span>{{info.endDateStr}} {{info.endAmPm}}</span>
        </p>
        <p class="consent" v-if="info.status == 1">已同意</p>
        <p class="refuse" v-if="info.status == 0">待审核</p>
        <p class="refuse" v-if="info.status == 2">被拒绝</p>

			</div>
			<div class="catch "  @click="toDetail">
				<p>查看详情</p>
				<span><img src="../../../assets/img/information/more.png"></span>
			</div>
		</div>
	</div>
</template>

<script>
	import { modifyMessageState } from "./../../../apis/app.api"

	export default {
		props: ['info'],
    filters:{
      //格式化时间
      formattingDate: function (timedata) {
        var date = new Date(timedata);
        var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return Month + "-" + d + " " + h + ":" + m;
      }
    },
		data() {
			return {

			}
		},
		methods: {
			toDetail() {
				// 将信息置为已读 modifyMessageState
				this.$emit('detail-router', this.info.id)
			}
		},
		created() {

		}
	}
</script>

<style lang="less" scoped>
	.activity {
		padding: .15rem .12rem;
	}

	.activity .time {
		text-align: center;
	}

	.activity .time span {
		display: block;
		line-height: .15rem;
		width: 1rem;
		background: #d5d5d5;
		font-size: .12rem;
		color: #fff;
		border-radius: .1rem;
		padding-top: .01rem;
		margin: 0 auto;
	}

	.bag {
		padding: .12rem .12rem 0 .12rem;
		border-radius: .05rem;
		margin-top: .11rem;
		background: #fff;
	}

	.advices1{
    background: url(../../../assets/img/information/unread.png) no-repeat top left,#fff;
    background-size: .22rem .22rem;
  }
  .advices2{
    background: url(../../../assets/img/information/read.png) no-repeat top left,#fff;
    background-size: .22rem .22rem;
  }

  .title{
    line-height: .26rem;
    .name{
      color: #aeaeae;
    }
    .consent{
      color: #31df7f;
    }
    .refuse{
      color: #ff3442;
    }
  }

	.catch {
		display: flex;
		justify-content: space-between;
		line-height: .38rem;
		font-size: .12rem;
		color: #333333;
	}

	.catch p {
		width: 1rem;
	}

	.catch span {
		display: block;
		margin-top: .03rem;
	}

	.catch span img {
		width: .15rem;
		vertical-align: middle;
	}

	.smalltitle {
		display: flex;
		img {
			display: block;
			width: 1.05rem;
			height: 1.05rem;
			margin-right:.06rem;
		}
	}
</style>
