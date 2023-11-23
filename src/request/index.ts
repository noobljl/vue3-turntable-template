import axios from "axios"
import router from "../router"
import $toast from "@/utils/toast"
import { createdRsa } from "@/request/rsa"
import { createdUuid } from "@/request/uuid"
import itemCode from "@/api/itemCode"
import { $showLoading, $hideLoading } from "@/utils/loading"
import prefix from "@/api/prefix"

// 创建一个 axios 实例
const service = axios.create({
	timeout: 15000, // 请求超时时间毫秒
	withCredentials: false, // 异步是否请求携带cookie
})

// 添加请求拦截器
// @ts-ignore
service.interceptors.request.use(
	async function (config) {
		$showLoading()
		// 在发送请求之前做一些事情
		if (!config.headers) {
			config.headers = null!
		}
		let status: any = true
		if (config.headers) {
			config.headers["Secret"] = await createdRsa(config.url)
		}
		//uuid
		if (config.headers) {
			config.headers["uuid"] = await createdUuid()
		}
		//token
		if (localStorage.getItem(itemCode + "token") && config.headers) {
			config.headers["Authorization"] = localStorage.getItem(itemCode + "token")
		}
		status = config
		return status
	},
	function (error) {
		$hideLoading()
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
service.interceptors.response.use(
	function (response) {
		$hideLoading()
		const { code, msg } = response.data
		// 0成功，不为0失败，-1登录失效
		if (code !== 0) {
			$toast(msg, "fail")
		}
		if (code === -1) {
			setTimeout(async () => {
				localStorage.clear()
				await router.push("/login")
			}, 2000)
		}
		return response.data
	},
	async function (error) {
		$hideLoading()
		$toast(
			error.message ? `错误信息${error.message}` : "服务器响应异常",
			"fail"
		)
		setTimeout(async () => {
			await router.replace("/error")
		}, 1500)
	}
)
export function get(url: string, data: any = {}) {
	let params = []
	for (const item in data) {
		params.push(`${item}=${data[item]}`)
	}
	url = prefix + url + (Object.keys(data).length ? "?" : "") + params.join("&")
	return service({
		url,
		method: "GET",
		data,
	})
}

export function post(url: string, data = {}) {
	url = prefix + url
	return service({
		url,
		method: "POST",
		data,
	})
}
// export default service
