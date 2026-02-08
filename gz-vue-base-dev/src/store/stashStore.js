import { reactive, watch } from 'vue'

const STASH_KEY = 'gz_material_stash_list'

// 获取初始数据
const getInitialStash = () => {
    const saved = localStorage.getItem(STASH_KEY)
    try {
        return saved ? JSON.parse(saved) : []
    } catch (e) {
        console.error('Failed to parse stash list from localStorage', e)
        return []
    }
}

export const stashStore = reactive({
    list: getInitialStash(),

    // 添加暂存
    add(item) {
        // 检查是否已存在（根据某种唯一标识，假设是条目本身或其属性组合）
        const exists = this.list.some(s =>
            s.materialName === item.materialName &&
            s.specification === item.specification &&
            s.supplierCompany === item.supplierCompany
        )

        if (!exists) {
            this.list.unshift({ ...item, stashTime: new Date().getTime() })
            return true
        }
        return false
    },

    // 移除单项
    remove(index) {
        this.list.splice(index, 1)
    },

    // 清空
    clear() {
        this.list = []
    },

    // 获取数量
    get count() {
        return this.list.length
    }
})

// 监听变动并持久化
watch(() => stashStore.list, (newList) => {
    localStorage.setItem(STASH_KEY, JSON.stringify(newList))
}, { deep: true })
