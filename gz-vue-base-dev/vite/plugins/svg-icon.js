import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default function createSvgIcon(isBuild) {
	return createSvgIconsPlugin({
		iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
		symbolId: 'icon-[dir]-[name]',
		svgoOptions: isBuild
		// inject: 'body-last',
		// customDomId: '__SVG_ICONS__',
		// maxSize: 4 * 1024
	});
}
