import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import { readonly } from 'vue';

export default [
	pluginJs.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{ ignores: ['public/**/*', '**/components/Crontab/*', '**/views/monitor/*', '**/views/system/*'] },
	{
		languageOptions: {
			globals: Object.assign(globals.browser, globals.node, { _IPC: 'readonly' })
		},

		rules: {
			'vue/multi-word-component-names': [
				'error',
				{
					ignores: ['index', 'Link', 'Logo', '404', '401', 'Pagination', 'login', 'register']
				}
			],
			'vue/no-mutating-props': 'off',
			'vue/valid-define-emits': 'off',
			'no-unused-vars': 'off'
		}
	}
];
