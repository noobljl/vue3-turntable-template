<template>
	<div class="turntable">
		<img
			class="turntableBg"
			:class="isRotate ? 'rotate-class' : ''"
			:src="props.turntableBg"
			ref="turntableRef"
			alt=""
		/>
		<img class="pointer" :src="props.pointer" alt="" />
		<img :src="props.baseImg" alt="" class="base" />
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"

//传参
const props = defineProps([
	"prizeList",
	"pointer",
	"turntableBg",
	"baseImg",
	"prizeResult",
])

const isRotate = ref<boolean>(false)
const finalDeg = ref<number>(60)
//开始抽奖
const start = () => {
	isRotate.value = true
}
const turntableRef = ref<any>()
const end = () => {
	nextTick(() => {
		//每一瓣的度数
		const oneDeg = Math.ceil(360 / props.prizeList.length)
		//当前奖项在奖品列表的索引
		let index = props.prizeList.indexOf(props.prizeResult)
		// 根据获奖索引计算最终旋转角度
		finalDeg.value = oneDeg * index
		isRotate.value = false
		turntableRef.value.style.transform = `translate(-50%,-50%) rotate(${finalDeg.value}deg)`
	})
}
defineExpose({ start, end })
</script>
<style lang="scss" scoped>
.turntable {
	width: 644px;
	height: 644px;
	transform: rotate(0deg);
	border-radius: 50%;

	.pointer {
		width: 30%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.turntableBg {
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.base {
		position: absolute;
		top: 654px;
		width: 387px;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}
}
.rotate-class {
	position: static !important;
	animation: rotate 0.5s infinite linear;
}
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
