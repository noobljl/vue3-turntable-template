<template>
	<div class="errorPage" @touchmove.prevent>
		<div class="content">
			<img src="@/assets/404/img.png" alt="" />
			<p>页面意外丢失，请重新再试</p>
		</div>
		<div class="backText" @click="backPage">返回首页</div>
	</div>
</template>
<script lang="ts" setup>
import router from "@/router"

localStorage.clear()

//返回首页
const backPage = () => {
	router.replace("/")
}
</script>
<style lang="less" scoped>
.errorPage {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: absolute;
	background-color: white;
	font-size: 0.3rem;

	.content {
		width: 80vw;
		position: absolute;
		left: 50%;
		top: 25vh;
		transform: translateX(-50%);
		text-align: center;
		color: #999999;

		img {
			width: 100%;
		}
	}

	.backText {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 15vh;
		letter-spacing: 0.05rem;
		border-bottom: 1px solid black;
		padding-bottom: 0.02rem;
	}
}
</style>
