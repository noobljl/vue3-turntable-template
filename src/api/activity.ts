import { get, post } from "../request"

//用户抽奖
export const API_Receive = (params: any) => post("/entrance/receive", params)

// 获取活动次数
export const API_GetActivityNum = () => post("/entrance/get/activity/num")

//订单列表
export const API_OrderList = () => post("/order/info")

// 查询是否需要支付
export const API_JudgePay = (params: any) => get("/pay/isPay", params)

//支付
export const API_Pay = (params: any) => get("/pay/getUrl", params)
