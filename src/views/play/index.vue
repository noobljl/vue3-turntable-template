<template>
	<div class="play-container">
		<van-overlay
			:show="showTip || showRecord || showRule || showOverlay"
			:custom-style="{ opacity: 0.5 }"
			duration="0"
		/>
		<img src="@/assets/img/转盘背景@2x.png" alt="" class="bg" />
		<turn-table
			class="turn-table"
			ref="turnTableRef"
			:prizeResult="prizeResult"
			:prizeList="prizeList"
			:pointer="pointer"
			:turntableBg="turntableBg"
			:baseImg="baseImg"
		>
		</turn-table>
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
			:src="remainNum ? drawImg : alreadyDrawImg"
			alt=""
			@click="drawStart"
			class="draw-btn"
		/>
		<div class="tip-border" v-if="showTip">
			<div class="tip fail" v-if="prizeResult == '谢谢参与'">
				很遗憾您未中奖
			</div>
			<div class="tip" v-else>恭喜您获得{{ prizeResult }}</div>
			<img
				src="@/assets/img/关闭@2x.png"
				alt=""
				@click="showTip = false"
				class="close-btn"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { API_GetActivityNum, API_Receive, API_OrderList } from "@/api/activity"
import Rule from "@/views/home/components/Rule.vue"
import Record from "@/views/home/components/Record.vue"
import TurnTable from "@/components/TurnTable.vue"
import pointer from "@/assets/img/按钮@2x.png"
import turntableBg from "@/assets/img/转盘@2x.png"
import baseImg from "@/assets/img/底座@2x.png"
import alreadyDrawImg from "@/assets/img/已抽奖@2x.png"
import drawImg from "@/assets/img/立即抽奖@2x.png"
import itemCode from "@/api/itemCode"

const $toast: any = inject("$toast")

//奖品列表
const prizeList = ref<any>([
	"6.6数币红包",
	"谢谢参与",
	"50数币红包",
	"18.8数币红包",
	"谢谢参与",
	"8.8数币红包",
])
//中奖结果
const prizeResult = ref<any>(null)
// 可用次数
const remainNum = ref<number>(0)
// 弹窗展示
const showTip = ref<boolean>(false)
const showRule = ref<boolean>(false)
const showRecord = ref<boolean>(false)
const showOverlay = ref<boolean>(false)

const orderList = reactive<any[]>([])
const getRecord = async () => {
	orderList.length = 0
	const { code, data } = await API_OrderList()
	if (code == 0) {
		orderList.push(...data)
		showRecord.value = true
	}
}

// 查询可用次数
const getActivityNum = async () => {
	const { code, data } = await API_GetActivityNum()
	if (code == 0) {
		remainNum.value = data
	}
}

const turnTableRef = ref<any>(null)
//开启抽奖
const drawStart = () => {
	if (remainNum.value < 1) {
		return $toast("无参与次数！", "fail")
	}
	// 先有转盘效果，1.5s后调接口
	turnTableRef.value.start()
	setTimeout(async () => {
		// 抽奖
		try {
			const { data, code } = await API_Receive({ itemCode })
			showOverlay.value = false
			if (code == 0) {
				prizeResult.value = data.prizeName
				turnTableRef.value.end()
				showTip.value = true
				getActivityNum()
			} else {
				prizeResult.value = "谢谢参与"
				turnTableRef.value.end()
			}
		} catch (error) {
			prizeResult.value = "谢谢参与"
			turnTableRef.value.end()
			showOverlay.value = false
		}
	}, 1500)
}

const init = () => {
	getActivityNum()
}
init()
</script>

<style lang="scss" scoped>
.play-container {
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 100%;
	}
	.turn-table {
		position: absolute;
		top: 441px;
		left: 50%;
		transform: translateX(-50%);
	}
	.draw-btn {
		position: absolute;
		top: 1199px;
		left: 50%;
		transform: translateX(-50%);
		width: 356px;
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
	.tip-border {
		position: absolute;
		top: 38%;
		left: 50%;
		transform: translateX(-50%);
		padding: 20px;
		width: 646px;
		height: 226px;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 30px;
		z-index: 999;
		.tip {
			position: relative;
			line-height: 186px;
			font-size: 32px;
			color: #d02f21;
			text-align: center;
			padding: 20px;
			background-color: #fff;
			height: 186px;
			border-radius: 30px;
		}
		.fail {
			color: #333;
		}
		.close-btn {
			position: relative;
			width: 55px;
			left: 50%;
			transform: translateX(-50%);
			top: 70px;
		}
	}
}
</style>
