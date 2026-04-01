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
				component: () => import('@/views/dashboard/MaterialDashboard.vue'),
				name: 'Index',
				meta: { title: '驾驶舱', icon: 'dashboard', affix: true }
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
		path: '/purchase-dashboard-2',
		component: () => import('@/views/dashboard/PurchaseDashboard2.vue'),
		hidden: true,
		meta: { title: '驾驶舱2', icon: 'chart' }
	},
	{
		path: '/material-standard',
		component: Layout,
		redirect: '/material/standard',
		hidden: false,
		meta: { title: '材料标准', icon: 'goods' },
		children: [
			{
				path: 'standard',
				component: () => import('@/views/system/MaterialStandard.vue'),
				name: 'MaterialStandard',
				meta: { title: '材料标准', icon: 'goods' }
			}
		]
	},
	{
		path: '/supplier',
		component: Layout,
		redirect: '/supplier/query',
		meta: { title: '供应商查询', icon: 'user' },
		children: [
			{
				path: 'query',
				component: () => import('@/views/system/SupplierQuery.vue'),
				name: 'SupplierQuery',
				meta: { title: '供应商查询', icon: 'user' }
			}
		]
	},
	{
		path: '/supplier/detail/:id',
		component: () => import('@/views/system/SupplierDetail.vue'),
		name: 'SupplierDetail',
		hidden: true,
		meta: { title: '供应商详情', icon: 'user' }
	},
	{
		path: '/material/detail',
		component: () => import('@/views/dashboard/MaterialDetail.vue'),
		name: 'MaterialDetail',
		hidden: true,
		meta: { title: '材价详情' }
	},
	{
		path: '/material-price/create',
		component: () => import('@/views/dashboard/MaterialPriceCreate.vue'),
		name: 'MaterialPriceCreate',
		hidden: true,
		meta: { title: '新增材价' }
	}
];
