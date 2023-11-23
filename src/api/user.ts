import { get, post } from "../request"

//手机号登录
export const API_Login = (params: any) => post("/login/by/code", params)

//获取短信验证码
export const API_GetSmsCode = (params: any) => post("/login/send/code", params)

//获取库存
export const API_GetStock = (params: any) =>
	get("/activity/user/get/activity/status", params)

//查询openid
export const API_QueryOpenId = (params: any) => get("/wx/openid/get", params)

//获取openid
export const API_GetOpenId = (params: any) => post("/wx/openid/read", params)
