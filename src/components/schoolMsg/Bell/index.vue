<template>
	<div class="activity">
		<p class="time">
			<span>{{ info.updateDate | formattingDate }}</span>
		</p>
		<div class="bag">
			<div class="title">
				<p class="label" style="font-size: .15rem;">
					<span>{{ info.title }}</span>
				</p>
				<p class="smalltitle">
					<span>{{ info.content }}</span>
				</p>
			</div>
			<div class="catch " @click="$emit('detail-router', info)">
				<p>查看详情</p>
				<span><img src="../../../assets/img/information/more.png"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['info'],
		filters: {
			//格式化时间
			formattingDate: function(timedata) {
				var date = new Date(timedata);
				var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
				var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				return Month + "-" + d + " " + h + ":" + m;
			}
		},
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

	.title {
		padding-bottom: .13rem;
		border-bottom: solid 1px #eee;
		.label {
			margin-bottom: .12rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
		font-size: .12rem;
		color: #aeaeae;
		display: flex;
		span {
			display: block;
			flex: 1;
		}
		img {
			display: block;
			width: .8rem;
			height: .8rem;
			margin-right: .06rem;
		}
	}
</style>
