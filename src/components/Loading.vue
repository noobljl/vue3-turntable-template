<template>
	<div class="loading" id="loading-instance">
		<van-overlay :show="true" :custom-style="{ opacity: 0.5 }" duration="0" />
		<div class="content">
			<span v-for="item in list" ref="itemRef">{{ item }}</span>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"

const props = defineProps(["LoadingMsg"])
const list = ref<any>(["页", "面", "加", "载", "中", ".", ".", "."])
const itemRef = ref<any>(null)

onMounted(() => {
	if (props.LoadingMsg) {
		list.value = props.LoadingMsg.split("")
	}
	for (let i = 0; i < itemRef.value.length; i++) {
		itemRef.value[i].style.animationDelay = i * 0.13 + "s"
	}
})
</script>
<style lang="less" scoped>
.loading {
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 999;
	// background-color: rgba(0, 0, 0, 0.5);
	display: none;

	.content {
		width: 50vw;
		text-align: center;
		position: fixed;
		top: 45vh;
		left: 25vw;
		font-size: 30px;
		letter-spacing: 5px;
		color: white;
		-webkit-box-reflect: below 0 -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(255, 255, 255, 0.2)));

		span {
			display: inline-block;
			animation: upDownAnimation 1.04s ease infinite;
		}
	}
}

/*上下动*/
@keyframes upDownAnimation {
	0% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
	100% {
		transform: translateY(0);
	}
}
</style>
