<template>
	<div class="main" v-show="preview.show">
		<div id="modal">
			<div class="close">
				<img style="cursor:pointer;" src="../../assets/img/album-close.png" @click="toclose" />
			</div>
			<swiper class="swiper-container swip" :options="swiperOption" ref="albumSwiper">
				<!-- slides -->
				<swiper-slide class="verticalCenter" v-for="(img, idx) in preview.imgs">
					<!--lazy load: bind data-src-->
					<!--<img class="swiper-lazy swiperItem" :data-src="img">
					<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>-->
					<img class="swiperItem" :src="img" />
				</swiper-slide>
				<!-- Optional controls -->
				<!--3x 版本分页不显示，v2.5.4：这里使用的是swiper-->
				<div class="swiper-pagination swiper-pagination-white swiperagination" slot="pagination"></div>
				<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
				<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
			</swiper>
		</div>
	</div>
</template>

<script>
	require('swiper/dist/css/swiper.css');
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		props: ["preview"],
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				// swiper 配置
				swiperOption: {
					initialSlide: 0, // 初始索引，一次有效
					direction: 'horizontal', // 默认水平
					grabCursor: true, // 鼠标样式
					setWrapperSize: true, // flexbox布局
					roundLengths: true, // 边界模糊
					autoHeight: false, // 基于slide布局 - true 不能垂直居中 flex
					preventLinksPropagation: false, // 阻止拖动
					iOSEdgeSwipeDetection: true, // 阻止iOS边缘手势
					pagination: '.swiper-pagination', // 分页
					paginationClickable: true, // 分页小点可点击
					prevButton: '.swiper-button-prev', //上一张
					nextButton: '.swiper-button-next', //下一张
					mousewheelControl: true, // 鼠标滚轮控制
					observeParents: true, // 应用于Swiper的父元素
					spaceBetween: 20, // 间距20px
					//lazyLoading: true, // 懒加载
					//lazyLoadingInPrevNext: false, // 提前预加载临近 slide
				}
			}
		},
		computed: {
			// 获取 swiper
			swiper() {
				return this.$refs.albumSwiper.swiper;
			},
		},
		watch: {
			// 监听做索引切换
			preview() {
				if(this.$refs.albumSwiper != undefined) {
					// 线程覆盖避免大小图切换不同步
					setTimeout(() => {
						this.swiper.slideTo(this.preview.index, 0, false);
					}, 0);
				}
			}
		},
		methods: {
			// 关闭相册预览
			toclose() {
				this.preview.show = false;
				window.native.ManageStatusCololr("255,255,255,1", true);
			}
		},
		mounted() {
			// ------ 上下滑动都关闭 ------
			let that = this;
			var startx, starty;
			//获得角度
			function getAngle(angx, angy) {
				return Math.atan2(angy, angx) * 180 / Math.PI;
			};
			//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
			function getDirection(startx, starty, endx, endy) {
				var angx = endx - startx;
				var angy = endy - starty;
				var result = 0;
				//如果滑动距离太短
				if(Math.abs(angx) < 2 && Math.abs(angy) < 2) {
					return result;
				}
				var angle = getAngle(angx, angy);
				if(angle >= -135 && angle <= -45) {
					result = 1;
				} else if(angle > 45 && angle < 135) {
					result = 2;
				} else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
					result = 3;
				} else if(angle >= -45 && angle <= 45) {
					result = 4;
				}
				return result;
			}

			// + passive对象只在Chrome浏览器中支持
			var passiveSupported = false;
			try {
				var options = Object.defineProperty({}, "passive", {
					get: function() {
						passiveSupported = true;
					}
				});
			} catch(err) {
				console.log(err)
			}
			//手指接触屏幕
			document.addEventListener("touchstart", function(e) {
				startx = e.touches[0].pageX;
				starty = e.touches[0].pageY;
			}, passiveSupported ? {
				passive: true
			} : false);
			//手指离开屏幕
			document.addEventListener("touchend", function(e) {
				var endx, endy;
				endx = e.changedTouches[0].pageX;
				endy = e.changedTouches[0].pageY;
				var direction = getDirection(startx, starty, endx, endy);
				if(direction == 1 || direction == 2) {
					that.toclose();
				}
			}, passiveSupported ? {
				passive: true
			} : false);
		}
	}
</script>

<style scoped="scoped" lang="less">
	.main {
		opacity: 1;
		.swiperItem {
			width: 100%;
		}
		.swiperagination {
			color: #FFFFFF;
		}
		.verticalCenter {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.close {
			position: absolute;
			color: white;
			top: .2rem;
			width: 95%;
			text-align: end;
			z-index: 99;
		}
	}

	#modal {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 99999;
		background: #000;
		.swip {
			height: 100%;
		}
	}
</style>
