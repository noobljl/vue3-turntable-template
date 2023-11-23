<template>
	<div class="record-container">
		<div class="record-form">
			<div class="record-title">
				<div class="record-title-text">领取记录</div>
				<img
					src="@/assets/img/领取记录标题@2x.png"
					alt=""
					class="record-title-img"
				/>
			</div>
			<div class="records" v-if="orderList.length">
				<div class="table-head">
					<div class="text">奖品名称</div>
					<div class="text">领取时间</div>
					<div class="text">领取状态</div>
				</div>
				<div class="table-body">
					<div
						class="table-cell"
						v-for="(item, index) in orderList"
						:key="index"
					>
						<div class="table-item prize-name">{{ item.prizeName }}</div>
						<div class="table-item time">
							{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
						</div>
						<div
							class="table-item status"
							:class="item.grantStatus ? 'success' : ''"
						>
							{{ item.grantStatus ? "已发放" : "失败" }}
						</div>
					</div>
				</div>
			</div>
			<div class="empty" v-else>暂无记录</div>
		</div>
		<img
			src="@/assets/img/关闭@2x.png"
			alt=""
			@click="closeRecord"
			class="close-btn"
		/>
	</div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs"

const props = defineProps(["orderList"])
const emits = defineEmits(["closeRecord"])
const closeRecord = () => {
	emits("closeRecord")
}
</script>

<style lang="scss" scoped>
.record-container {
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 30px;
	width: 626px;
	height: 553px;
	padding: 20px;

	.record-form {
		position: relative;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 30px;
		.record-title {
			position: relative;
			top: -26px;
			left: 50%;
			transform: translateX(-50%);
			width: 345px;
			.record-title-text {
				position: absolute;
				left: 50%;
				top: 40px;
				transform: translate(-50%, -50%);
				color: #fff;
				font-weight: bold;
				font-size: 32px;
			}

			.record-title-img {
				display: block;
				width: 345px;
			}
		}
		.records {
			height: 563px;
			padding-left: 36px;
			padding-right: 36px;
			margin-bottom: 53px;
			line-height: 45px;
			font-size: 24px;
			color: #333;
			.table-head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 42px;
				padding-right: 42px;
				background-color: #d02f21;
				border-radius: 30.5px;
				color: #fff;
				height: 61px;
			}
			.table-body {
				overflow: auto;
				margin-top: 47px;
				height: 260px;
				display: flex;
				flex-direction: column;
				gap: 35px;
				.table-cell {
					display: flex;
					justify-content: space-between;
					.table-item {
						text-align: center;
					}
					.prize-name {
						flex: 4;
					}
					.time {
						flex: 5;
					}
					.status {
						flex: 3;
					}
					.success {
						color: #d02f21;
					}
				}
			}
		}
		.empty {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 32px;
		}
	}
	.close-btn {
		position: relative;
		width: 55px;
		left: 50%;
		transform: translateX(-50%);
		top: 70px;
	}
}
</style>
