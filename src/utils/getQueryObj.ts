/**
 * 获取地址栏的query参数为一个对象结构
 * @returns {Object} 参数的对象结构表示
 */
export function getQueryObj() {
	// 获取?位置
	let position = location.href.indexOf("?")
	if (position < 0) {
		return {}
	}
	// 截取?后的字符串
	let search = location.href.substring(position + 1)
	let obj: any = {}
	let arr: any = []
	let item
	let val
	arr = search.split("&")
	for (let i = arr.length; --i >= 0; ) {
		item = arr[i].split("=")
		val = item[1]
		obj[item[0]] = obj[item[0]] ? obj[item[0]] + "," + val : val
	}
	return obj
}
