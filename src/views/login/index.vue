<template>
	<div class="login-container">
		<van-overlay
			:show="showOverlay"
			:custom-style="{ opacity: 0.5 }"
			duration="0"
		/>
		<img src="@/assets/img/登录背景.png" alt="" class="bg" />
		<div class="login-form-container">
			<div class="login-form">
				<div class="login-title">
					<img class="line" src="@/assets/img/椭圆5拷贝@2x.png" alt="" />
					<div class="text">登录</div>
					<img class="line" src="@/assets/img/椭圆5拷贝@2x.png" alt="" />
				</div>
				<div class="login-field">
					<van-field v-model="phone" placeholder="输入手机号码" maxlength="11">
						<template #left-icon>
							<img class="phone-img" src="@/assets/img/手机@2x.png" alt="" />
						</template>
					</van-field>
					<van-field
						v-model="inputRandomCode"
						placeholder="输入图形验证码"
						maxlength="4"
					>
						<template #left-icon>
							<img class="phone-img" src="@/assets/img/图形@2x.png" alt="" />
						</template>
						<template #extra>
							<RandomCode
								class="RandomCode"
								@randomSuccess="randomSuccess"
								:errorNum="errorNum"
							></RandomCode>
						</template>
					</van-field>
					<van-field
						v-model="smsCode"
						placeholder="输入短信验证码"
						maxlength="6"
					>
						<template #left-icon>
							<img class="phone-img" src="@/assets/img/验证码@2x.png" alt="" />
						</template>
						<template #extra>
							<div class="sms" @click="getSmsCode" v-if="!countDown">
								获取验证码
							</div>
							<div class="sms" v-else>{{ `${countDown}s` }}</div>
						</template>
					</van-field>
					<van-field />
					<div
						class="login-btn"
						:class="phone && inputRandomCode && smsCode && 'login-btn-able'"
						@click="login"
					>
						登录
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import router from "@/router"
import { API_Login, API_GetSmsCode, API_GetStock } from "@/api/user"
import {
	randomCodeVerification,
	phoneVerification,
	smsCodeVerification,
} from "@/utils/verification"
import { debounce } from "@/utils/debounceThrottle"
import itemCode from "@/api/itemCode"
import RandomCode from "@/components/RandomCode.vue"
import { areaLimit } from "@/utils/areaLimit"
const $toast: any = inject("$toast")
//地区限制
let areaLimitVisible: boolean = false
//用户手机号
const phone = ref<string>("")
//短息验证码
const smsCode = ref<string>("")
//输入的图形验证码
const inputRandomCode = ref<string>("")
//生成的图形验证码
const randomCode = ref<string>("")
//获取验证码 倒计时
const countDown = ref<number>(0)
//图形验证码错误次数
const errorNum = ref<number>(0)
//倒计时timer
const timer = ref<any>(null)
// 禁止点击遮罩层
const showOverlay = ref<boolean>(true)

//接收生成的随机数
const randomSuccess = (randomNum: string) => {
	randomCode.value = randomNum
	// localStorage.setItem("abc", window.btoa(randomNum))
}

// 获取库存
const getStock = async () => {
	const { code, data } = await API_GetStock({ itemCode })
	if (code == 0) {
		// 1=活动开启，0=活动维护中
		if (!data.activityStatus) {
			showOverlay.value = true
			return $toast("维护中！", "fail")
		}
		// true = 没有库存，直接提示奖品已领完，不让用户输入手机号，false为奖品未领完
		if (data.activityKc) {
			showOverlay.value = true
			return $toast("奖品已领完！", "fail")
		}
		showOverlay.value = false
	}
}

const verify = () => {
	if (showOverlay.value) {
		return false
	}
	if (!areaLimitVisible) {
		$toast("您所在地区不可以参与此活动", "fail")
		return false
	}

	//手机号校验格式
	const phoneFormat = phoneVerification(phone.value)
	if (!phoneFormat) return false
	//图形验证码格式校验
	const randomCodeFormat = randomCodeVerification(
		inputRandomCode.value,
		randomCode.value
	)
	if (!randomCodeFormat) {
		//输错次数+1
		errorNum.value += 1
		//清空输入框
		inputRandomCode.value = ""
		return false
	}
	return true
}

// 已获取验证码的手机号，用来校验是否获取过验证码
let getSmsCount = ""
// 掩码手机号
//获取短信验证码
const getSmsCode = debounce(async () => {
	if (countDown.value) return
	if (!verify()) return
	const { code, data } = await API_GetSmsCode({
		phone: phone.value,
		itemCode: itemCode,
	})

	if (code === 0) {
		countDown.value = 60
		timer.value = setInterval(() => {
			countDown.value--
			if (!countDown.value) {
				clearInterval(timer.value)
			}
		}, 1000)
		getSmsCount = phone.value
		return $toast("获取验证码成功！", "success")
	}
}, 500)

//登录
const login = debounce(async () => {
	if (!phone.value || !smsCode.value || !inputRandomCode.value) {
		return
	}
	if (getSmsCount !== phone.value) {
		return $toast("请先获取验证码", "fail")
	}
	//短信验证码格式校验
	const smsCodeFormat = smsCodeVerification(smsCode.value)
	if (!smsCodeFormat) {
		errorNum.value += 1
		inputRandomCode.value = ""
		return
	}
	const { code, data } = await API_Login({
		itemCode,
		phone: phone.value,
		smsCode: smsCode.value,
	})
	if (code == 0) {
		localStorage.setItem("phone", phone.value)
		localStorage.setItem(itemCode + "token", data.token)
		router.replace("/home")
	}
}, 500)

//判断地区
const areaLimitInit = () => {
	//校验地区限制
	areaLimit().then((res: any) => {
		areaLimitVisible = res
		res ? getStock() : (showOverlay.value = true)
	})
}
const init = () => {
	areaLimitInit()
}
init()

onUnmounted(() => {
	clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.login-container {
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 100%;
	}
	.login-form-container {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 30px;
		width: 626px;
		height: 833px;
		padding: 20px;
		top: 473px;
		left: 50%;
		transform: translateX(-50%);

		.login-form {
			position: relative;
			width: 100%;
			height: 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			border-radius: 30px;

			.login-title {
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 46px;
				padding-top: 81px;
				width: 380px;
				margin: 0 auto;
			}

			.line {
				width: 104px;
				height: 1px;
			}

			.text {
				color: #d02f21;
				font-weight: bold;
			}

			.phone-img {
				width: 32px;
				height: 37px;
				margin-bottom: 12px;
			}

			.sms {
				color: #d02f21;
				font-size: 24px;
			}
			.login-field {
				padding-left: 55px;
				padding-right: 55px;
			}
			.login-btn {
				position: relative;
				width: 420px;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 91px;
				border-radius: 45px;
				height: 90px;
				text-align: center;
				line-height: 90px;
				color: #fff;
				font-size: 36px;
				background-color: rgba(208, 47, 33, 0.4);
			}
			.login-btn-able {
				background-color: #d02f21;
			}
		}

		.van-form {
			margin: 0 5px;
		}

		.van-field {
			padding-top: 78px;
			padding-bottom: 12px;
			align-items: center;
		}
		.van-cell {
			font-size: 28px;
		}

		.van-field:nth-child(4) {
			display: none;
		}

		:deep(input.van-field__control::-webkit-input-placeholder) {
			color: #999;
			font-size: 28px;
		}

		.van-cell::after {
			border-bottom: 5px solid #d9d9d9;
		}

		:deep(.van-field__left-icon) {
			margin-right: 21px;
			transform: translateY(10%);
		}
	}
}
</style>
