<template>
	<van-nav-bar
		:title="props.title"
		:left-text="leftText"
		left-arrow
		@click-left="onClickLeft"
		fixed
		placeholder
		safe-area-inset-top
		class="navbar"
	/>
</template>

<script lang="ts" setup>
import router from "@/router"

const props = defineProps({
	title: {
		default: "数币消费鼓励金活动",
	},
	leftText: {
		default: "返回",
	},
})
const emits = defineEmits<{
	onClickLeft: []
}>()
const onClickLeft = () => {
	emits("onClickLeft")
}
</script>

<style lang="scss" scoped>
:deep(.van-icon-arrow-left) {
	color: #2e2e2e;
}
:deep(.van-nav-bar__text) {
	color: #2e2e2e;
}
</style>
