function Oks() {
	art.dialog('artDialog: I Love You!', function () {
		alert('Thank you!');
	});
}

//****************************************************

// 名 称：initSkin

// 说 明：初始化art.dialog的Skin

// 参 数：无

// 返 回 值：无

//****************************************************

function initSkin() {
	var d = art.dialog.defaults;

	// 按需加载要用到的皮肤，数组第一个为默认皮肤

	// 如果只使用默认皮肤，可以不填写skin

	d.skin = ['chrome', 'default', 'facebook', 'aero'];
}

//****************************************************

// 名 称：showAlertDialog

// 说 明：弹出Alert

// 参 数：content：内容(html)； fun：点击确定按钮后执行的方法，此参数可以省略

// 返 回 值：无

//****************************************************

function showAlertDialog(content, fun) {
	art.dialog({
		icon: 'alert',

		lock: true,

		skin: 'default',

		window: 'top',

		title: '提示',

		content: content,

		yesFn: fun == undefined ? true : fun
	});
}

//****************************************************

// 名 称：showOKDialog

// 说 明：弹出succeed的Alert

// 参 数：content：内容(html)； fun：点击确定按钮后执行的方法，此参数可以省略

// 返 回 值：无

//****************************************************

function showOKDialog(content, fun) {
	art.dialog({
		icon: 'succeed',

		lock: true,

		window: 'top',

		skin: 'chrome',

		title: '成功',

		content: content,

		yesFn: fun == undefined ? true : fun
	});
}

//****************************************************

// 名 称：showErrorDialog

// 说 明：弹出Error的Alert

// 参 数：content：内容(html)； fun：点击确定按钮后执行的方法，此参数可以省略

// 返 回 值：无

//****************************************************

function showErrorDialog(content, fun) {
	art.dialog({
		icon: 'error',

		lock: true,

		skin: 'chrome',

		title: '出错',

		window: 'top',

		content: content,

		yesFn: fun == undefined ? true : fun
	});
}

//****************************************************

// 名 称：showWarningDialog

// 说 明：弹出警告的Alert

// 参 数：content：内容(html)； fun：点击确定按钮后执行的方法，此参数可以省略

// 返 回 值：无

//****************************************************

function showWarningDialog(content, fun) {
	art.dialog({
		icon: 'error',

		lock: true,

		skin: 'chrome',

		title: '警告',

		window: 'top',

		content: content,

		yesFn: fun == undefined ? true : fun
	});
}

//****************************************************

// 名 称：showConfirm

// 说 明：弹出Confirm的Dialog

// 参 数：content 内容，funYes 确定函数，funNo 取消函数

// 返 回 值：无

//****************************************************

function showConfirm(content, funYes, funNo) {
	art.dialog({
		lock: true,

		icon: 'confirm',

		skin: 'chrome',

		content: content,

		title: '询问',

		yesFn: function () {
			funYes();
		},

		noFn: function () {
			funNo();
		}
	});
}

//****************************************************

// 名 称： CancelConfirm

// 说 明： 点击取消按钮时，进行相关的提示。

// 参 数：

// 返 回 值： 无

//****************************************************

function CancelConfirm() {
	if (isChange) {
		showConfirm(
			'如果未保存数据，取消时将丢失。确定要取消吗？',
			function () {
				window.close();
			},

			function () {}
		);
	} else window.close();
}

//****************************************************

// 名 称： OpenFlowWorkLookOverPage

// 说 明： 查看流程

// 参 数： 无

// 返 回 值： 无

//****************************************************

function OpenFlowWorkLookOverPage() {
	var acceptID = GetElementValue('Accept/AcceptID');

	var instanceID = GetElementValue('Accept/InstanceID');

	var flowBaseID = GetElementValue('Accept/FlowBaseID');

	var finished = GetElementValue('Accept/IsFinished');

	var contentHtml = '';

	var ajaxUrl =
		viewWorkFlowUrl + acceptID + '&InstanceID=' + instanceID + '&FlowBaseID=' + flowBaseID + '&IsFinished=' + finished;

	$.ajax({
		url: ajaxUrl,

		success: function (html) {
			contentHtml = html;

			art.dialog({
				title: '查看流程',
				skin: 'chrome',
				width: '460px',
				height: '480px',
				lock: true,
				fixed: true,
				content: contentHtml,
				id: 'workFlowLookOverPage'
			});
		},

		error: function (xmlhttprequest, textstatus, errorthrown) {
			defineWarmAlert('error！', false);
		}
	});
}

/*弹出网页
/*url:          表示请求路径
/*_id:          ID
/*_title:       标题名称
/*width:        宽度
/*height:       高度
---------------------------------------------------*/
function openDialog(url, _id, _title, _width, _height, left, top) {
	art.dialog.skin = ['green', 'default', 'facebook', 'aero'];
	art.dialog.open(
		url,
		{
			id: _id,
			title: _title,
			width: _width,
			height: _height,
			left: left + '%',
			top: top + '%',
			background: '#000000',
			opacity: 0.1,
			lock: true,
			resize: false,
			close: function () {}
		},
		false
	);
}

//回调
function windowload() {
	setTimeout('rePage()', 1000);
}

function Refresh() {
	parent.$('#query').load(window.parent.location.href + ' #query');
}
/**
刷新页面
**/
function rePage() {
	window.location.href = window.location.href.replace('#', '');
	//  window.location.href = "http://localhost:9829/DailyRecord/ThisWeeklyplanList.aspx";
	//    parent.location.reload();
	return false;
}

//窗口关闭
function OpenClose() {
	art.dialog.close();
}

//点击切换面板
var IsFixedTableLoad = 1;
function panel(obj) {
	if (obj == 0) {
		$('#table0').show();
		$('#table1').hide();
		$('#table2').hide();
		$('#table3').hide();
		$('#table4').hide();
		$('#table5').hide();
		$('#table6').hide();
	} else if (obj == 1) {
		$('#table0').hide();
		$('#table1').show();
		$('#table2').hide();
		$('#table3').hide();
		$('#table4').hide();
		$('#table5').hide();
		$('#table6').hide();
	} else if (obj == 2) {
		$('#table0').hide();
		$('#table1').hide();
		$('#table2').show();
		$('#table3').hide();
		$('#table4').hide();
		$('#table5').hide();
		$('#table6').hide();
	} else if (obj == 3) {
		$('#table0').hide();
		$('#table1').hide();
		$('#table2').hide();
		$('#table3').show();
		$('#table4').hide();
		$('#table5').hide();
		$('#table6').hide();
	} else if (obj == 4) {
		$('#table0').hide();
		$('#table1').hide();
		$('#table2').hide();
		$('#table3').hide();
		$('#table4').show();
		$('#table5').hide();
		$('#table6').hide();
	} else if (obj == 5) {
		$('#table0').hide();
		$('#table1').hide();
		$('#table2').hide();
		$('#table3').hide();
		$('#table4').hide();
		$('#table5').show();
		$('#table6').hide();
	} else if (obj == 6) {
		$('#table0').hide();
		$('#table1').hide();
		$('#table2').hide();
		$('#table3').hide();
		$('#table4').hide();
		$('#table5').hide();
		$('#table6').show();

		if (IsFixedTableLoad == 1) {
			FixedTableHeader('#dnd-example', $(window).height() - 105);
			IsFixedTableLoad = 0;
		}
	}
}

/**
Table固定表头
gv:             table id
scrollHeight:   高度
**/
function FixedTableHeader(gv, scrollHeight) {
	var gvn = $(gv).clone(true).removeAttr('id');
	$(gvn).find('tr:not(:first)').remove();
	$(gv).before(gvn);
	$(gv).find('tr:first').remove();
	$(gv).wrap(
		"<div id='FixedTable' style='width:auto;height:" +
			scrollHeight +
			"px;overflow-y: auto; overflow-x: hidden;scrollbar-face-color: #e4e4e4;scrollbar-heightlight-color: #f0f0f0;scrollbar-3dlight-color: #d6d6d6;scrollbar-arrow-color: #240024;scrollbar-darkshadow-color: #d6d6d6; padding: 0;margin: 0;'></div>"
	);
	var lie = $(gvn).find('thead').find('td').length - 1;
	var arr = $(gvn).find('thead').find('td');
	if ($('#FixedTable').height() > scrollHeight) {
		var lastwidth = $(arr[lie]).width() + 17;
		$(arr[lie]).attr('style', 'width:' + lastwidth + 'px;border-right: 0px');
	} else {
		$(arr[lie]).attr('style', 'border-right: 0px');
	}
}

//Tab标签切换
function GetTabClick(e) {
	// Loading(true);
	$('#menutab div').each(function () {
		this.className = 'Tabremovesel';
	});
	e.className = 'Tabsel';
	//  Loading(false);
}
