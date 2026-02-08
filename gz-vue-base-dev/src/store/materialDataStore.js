import { reactive } from 'vue'
import { materialPriceData, filterMaterialData as filterFn } from '@/views/dashboard/mockMaterialData'

// 创建一个响应式的 store 来管理材价数据
export const materialDataStore = reactive({
    // 所有材料数据作为主数据源
    allMaterials: [...materialPriceData],

    // 筛选方法
    filter(filters) {
        if (!filters) return [...this.allMaterials]

        let result = [...this.allMaterials]

        if (filters.materialName) {
            result = result.filter(item =>
                item.materialName.includes(filters.materialName)
            )
        }

        if (filters.specification) {
            result = result.filter(item =>
                item.specification.includes(filters.specification)
            )
        }

        if (filters.brand) {
            result = result.filter(item =>
                item.brand === filters.brand
            )
        }

        // 复用已有的筛选逻辑中其他字段
        // 由于 mockMaterialData.js 中的 filterMaterialData 是针对 导入的 const materialPriceData 编写的，
        // 我们需要在这里重新实现或者修改 mockMaterialData.js
        // 为了简单起见，我们在这里实现核心筛选，或者把 mockMaterialData 改为可接受数据源

        // 继续实现其他字段筛选...
        if (filters.purchaseTime) {
            result = result.filter(item => item.purchaseTime && item.purchaseTime.startsWith(filters.purchaseTime))
        }
        if (filters.sourceProject) {
            result = result.filter(item => item.sourceProject === filters.sourceProject)
        }
        if (filters.priceType) {
            result = result.filter(item => item.priceType === filters.priceType)
        }
        if (filters.unit) {
            result = result.filter(item => item.unit === filters.unit)
        }
        if (filters.taxRate) {
            result = result.filter(item => item.taxRate === Number(filters.taxRate))
        }
        if (filters.supplierCompany) {
            result = result.filter(item => item.supplierCompany && item.supplierCompany.includes(filters.supplierCompany))
        }
        if (filters.categoryName) {
            const target = filters.categoryName
            result = result.filter(item => {
                if (Array.isArray(target)) {
                    return target.some(name => item.categoryName && item.categoryName.includes(name))
                }
                return item.categoryName && item.categoryName.includes(target)
            })
        }

        return result
    },

    add(item) {
        // 生成 ID
        const newId = this.allMaterials.length > 0
            ? Math.max(...this.allMaterials.map(m => m.id)) + 1
            : 1
        this.allMaterials.unshift({ ...item, id: newId })
    },

    update(updatedItem) {
        const index = this.allMaterials.findIndex(item => item.id === updatedItem.id)
        if (index > -1) {
            this.allMaterials[index] = { ...updatedItem }
        }
    },

    remove(item) {
        const index = this.allMaterials.findIndex(i => i.id === item.id)
        if (index > -1) {
            this.allMaterials.splice(index, 1)
        }
    }
})
