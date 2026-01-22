import { createUrlWithParams } from '@/utils';
import { findBy } from '@/api/purchase/file';

export const detailLinkMap = {
	//0-跳转至【切换企业】页面
	type_0: (item, callback) => {
		window.open(`/enterprise-pick`, '_blank');
		callback && callback();
	},

	// 1- 跳转至对应的【流程详情】页
	type_1: (item, callback) => {
		toDetail(item, callback);
	},

	// 2-跳转至【成员管理】-【有效成员】
	type_2: (item, callback) => {
		window.open(`/enterprise-member/valid`, '_blank');
		callback && callback();
	},

	// 3-跳转至【企业设置】-【身份管理】
	type_3: (item, callback) => {
		window.open(`/enterprise-setting/identity`, '_blank');
		callback && callback();
	},

	// 4-跳转至【投标管理】-【我的项目】-【受邀项目】
	type_4: (item, callback) => {
		window.open(`/bid-project/invited`, '_blank');
		callback && callback();
	},

	// 5-跳转至对应项目标段的操作台（供应商）
	type_5: (item, callback) => {
		let jumpField = typeof item.jumpField === 'string' ? JSON.parse(item.jumpField) : item.jumpField;
		let params = Object.assign({}, jumpField);
		let url = '/bid-project/panel';
		window.open(createUrlWithParams(url, params), '_blank');
		callback && callback();
	},

	// 6-跳转至对应项目标段的操作台（采购人/代理）-异议/质疑
	type_6: (item, callback) => {
		let jumpField = typeof item.jumpField === 'string' ? JSON.parse(item.jumpField) : item.jumpField;
		let params = Object.assign({ activeId: 'dissent_agent' }, jumpField);
		let url = '/purchase-project/panel';
		window.open(createUrlWithParams(url, params), '_blank');
		callback && callback();
	},

	// 7-跳转至对应项目标段的操作台（供应商）-异议/质疑
	type_7: (item, callback) => {
		let jumpField = typeof item.jumpField === 'string' ? JSON.parse(item.jumpField) : item.jumpField;
		let params = Object.assign({ activeId: 'dissent_supply' }, jumpField);
		let url = '/bid-project/panel';
		window.open(createUrlWithParams(url, params), '_blank');
		callback && callback();
	},

	// 8-跳转至对应的项目澄清公告详情
	type_8: (item, callback) => {
		toDetail(item, callback);
	},

	// 9-跳转至对应项目标段的开标室
	type_9: (item, callback) => {
		let jumpField = typeof item.jumpField === 'string' ? JSON.parse(item.jumpField) : item.jumpField;
		if (item.isPurchase) {
			let params = Object.assign({}, jumpField);
			let url = '/purchase-open/room';
			window.open(createUrlWithParams(url, params), '_blank');
		} else {
			let params = Object.assign({}, jumpField);
			let url = '/bid-open/room';
			window.open(createUrlWithParams(url, params), '_blank');
		}
		callback && callback();
	},

	// 10-跳转至对应项目标段的操作台（供应商）-在线谈判
	type_10: (item, callback) => {
		let jumpField = typeof item.jumpField === 'string' ? JSON.parse(item.jumpField) : item.jumpField;
		let params = Object.assign({ activeId: 'online_negotiate' }, jumpField);
		let url = '/bid-project/panel';
		window.open(createUrlWithParams(url, params), '_blank');
		callback && callback();
	},

	// 11-跳转至对应的项目结果公告详情
	type_11: (item, callback) => {
		toDetail(item, callback);
	},

	// 12-跳转至【财务管理】-【交易账单-待缴账单】
	type_12: (item, callback) => {
		// window.open(`/bid-project/panel`, '_blank');
	},

	// 13-跳转至【财务管理】-【交易账单-已缴账单】
	type_13: (item, callback) => {
		// window.open(`/bid-project/panel`, '_blank');
	},

	// 14-跳转至对应项目标段的操作台（供应商）-成交通知书
	type_14: (item, callback) => {
		let jumpField = typeof item.jumpField === 'string' ? JSON.parse(item.jumpField) : item.jumpField;
		let params = Object.assign({ activeId: 'bid_confirm_notification_supply' }, jumpField);
		let url = '/bid-project/panel';
		window.open(createUrlWithParams(url, params), '_blank');
		callback && callback();
	},

	// 15-跳转至【财务管理】-【服务订单-已支付订单】或【交易账单-已缴账单】
	type_15: (item, callback) => {
		// window.open(`/bid-project/panel`, '_blank');
	}
};

function toDetail(item, callback) {
	let jumpField = typeof item.jumpField === 'string' ? JSON.parse(item.jumpField) : item.jumpField;
	let params = Object.assign({}, jumpField);
	findBy({ businessId: params.businessId, businessType: params.businessType }).then(res => {
		if (res.data) {
			const { id, businessType, businessId, seq, businessDesc } = res.data;
			let url = '/flow/flow-detail';
			window.open(
				createUrlWithParams(url, { id, businessType, businessId, seq, name: encodeURIComponent(businessDesc) }),
				'_blank'
			);
		} else {
			let url = '/flow/flow-detail-info';
			window.open(createUrlWithParams(url, { ...params, name: encodeURIComponent(params.projectName) }), '_blank');
		}

		callback && callback();
	});
}
