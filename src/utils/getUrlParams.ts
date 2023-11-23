import $toast from "@/utils/toast"
/**
 * @param {String} 传入地址栏url
 * @returns {Object} 参数的对象结构表示
 */
export const getUrlParams = (params: string) => {
	let url = params.split("?")[1]
	if (url) {
		const urlParams = new URLSearchParams(url)
		const result = Object.fromEntries(urlParams.entries())
		console.log("参数", result)
		return result
	} else {
		$toast("参数解析失败，请重新进入页面")
		return {}
	}
}
