import compression from 'vite-plugin-compression';

export default function createCompression(env) {
	const { VITE_BUILD_COMPRESS } = env;
	const plugin = [];
	if (VITE_BUILD_COMPRESS) {
		const compressList = VITE_BUILD_COMPRESS.split(',');
		if (compressList.includes('gzip')) {
			// http://doc.aaaaa.vip/aaaaa-vue/other/faq.html#使用gzip解压缩静态文件
			plugin.push(
				compression({
					verbose: true, // 是否在控制台中输出压缩结果
					disable: false,
					threshold: 1024, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
					algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
					ext: '.gz',
					deleteOriginFile: false // 源文件压缩后是否删除(我为了看压缩后的效果，先选择了true)
				})
			);
		}
		if (compressList.includes('brotli')) {
			plugin.push(
				compression({
					ext: '.br',
					algorithm: 'brotliCompress',
					deleteOriginFile: false
				})
			);
		}
	}
	return plugin;
}
