/**
 * vite处理存服务器的图片，图片用本地的时候不需要用此方法
 * @param {String} 图片全名带后缀
 * @returns {Object} 参数的对象结构表示
 */

export function getImageUrl(imgUrl: string) {
	return new URL(`../assets/img/${imgUrl}`, import.meta.url).href
}
