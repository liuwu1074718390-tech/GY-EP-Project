// 动态路由，基于用户权限动态去加载
import Layout from '@/layout';
export default [
	{
		name: 'Laboratory',
		path: '/laboratory',
		hidden: false,
		component: Layout,
		alwaysShow: true,
		redirect: 'laboratory/icon',
		meta: {
			title: 'laboratory',
			icon: 'laboratory'
		},
		children: [
			{
				name: 'Laboratory/icon',
				path: 'laboratory/icon',
				hidden: false,
				// component: 'laboratory/icon/index',
				component: () => import('@/views/laboratory/icon/index.vue'),
				meta: {
					title: '图标',
					icon: 'icon',
					noCache: false
				}
			}
		]
	}
];
