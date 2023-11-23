import $toast from "@/utils/toast"

//手机号格式校验
export function phoneVerification(phone: string) {
	if (phone.length === 0) {
		$toast("请输入手机号", "fail")
		return false
	}
	let reg = /^1[3456789]\d{9}$/
	if (!reg.test(phone)) {
		$toast("手机号格式不正确", "fail")
		return false
	}
	return true
}

//验证码校验
export function randomCodeVerification(inputCode: string, randomCode: string) {
	//未输入验证码
	if (inputCode === "") {
		$toast("请输入图形验证码", "fail")
		return false
	}

	//输入验证码和生成的不一致
	if (inputCode !== randomCode) {
		$toast("图形验证码错误,请重新输入", "fail")
		return false
	}
	return true
}

//短信验证码
export function smsCodeVerification(smsCode: string) {
	if (smsCode === "" || smsCode.length === 0) {
		$toast("请输入短信验证码", "fail")
		return
	}
	if (smsCode.length !== 6) {
		$toast("短信验证码格式错误", "fail")
		return
	}
	return true
}
