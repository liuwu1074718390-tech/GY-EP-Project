import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import createVitePlugins from './vite/plugins';
// import axios from 'axios';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd());
	const { VITE_APP_ENV, VITE_APP_BASE_API, VITE_APP_BASE_TARGRT, VITE_APP_PORT } = env;
	// console.log('VITE_APP_BASE_TARGRT', VITE_APP_BASE_TARGRT);
	return {
		define: {
			// 启用生产构建中的 hydration 不匹配详细信息
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
		},
		// 部署生产环境和开发环境下的URL。
		// 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
		// 例如 https://www.xxx.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.xxx.vip/admin/，则设置 baseUrl 为 /admin/。
		base: VITE_APP_ENV === 'production' ? '/' : '/',
		plugins: createVitePlugins(env, command === 'build', mode),
		resolve: {
			// https://cn.vitejs.dev/config/#resolve-alias
			alias: {
				// 设置路径
				'~': path.resolve(__dirname, './'),
				// 设置别名
				'@': path.resolve(__dirname, './src')
			},
			// https://cn.vitejs.dev/config/#resolve-extensions
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
		},
		// vite 相关配置
		server: {
			port: VITE_APP_PORT,
			host: true,
			open: true,
			proxy: {
				// Java后端代理（材料标准管理等模块）- 必须在通用代理之前
				'/dev-api/material': {
					target: 'http://127.0.0.1:9081',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/dev-api/, '')
				},
				// Python后端代理（默认）
				[VITE_APP_BASE_API]: {
					target: 'http://127.0.0.1:9099',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/dev-api/, '')
				}
			},
			watch: {
				usePolling: true // 如果文件系统不支持监听变化，可以尝试使用轮询
			},
			hmr: {
				overlay: false // 禁用错误覆盖层
				// clientPort: 4408 // 可以指定一个端口用于 HMR
			}
		},
		//fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
		css: {
			// loaderOptions: {
			// 	sass: {
			// 		additionalData: `@import "@/styles/variables.module.scss";`
			// 	}
			// },
			preprocessorOptions: {
				// 全局样式引入
				scss: {
					additionalData: `@import "@/styles/variables.scss";`
					// javascriptEnabled: true
				}
			},
			postcss: {
				plugins: [
					{
						postcssPlugin: 'internal:charset-removal',
						AtRule: {
							charset: atRule => {
								if (atRule.name === 'charset') {
									atRule.remove();
								}
							}
						}
					}
				]
			}
		},
		build: {
			// minify: 'terser',
			// terserOptions: {
			// 	compress: {
			// 		drop_console: VITE_APP_ENV === 'production',
			// 		drop_debugger: VITE_APP_ENV === 'production'
			// 	}
			// },
			chunkSizeWarningLimit: 1500, // 打包文件大小限制
			// manualChunks: {
			// 	vue: ['vue', 'vue-router'],
			// 	lodash: ['lodash'],
			// 	elementPlus: ['element-plus'],
			// 	echarts: ['echarts'],
			// 	axios: ['axios'],
			// 	tinymce: ['tinymce']
			// },
			rollupOptions: {
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id.toString().split('node_modules/')[1].split('/')[0].toString();
						}
					}
				}
			}
		}
	};
});
