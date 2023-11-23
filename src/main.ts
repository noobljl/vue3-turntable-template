import "@/style/reset.css"
import "@/style/global.css"
import "vant/es/toast/style"
import "@/style/vantStyle.css"
import "amfe-flexible/index.js"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "@/utils/axiosWarn"
import toast from "@/utils/toast"
import VConsole from "vconsole"

const vConsole = new VConsole()

const app = createApp(App)
app.provide("$toast", toast) // 将$toast方法挂载到全局
app.use(router)

app.mount("#app")
