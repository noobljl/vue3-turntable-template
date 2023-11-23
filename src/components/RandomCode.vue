<template>
	<div
		class="random-code-container"
		:style="{ backgroundColor: bckColor }"
		@click="init"
	>
		<div class="formula">{{ formula }}</div>
	</div>
</template>
<script lang="ts" setup>
import { debounce } from "@/utils/debounceThrottle"

const emits = defineEmits(["randomSuccess"])
const props = defineProps(["errorNum"])
//随机背景颜色
const bckColor = ref<any>()
//随机数
const formula = ref<string>("")

//随机4位
const randomStr = () => {
	//封装，以便日后使用。
	//创建一个空字符，用于存放随机数/字母
	let strData = ""
	//生成随机字符库 (验证码四位，随机数三种，取公倍数12,所以循环4次。也可以是120次，1200次。)
	for (let i = 0; i < 4; i++) {
		let num = randomNum(0, 9) //生成0-9的随机数
		let az = String.fromCharCode(randomNum(97, 122)) //生成a-z
		// let AZ = String.fromCharCode(randomNum(65, 90));//生成A-Z
		//strData = strData + num + az + AZ;//将生成的字符进行字符串拼接
		strData = strData + num + az //将生成的字符进行字符串拼接
	}
	// 开始真正的随机(从随机字符库中随机取出四个)
	let str = ""
	for (let i = 0; i < 4; i++) {
		str += strData[randomNum(0, strData.length - 1)]
	}
	return str
}
//随机数
const randomNum = (min: any, max: any) => {
	return parseInt(Math.random() * (max - min) + min)
}
//随机背景颜色
const randomBgColor = (min: number, max: number) => {
	const r = randomNum(min, max)
	const g = randomNum(min, max)
	const b = randomNum(min, max)
	return `rgb(${r},${g},${b})`
}
//生成公式 返回结果
const randomFormula = (randomType: number) => {
	//随机公式
	let str = ""
	//计算结果
	let result: any = 0
	//随机数1
	const num1 = randomNum(1, 10)
	//随机数2
	const num2 = randomNum(1, 10)
	//随即运算类型 1.加法 2.减法 3.乘法
	switch (randomType) {
		case 1:
			str = num1 + "+" + num2
			result = num1 + num2
			formula.value = str + "=?"
			break
		case 2:
			//随机数1
			const num3 = randomNum(6, 10)
			//随机数2
			const num4 = randomNum(1, 5)
			str = num3 + "-" + num4
			result = num3 - num4
			formula.value = str + "=?"
			break
		case 3:
			str = num1 + "X" + num2
			result = num1 * num2
			formula.value = str + "=?"
			break
		case 4:
			str = randomStr()
			result = str
			formula.value = str
			break
	}
	//告知父组件生成的随机数结果
	emits("randomSuccess", String(result))
}
const init = debounce(() => {
	//随机生成背景颜色
	bckColor.value = randomBgColor(180, 230)
	//生成随机类型的公式
	randomFormula(randomNum(1, 5))
}, 500)

init()

//如果errorNum值变化了,代表输错了,重新刷新一下
watch(
	props,
	(newData, oldData) => {
		//生成随机类型的公式
		randomFormula(randomNum(1, 5))
	},
	{ deep: true }
)
</script>
<style lang="less" scoped>
.random-code-container {
	padding: 6px;
	width: fit-content;
	.formula {
		font-size: 30px;
		text-align: center;
		letter-spacing: 7px;
		font-weight: bold;
		color: black;
		width: fit-content;
	}
}
</style>
