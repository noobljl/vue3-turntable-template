let loadingInstance = document.getElementById("loading-instance")

export const $showLoading = () => {
	loadingInstance!.style.display = "block"
}

export const $hideLoading = () => {
	loadingInstance!.style.display = "none"
}
