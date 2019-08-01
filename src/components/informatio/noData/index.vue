<template>
    <div class="nodata">
		<p><img src="../../../assets/img/nodata.png" /></p>
    </div>
</template>

<script>

export default {
	props:{

	},
  components: {
  },
  data(){
    return {

    }
  },
  mounted () {

  },

  methods: {

  },
  computed:{

  },
  //监控数据变化
  watch: {

  },
  //vue销毁前
  beforeDestroy(){

  }
}
</script>

<style lang="less" scoped>
.nodata{
	position: relative;
	width: 100%;
	height: 100%;
}
.nodata p{
	width: 2rem;
	height: 2.05rem;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -1rem;
	margin-left: -1rem;
}
.nodata img{
	width: 100%;
}
</style>
