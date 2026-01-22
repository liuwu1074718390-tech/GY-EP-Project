import vue from '@vitejs/plugin-vue';

import createAutoImport from './auto-import';
import createSvgIcon from './svg-icon';
import createCompression from './compression';
import createSetupExtend from './setup-extend';
import createVisualizer from './visualizer';

export default function createVitePlugins(viteEnv, isBuild = false, mode) {
	console.log('----------mode-----------', mode);
	const vitePlugins = [vue()];
	vitePlugins.push(createAutoImport());
	vitePlugins.push(createSetupExtend());
	mode == 'analyze' && vitePlugins.push(createVisualizer());
	vitePlugins.push(createSvgIcon(isBuild));
	isBuild && vitePlugins.push(...createCompression(viteEnv));
	return vitePlugins;
}
