// 供应商查询模块 - 模拟数据
// 复用材料分类数据，新增供应商、品牌、地区数据

/**
 * 品牌数据
 */
export const brandData = [
    { id: 1, brandName: '格兰富', brandCode: 'GF' },
    { id: 2, brandName: '威乐', brandCode: 'WILO' },
    { id: 3, brandName: '赛莱默', brandCode: 'XYL' },
    { id: 4, brandName: '凯泉', brandCode: 'KQ' },
    { id: 5, brandName: '南方泵业', brandCode: 'NF' },
    { id: 6, brandName: '西门子', brandCode: 'SIEMENS' },
    { id: 7, brandName: '施耐德', brandCode: 'SE' },
    { id: 8, brandName: 'ABB', brandCode: 'ABB' },
    { id: 9, brandName: '罗茨', brandCode: 'ROOTS' },
    { id: 10, brandName: '国产品牌', brandCode: 'DOMESTIC' }
];

/**
 * 地区数据（简化版，省-市-区三级）
 */
export const regionData = [
    {
        province: '广东省',
        cities: [
            {
                city: '广州市',
                districts: ['天河区', '越秀区', '海珠区', '荔湾区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '增城区', '从化区']
            },
            {
                city: '深圳市',
                districts: ['福田区', '罗湖区', '南山区', '宝安区', '龙岗区', '盐田区', '龙华区', '坪山区', '光明区']
            },
            {
                city: '佛山市',
                districts: ['禅城区', '南海区', '顺德区', '三水区', '高明区']
            },
            {
                city: '东莞市',
                districts: ['莞城区', '南城区', '东城区', '万江区', '石龙镇', '虎门镇', '长安镇', '厚街镇']
            }
        ]
    },
    {
        province: '浙江省',
        cities: [
            {
                city: '杭州市',
                districts: ['西湖区', '上城区', '下城区', '江干区', '拱墅区', '滨江区', '萧山区', '余杭区']
            },
            {
                city: '宁波市',
                districts: ['海曙区', '江北区', '北仑区', '镇海区', '鄞州区', '奉化区']
            }
        ]
    },
    {
        province: '江苏省',
        cities: [
            {
                city: '南京市',
                districts: ['玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区']
            },
            {
                city: '苏州市',
                districts: ['姑苏区', '虎丘区', '吴中区', '相城区', '吴江区', '昆山市', '常熟市']
            }
        ]
    },
    {
        province: '上海市',
        cities: [
            {
                city: '上海市',
                districts: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '松江区', '青浦区', '奉贤区', '金山区']
            }
        ]
    }
];

/**
 * 供应商列表数据
 */
export const supplierData = [
    {
        id: 1,
        supplierName: '广东格兰富水泵有限公司',
        categoryLevel1Id: 'c2',
        categoryLevel2Id: 'c2-1',
        categoryLevel3Id: 'c2-1-1',
        categoryNames: '水处理专用设备 / 动力驱动及输送 / 潜污提升泵 、 水处理专用设备 / 生物处理及搅拌 / 立式厌氧搅拌器',
        brandName: '格兰富',
        province: '广东省',
        city: '广州市',
        district: '天河区',
        address: '天河路123号科技园A座',
        contactPerson: '张伟',
        contactPhone: '13800138001',
        contactEmail: 'zhangwei@grundfos.cn',
        remark: '丹麦格兰富中国区授权经销商，专业提供水泵设备',
        status: '1',
        createTime: '2026-01-15 10:30:00'
    },
    {
        id: 2,
        supplierName: '深圳威乐机电设备有限公司',
        categoryLevel1Id: 'c2',
        categoryLevel2Id: 'c2-1',
        categoryLevel3Id: 'c2-1-2',
        categoryNames: '水处理专用设备 / 动力驱动及输送 / 立式多级冲洗泵',
        brandName: '威乐',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        address: '科技园南区深圳湾科技生态园',
        contactPerson: '李娜',
        contactPhone: '13800138002',
        contactEmail: 'lina@wilo.com.cn',
        remark: '德国威乐品牌中国总代理',
        status: '1',
        createTime: '2026-01-16 14:20:00'
    },
    {
        id: 3,
        supplierName: '上海赛莱默环保设备公司',
        categoryLevel1Id: 'c2',
        categoryLevel2Id: 'c2-2',
        categoryLevel3Id: 'c2-2-3',
        categoryNames: '水处理专用设备 / 生物处理及搅拌 / MBR膜组件系统 、 自动控制及仪表 / 在线监测仪表 / 智能电磁流量计',
        brandName: '赛莱默',
        province: '上海市',
        city: '上海市',
        district: '浦东新区',
        address: '张江高科技园区碧波路690号',
        contactPerson: '王强',
        contactPhone: '13800138003',
        contactEmail: 'wangqiang@xylem.com',
        remark: '美国赛莱默集团中国分公司，MBR膜技术领先',
        status: '1',
        createTime: '2026-01-17 09:15:00'
    },
    {
        id: 4,
        supplierName: '佛山凯泉泵业有限公司',
        categoryLevel1Id: 'c2',
        categoryLevel2Id: 'c2-1',
        categoryLevel3Id: 'c2-1-1',
        categoryNames: '水处理专用设备 / 动力驱动及输送 / 潜污提升泵',
        brandName: '凯泉',
        province: '广东省',
        city: '佛山市',
        district: '南海区',
        address: '狮山镇科技工业园C区',
        contactPerson: '陈敏',
        contactPhone: '13800138004',
        contactEmail: 'chenmin@kaiquan.com',
        remark: '国内知名泵业品牌，性价比高',
        status: '1',
        createTime: '2026-01-18 11:45:00'
    },
    {
        id: 5,
        supplierName: '杭州西门子自动化设备公司',
        categoryLevel1Id: 'c3',
        categoryLevel2Id: 'c3-2',
        categoryLevel3Id: 'c3-2-1',
        categoryNames: '自动控制及仪表 / 配套电控系统 / 变频启动控制柜',
        brandName: '西门子',
        province: '浙江省',
        city: '杭州市',
        district: '滨江区',
        address: '滨江区江南大道3888号',
        contactPerson: '刘洋',
        contactPhone: '13800138005',
        contactEmail: 'liuyang@siemens.com.cn',
        remark: '西门子工业自动化产品授权代理商',
        status: '1',
        createTime: '2026-01-19 16:30:00'
    },
    {
        id: 6,
        supplierName: '南京施耐德电气有限公司',
        categoryLevel1Id: 'c3',
        categoryLevel2Id: 'c3-2',
        categoryLevel3Id: 'c3-2-1',
        categoryNames: '自动控制及仪表 / 配套电控系统 / 变频启动控制柜',
        brandName: '施耐德',
        province: '江苏省',
        city: '南京市',
        district: '江宁区',
        address: '江宁开发区秣周东路9号',
        contactPerson: '赵雪',
        contactPhone: '13800138006',
        contactEmail: 'zhaoxue@se.com',
        remark: '法国施耐德电气中国区分销商',
        status: '1',
        createTime: '2026-01-20 08:50:00'
    },
    {
        id: 7,
        supplierName: '苏州ABB工业自动化公司',
        categoryLevel1Id: 'c3',
        categoryLevel2Id: 'c3-1',
        categoryLevel3Id: 'c3-1-3',
        categoryNames: '自动控制及仪表 / 在线监测仪表 / 智能电磁流量计',
        brandName: 'ABB',
        province: '江苏省',
        city: '苏州市',
        district: '工业园区',
        address: '苏州工业园区星湖街328号',
        contactPerson: '孙丽',
        contactPhone: '13800138007',
        contactEmail: 'sunli@abb.com.cn',
        remark: 'ABB集团授权经销商，提供全系列仪表产品',
        status: '1',
        createTime: '2026-01-21 13:20:00'
    },
    {
        id: 8,
        supplierName: '东莞南方泵业销售中心',
        categoryLevel1Id: 'c2',
        categoryLevel2Id: 'c2-1',
        categoryLevel3Id: 'c2-1-2',
        categoryNames: '水处理专用设备 / 动力驱动及输送 / 立式多级冲洗泵',
        brandName: '南方泵业',
        province: '广东省',
        city: '东莞市',
        district: '长安镇',
        address: '长安镇振安东路188号',
        contactPerson: '周杰',
        contactPhone: '13800138008',
        contactEmail: 'zhoujie@nanfang-pump.com',
        remark: '南方泵业股份有限公司华南区代理',
        status: '1',
        createTime: '2026-01-22 10:10:00'
    },
    {
        id: 9,
        supplierName: '广州环保设备制造厂',
        categoryLevel1Id: 'c2',
        categoryLevel2Id: 'c2-3',
        categoryLevel3Id: 'c2-3-1',
        categoryNames: '水处理专用设备 / 阀门及截流设备 / 不锈钢附壁方闸门',
        brandName: '国产品牌',
        province: '广东省',
        city: '广州市',
        district: '黄埔区',
        address: '黄埔区科学城开创大道2818号',
        contactPerson: '吴涛',
        contactPhone: '13800138009',
        contactEmail: 'wutao@gzhb.com',
        remark: '本地环保设备制造商，支持定制',
        status: '1',
        createTime: '2026-01-23 15:40:00'
    },
    {
        id: 10,
        supplierName: '宁波罗茨鼓风机有限公司',
        categoryLevel1Id: 'c3',
        categoryLevel2Id: 'c3-2',
        categoryLevel3Id: 'c3-2-2',
        categoryNames: '自动控制及仪表 / 配套电控系统 / 罗茨鼓风机电控',
        brandName: '罗茨',
        province: '浙江省',
        city: '宁波市',
        district: '北仑区',
        address: '北仑区梅山保税港区',
        contactPerson: '郑芳',
        contactPhone: '13800138010',
        contactEmail: 'zhengfang@roots.cn',
        remark: '专业生产罗茨鼓风机及配套电控系统',
        status: '1',
        createTime: '2026-01-24 09:25:00'
    },
    {
        id: 11,
        supplierName: '广州市水处理设备总汇',
        categoryLevel1Id: 'c2',
        categoryLevel2Id: 'c2-2',
        categoryLevel3Id: 'c2-2-1',
        categoryNames: '水处理专用设备 / 生物处理及搅拌 / 立式厌氧搅拌器',
        brandName: '国产品牌',
        province: '广东省',
        city: '广州市',
        district: '白云区',
        address: '白云区石井镇石槎路',
        contactPerson: '马超',
        contactPhone: '13800138011',
        contactEmail: 'machao@gzwater.com',
        remark: '综合性水处理设备供应商',
        status: '1',
        createTime: '2026-01-25 14:55:00'
    },
    {
        id: 12,
        supplierName: '深圳精密仪表科技公司',
        categoryLevel1Id: 'c3',
        categoryLevel2Id: 'c3-1',
        categoryLevel3Id: 'c3-1-1',
        categoryNames: '自动控制及仪表 / 在线监测仪表 / 荧光法溶解氧仪',
        brandName: '国产品牌',
        province: '广东省',
        city: '深圳市',
        district: '宝安区',
        address: '宝安区西乡街道固戍航空路',
        contactPerson: '林静',
        contactPhone: '13800138012',
        contactEmail: 'linjing@szjmyb.com',
        remark: '自主研发在线监测仪表，价格优势明显',
        status: '1',
        createTime: '2026-01-26 11:30:00'
    }
];
