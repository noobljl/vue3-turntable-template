import router from "@/router"
import $toast from "@/utils/toast"
import { $showLoading, $hideLoading } from "@/utils/loading"

export function areaLimit() {
	$showLoading()
	return new Promise((resolve, reject) => {
		//校验地区
		const geolocation = new (window as any).qq.maps.Geolocation(
			"K6ABZ-FCTCX-ZLV4Z-TTY6W-56KFE-MIFZN",
			"myapp"
		)
		geolocation.getLocation(
			(res: any) => {
				$hideLoading()
				console.log(res.city)
				//城市的话 res.city res.province
				if (["湖州市", "温州市", "杭州市"].includes(res.city)) {
					resolve(true)
				} else {
					$toast("您所在的地区无法参与该活动", "fail", 1000, true, false)
					resolve(false)
				}
			},
			(err: any) => {
				$hideLoading()
				resolve(false)
				$toast(
					"位置地理信息获取失败，请重新加载页面",
					"fail",
					1000,
					true,
					false
				)
			},
			{ timeout: 5000, failTipFlag: true }
		)
	})
}
