import { ToastType, showToast } from "vant"

const toast = (
	message: string,
	type: ToastType = "fail",
	duration: number = 1000,
	forbidClick: boolean = true,
	overlay: boolean = true
) => {
	showToast({
		message, //文本内容，支持通过\n换行
		type, //提示类型,可选值为 loading success fail
		duration,
		forbidClick, //是否禁止背景点击
		overlay,
	})
}

export default toast
