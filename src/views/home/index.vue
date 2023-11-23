<template>
	<div class="home-container">
		<van-overlay
			:show="showOverlay || showRule || showRecord"
			:custom-style="{ opacity: 0.5 }"
			duration="0"
		/>

		<img src="@/assets/img/背景@2x.png" alt="" class="bg" />
		<img
			src="@/assets/img/活动规则@2x.png"
			alt=""
			@click="showRule = true"
			class="aside rule-img"
		/>
		<rule
			class="rule-comp"
			v-if="showRule"
			@closeRule="showRule = false"
		></rule>
		<img
			src="@/assets/img/领取记录@2x.png"
			alt=""
			@click="getRecord"
			class="aside record-img"
		/>
		<record
			class="rule-comp record-comp"
			v-if="showRecord"
			:orderList="orderList"
			@closeRecord="showRecord = false"
		></record>
		<img
			:src="needPay ? payImg : drawImg"
			alt=""
			@click="toPay"
			class="pay-btn"
		/>
	</div>
</template>

<script lang="ts" setup>
import { API_Pay, API_JudgePay, API_OrderList } from "@/api/activity"
import Rule from "./components/Rule.vue"
import Record from "./components/Record.vue"
import itemCode from "@/api/itemCode"
import payImg from "@/assets/img/立即支付@2x.png"
import drawImg from "@/assets/img/立即抽奖@2x.png"
import router from "@/router"

const showOverlay = ref<boolean>(false)
const showRule = ref<boolean>(false)
const showRecord = ref<boolean>(false)
const needPay = ref<boolean>(true)

const judgePay = async () => {
	const { code, data } = await API_JudgePay({ itemCode })
	if (code == 0) {
		needPay.value = data
	}
}
const orderList = reactive<any[]>([])
const getRecord = async () => {
	orderList.length = 0
	const { code, data } = await API_OrderList()
	if (code == 0) {
		orderList.push(...data)
		showRecord.value = true
	}
}
const toPay = async () => {
	if (needPay.value) {
		const { code, data } = await API_Pay({ itemCode })
		if (code == 0) {
			window.location.href = data
		}
	} else {
		router.push("/play")
	}
}

const init = () => {
	judgePay()
}
init()
</script>

<style lang="scss" scoped>
.home-container {
	.bg {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 100%;
	}
	.aside {
		position: absolute;
		right: 0;
		width: 59px;
	}
	.rule-img {
		top: 429px;
	}
	.rule-comp {
		position: fixed;
		top: 253px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
	}
	.record-img {
		top: 577px;
	}
	.record-comp {
		top: 353px;
	}
	.pay-btn {
		position: absolute;
		top: 1159px;
		left: 50%;
		transform: translateX(-50%);
		width: 356px;
	}
}
</style>
