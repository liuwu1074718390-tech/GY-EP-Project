// 公共路由
import Layout from '@/layout';
export default [
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect/index.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/register',
		component: () => import('@/views/register'),
		hidden: true
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/error/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/error/401'),
		hidden: true
	},
	{
		path: '',
		component: Layout,
		redirect: '/workbench',
		children: [
			{
				path: '/index',
				component: () => import('@/views/index'),
				name: 'Index',
				meta: { title: '首页', icon: 'dashboard', affix: true }
			}
		]
	},
	{
		path: '/user',
		component: Layout,
		hidden: true,
		redirect: 'noredirect',
		children: [
			{
				path: 'profile',
				component: () => import('@/views/system/user/profile/index'),
				name: 'Profile',
				meta: { title: '个人中心', icon: 'user' }
			}
		]
	},
	{
		path: '/workbench',
		component: () => import('@/views/dashboard/Workbench.vue'),
		hidden: false,
		meta: { title: '工作台', icon: 'dashboard' }
	},
	{
		path: '/material',
		component: Layout,
		redirect: '/material/standard',
		meta: { title: '材料管理', icon: 'goods' },
		children: [
			{
				path: 'standard',
				component: () => import('@/views/system/MaterialStandard.vue'),
				name: 'MaterialStandard',
				meta: { title: '材料标准管理', icon: 'goods' }
			}
		]
	}
];
