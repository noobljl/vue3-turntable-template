<template>
	<div class="rule-container">
		<div class="rule-form">
			<div class="rule-title">
				<img class="line" src="@/assets/img/椭圆5拷贝@2x.png" alt="" />
				<div class="text">活动规则</div>
				<img class="line" src="@/assets/img/椭圆5拷贝@2x.png" alt="" />
			</div>
			<div class="rules">
				<div>一、活动时间：</div>
				<div>2023年8月7日-2023年9月30日</div>
				<div>二、活动内容：</div>
				<div>
					客户进入活动页面，使用工行数字人民币钱包支付0.1元即有机会获得抽取6.6-50元数字人民币红包，红包每周领取上限1000个，活动期间每人限领1次，数量有限，先到先得，领完即止。
				</div>
				<div>三、活动细则：</div>
				<div>
					1.客户使用工行数字人民币钱包进行消费时，实际支付金额大于红包面额0.01元即可抵扣使用，数字人民币红包数量有限，领完即止。
				</div>
				<div>
					2.活动期间数字人民币红包每位客户活动期内仅限参与领取一次。同一身份证号、手机号码、微信号、手机设备，其中任意一项或多项存在相同，均认定为同一用户；首次参与本活动，客户需手机号授权登录，手机号码需与开通工行数字人民币钱包手机号保持一致，因手机号码不一致导致的红包发放失败将不予补发。
				</div>
				<div>
					3.客户参与本活动，即表示其已知悉本活动规则、同意并授权工商银行湖州市分行、第三方活动服务商浙江卡赢信息科技有限公司，基于保障本次活动顺利进行、解决客户关于本次活动的咨询和疑问等活动开展目的，有权收集、查询、传输、使用客户的手机号并与客户进行联系。
				</div>
				<div>四、数字人民币红包使用细则：</div>
				<div>
					（1）数字人民币红包请在有效期内使用，有效期请以数字人民币APP中显示为准，逾期回收不予补发。
				</div>
				<div>
					（2）红包查看方式：中奖用户奖品将直接发放至参与活动时授权的手机号对应的数字人民币APP用户账号中，用户可通过数字人民币APP首页一“服务”一“消费红包”页面查看红包详细信息。因手机号码不一致导致的红包发放失败将不予补发。
				</div>
				<div>（3）红包发放规则：</div>
				<div>
					①用户开通工商银行的个人数字人民币钱包（简称“个人数字钱包”）后，红包自动存入，请确保开立个人数字钱包的手机号与参与本活动的手机号为同一个，因手机号码不一致导致的红包发放失败，将不予补发。
				</div>
				<div>
					②红包无法叠加使用。同一用户的不同个人数字人民币钱包均有红包或者同一个人数字人民币钱包有多个红包的，每次支付只能使用一个红包；同一个人数字人民币钱包的多个红包在同一商家使用的，优先使用有效期截止日临近的红包，有效期截止日相同的，优先使用金额较大的红包。
				</div>
				<div>
					③退款交易发生时，根据退款按比例退还红包金额。未超过有效期（有效期不因退款重新计算）的红包可正常使用；超过有效期的红包将不再返还。用户个人数字人民币钱包注销后发生的退款，不支持红包退还。
				</div>
				<div>
					五、本次活动由浙江卡赢信息科技有限公司提供技术与服务支持。服务商客服热线：400-060-1555（工作日9:00-18:00）法定节假日除外。
				</div>
			</div>
		</div>
		<img
			src="@/assets/img/关闭@2x.png"
			alt=""
			@click="closeRule"
			class="close-btn"
		/>
	</div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["closeRule"])
const closeRule = () => {
	emits("closeRule")
}
</script>

<style lang="scss" scoped>
.rule-container {
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 30px;
	width: 626px;
	height: 726px;
	padding: 20px;

	.rule-form {
		position: relative;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 30px;

		.rule-title {
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 46px;
			padding-top: 45px;
			width: 426px;
			font-size: 36px;
			font-weight: bold;
			color: #d02f21;
			margin: 0 auto;

			.line {
				width: 104px;
				height: 1px;
			}
		}
		.rules {
			overflow: auto;
			height: 563px;
			padding-left: 36px;
			padding-right: 36px;
			margin-top: 30px;
			margin-bottom: 53px;
			line-height: 45px;
			font-size: 24px;
			color: #333;
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
