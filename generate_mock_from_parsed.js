const fs = require('fs');

// 辅助函数：生成随机价格波动
const randomPrice = (base, variance = 0.15) => {
  const min = base * (1 - variance)
  const max = base * (1 + variance)
  return Math.floor(Math.random() * (max - min) + min)
}

// 辅助函数：生成投标人列表
const generateBidders = (materialBase, count = 4) => {
  const companies = [
    '格兰富泵业（上海）有限公司',
    '威乐(中国)水泵系统有限公司',
    '凯泉泵业集团有限公司',
    '上海连成（集团）有限公司',
    '东方电气集团',
    '中联重科股份有限公司',
    '三一重工股份有限公司',
    '碧水源科技股份有限公司',
    '赛莱默（中国）有限公司',
    '西门子（中国）有限公司',
    '施耐德电气（中国）有限公司',
    'ABB（中国）有限公司'
  ]
  
  const brands = ['格兰富', '威乐', '凯泉', '连成', 'ABB', 'KSB', '丹麦APV', '碧水源', '西门子', '施耐德']
  
  const shuffled = [...companies].sort(() => Math.random() - 0.5)
  // 如果基础价格为100000（默认值），则生成一个更真实的随机基准
  const realBase = materialBase === 100000 ? Math.floor(Math.random() * 80000 + 20000) : materialBase

  const bidders = shuffled.slice(0, count).map((company, index) => ({
    bidder: company,
    brand: brands[Math.floor(Math.random() * brands.length)],
    priceExcludingTax: randomPrice(realBase, 0.2),
    taxRate: 13,
    note: index === 0 ? '原厂正品，质保3年' : ''
  }))
  
  // 计算含税价
  bidders.forEach(bid => {
    bid.priceIncludingTax = Math.floor(bid.priceExcludingTax * (1 + bid.taxRate / 100))
  })
  
  return bidders
}

try {
  const parsedData = JSON.parse(fs.readFileSync('parsed_data.json', 'utf8'));
  
  // 处理每个材料，补充投标信息
  parsedData.stages.forEach(stage => {
    stage.materials.forEach(material => {
      const bids = generateBidders(material.basePrice, 4);
      
      // 选择中标人
      const sortedBids = [...bids].sort((a, b) => a.priceIncludingTax - b.priceIncludingTax);
      const winningIndex = Math.random() < 0.7 ? 0 : 1; 
      const winningBid = sortedBids[winningIndex];
      
      material.bids = bids.map(bid => ({
        ...bid,
        isWinning: bid.bidder === winningBid.bidder
      }));
      
      material.winningBid = {
        bidder: winningBid.bidder,
        price: winningBid.priceIncludingTax,
        date: '2024-03-15'
      };
      
      // 生成历史价格
      const historicalProjects = [
        '西部污水处理厂项目',
        '北部水质净化中心',
        '市政污水厂扩建工程'
      ];
      
      material.historicalPrices = historicalProjects.map(projectName => {
        const historicalPrice = randomPrice(winningBid.priceIncludingTax, 0.15);
        const changeRate = ((winningBid.priceIncludingTax - historicalPrice) / historicalPrice * 100).toFixed(1);
        
        return {
          projectName,
          winningPrice: historicalPrice,
          changeRate: parseFloat(changeRate),
          winningBidder: bids[Math.floor(Math.random() * bids.length)].bidder
        };
      });
      
      // 移除临时字段
      delete material.basePrice;
    });
  });

  // 获取原始mockPurchaseData.js的内容结构，为了保留导出格式
  // 这里直接重新构建整个文件内容
  
  const projects = [parsedData]; // 将解析后的项目放入数组
  // 添加原来的第二个模拟项目以便展示跨项目切换
  projects.push({
    id: 'p2',
    name: '东部水质净化厂',
    stages: [
      {
        id: 's2-1',
        projectId: 'p2',
        name: '进水泵房',
        materials: [] 
      }
    ]
  });
  
  const fileContent = `// 采购比价模拟数据
// 自动生成于：${new Date().toISOString()}

export const purchaseProjects = ${JSON.stringify(projects, null, 2)}

// ============ 树形数据转换（用于 el-tree） ============
export const buildTreeData = () => {
  return purchaseProjects.map(project => ({
    id: project.id,
    name: project.name,
    type: 'project',
    children: project.stages.map(stage => ({
      id: stage.id,
      name: stage.name,
      type: 'stage',
      children: stage.materials ? stage.materials.map(material => ({
        id: material.id,
        name: material.name,
        type: 'material',
        data: material
      })) : []
    }))
  }))
}

// ============ 根据ID查找材料 ============
export const findMaterialById = (materialId) => {
  for (const project of purchaseProjects) {
    for (const stage of project.stages) {
      if (!stage.materials) continue;
      const material = stage.materials.find(m => m.id === materialId)
      if (material) {
        return {
          ...material,
          projectName: project.name,
          stageName: stage.name
        }
      }
    }
  }
  return null
}

// 导出默认树形数据
export const defaultTreeData = buildTreeData()
`;

  fs.writeFileSync('/Users/liuwu/Desktop/GY-EP Project/gz-vue-base-dev/src/views/dashboard/mockPurchaseData.js', fileContent);
  console.log('Successfully generated mockPurchaseData.js');

} catch (error) {
  console.error('Error generating mock data:', error);
}
