import $toast from "@/utils/toast"
// 防抖
export class Debounce {
	private timeout: number
	private task: () => void
	private setTimeoutId: any = 0

	constructor(task: () => void, timeDelay: number) {
		this.setTimeoutId
		this.task = task
		this.timeout = timeDelay
	}

	public excute() {
		clearTimeout(this.setTimeoutId)
		this.setTimeoutId = setTimeout(() => {
			this.task()
		}, this.timeout)
	}
}

// 节流
export class Throttle {
	private timeout: number
	private task: () => void
	private setTimeoutId: any = 0
	private ok = true //是否执行
	constructor(task: () => void, timeDelay: number) {
		this.setTimeoutId
		this.task = task
		this.timeout = timeDelay
	}

	public excute() {
		if (this.ok) {
			this.task()
			this.ok = false
			setTimeout(() => {
				this.ok = true
			}, this.timeout)
		} else {
			$toast("请勿操作过快", "fail")
		}
	}
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number
) {
	let timer: ReturnType<typeof setTimeout> | null = null
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer !== null) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
			timer = null
		}, delay)
	}
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	delay: number
) {
	let timer: ReturnType<typeof setTimeout> | null = null
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer === null) {
			timer = setTimeout(() => {
				func.apply(this, args)
				timer = null
			}, delay)
		}
	}
}
