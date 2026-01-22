import { visualizer } from 'rollup-plugin-visualizer';

export default function createVisualizer() {
	return visualizer({
		open: true, // 注意这里要设置为true，否则无效，如果存在本地服务端口，将在打包后自动展示
		gzipSize: true,
		file: 'stats.html', //分析图生成的文件名
		brotliSize: true
	});
}
