import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"
// 打包分析图，按需使用
// import { visualizer } from "rollup-plugin-visualizer"
import postCssPxToRem from "postcss-pxtorem"
import legacyPlugin from "@vitejs/plugin-legacy"

export default defineConfig(({ mode }) => {
	// 获取当前环境的配置
	const config = loadEnv(mode, "./")
	console.log(config)
	return {
		base: config.VITE_BASE,
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: mode == "production" ? true : false,
				drop_debugger: mode == "production" ? true : false,
			},
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						// 将 node_modules 中的代码单独打包成一个 JS 文件
						if (id.includes("node_modules")) {
							return id
								.toString()
								.split("node_modules/")[1]
								.split("/")[0]
								.toString()
						}
					},
					// 按资源类型分包
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/entry/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
				},
			},
		},
		plugins: [
			// 打包分析图，按需使用
			// visualizer({
			// 	emitFile: true,
			// 	filename: "stats.html",
			// 	open: true,
			// 	gzipSize: true,
			// 	brotliSize: true,
			// }),
			vue(),
			Components({
				resolvers: [VantResolver()],
			}),
			AutoImport({
				imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
				resolvers: [VantResolver()],
				dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
			}),
			legacyPlugin({
				targets: ["Chrome 64"], // 需要兼容的目标列表，可以设置多个
				modernPolyfills: true,
				// additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
			}),
		],
		css: {
			postcss: {
				plugins: [
					postCssPxToRem({
						rootValue: 37.5,
						propList: ["*"],
						exclude: /^(?!.*node_modules\/vant)/, // vant内的以375为基准
					}),
					postCssPxToRem({
						rootValue: 75,
						propList: ["*"],
						exclude: /node_modules\/vant/,
					}),
				],
			},
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			host: "0.0.0.0",
			port: 8080,
			open: true,
			hmr: {
				overlay: false,
			},
			proxy: {
				[config.VITE_API]: {
					target: config.VITE_BASE_URL,
					changeOrigin: true, // 允许跨域
					rewrite: (path) => path.replace(RegExp(`^${config.VITE_API}`), ""),
					bypass(req, res, options) {
						const proxyUrl =
							new URL(options.rewrite(req.url) || "", options.target as string)
								?.href || ""
						res.setHeader("x-res-proxyUrl", proxyUrl)
					},
				},
			},
			// proxy: {
			// 	"/mp": {
			// 		target: config.VITE_BASE_URL,
			// 		changeOrigin: true, // 允许跨域
			// 		rewrite: (path) => path.replace(/^\/mp/, ""),
			// 		bypass(req, res, options) {
			// 			const proxyUrl =
			// 				new URL(options.rewrite(req.url) || "", options.target as string)
			// 					?.href || ""
			// 			res.setHeader("x-res-proxyUrl", proxyUrl)
			// 		},
			// 	},
			// },
		},
	}
})
