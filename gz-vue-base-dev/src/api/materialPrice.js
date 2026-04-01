import request from '@/services/request'

const unwrap = (res) => (res && Object.prototype.hasOwnProperty.call(res, 'data') ? res.data : res)

export function validateMaterialPriceImport(rows) {
  return request({
    url: '/material/price/import/validate',
    method: 'post',
    data: { rows }
  }).then(unwrap)
}

export function commitMaterialPriceImport(payload) {
  return request({
    url: '/material/price/import/commit',
    method: 'post',
    data: payload
  }).then(unwrap)
}

export function pageMaterialPrice(query) {
  return request({
    url: '/material/price/page',
    method: 'post',
    data: query
  }).then(unwrap)
}

export function getMaterialPriceById(id) {
  return request({
    url: '/material/price/getById',
    method: 'post',
    data: { id }
  }).then(unwrap)
}

export function updateMaterialPrice(data) {
  return request({
    url: '/material/price/update',
    method: 'post',
    data
  }).then(unwrap)
}

export function deleteMaterialPrice(id) {
  return request({
    url: '/material/price/delete',
    method: 'post',
    data: { id }
  }).then(unwrap)
}

export function downloadMaterialPriceTemplate() {
  return request({
    url: '/material/price/import/template',
    method: 'get',
    responseType: 'blob'
  })
}

export function listMaterialPriceSuppliers(keyword = '') {
  return request({
    url: '/material/price/master/supplier/list',
    method: 'post',
    data: { keyword }
  }).then(unwrap)
}

export function listMaterialPriceBrands(keyword = '') {
  return request({
    url: '/material/price/master/brand/list',
    method: 'post',
    data: { keyword }
  }).then(unwrap)
}

export function listMaterialPriceProjects(keyword = '') {
  return request({
    url: '/material/price/master/project/list',
    method: 'post',
    data: { keyword }
  }).then(unwrap)
}
