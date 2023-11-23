<template>
	<div class="popup-container">
		<img :src="props.imgSrc" alt="" class="bg-img" />
		<div class="right-icon">
			<slot name="right-icon">
				<!-- 右上角icon插槽自定义的话，需要绝对定位+定宽度20px -->
				<img
					src="@/assets/img/pop_icon_close@2x.png"
					alt=""
					class="close-icon"
					@click="closePop"
				/>
			</slot>
		</div>
		<div class="header">
			{{ props.title }}
		</div>
		<div class="content">
			<slot name="content"></slot>
		</div>
		<div class="button">
			<slot name="button"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import popImg from "@/assets/img/pop_img_bg01@2x.png"

const props = defineProps({
	title: {
		default: "",
	},
	imgSrc: {
		default: popImg,
	},
})

const emits = defineEmits(["closePop"])
const closePop = () => {
	emits("closePop")
}
</script>

<style lang="less" scoped>
.popup-container {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 566px;
	border-radius: 24px;
	z-index: 999;
	background-color: #fff;
	padding-bottom: 64px;
	color: #2e2e2e;
	.bg-img {
		width: 100%;
		display: block;
	}
	.header {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: max-content;
		top: 45px;
		font-size: 36px;
		font-weight: bold;
	}
	.right-icon {
		position: absolute;
		top: 32px;
		right: 32px;
		width: 20px;
		height: 20px;
	}
	.close-icon {
		position: absolute;
		width: 20px;
	}
	.content {
		margin-top: -50px;
	}
	.button {
		display: flex;
		justify-content: center;
	}
	::-webkit-scrollbar {
		display: none;
	}
}
</style>
