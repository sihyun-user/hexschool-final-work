const baseRequest = axios.create({
  baseURL: 'https://livejs-api.hexschool.io/api/livejs/v1/'
})

// 取得產品列表 API
const apiGetProductList = () => baseRequest.get(`/customer/${API_PATH}/products`)
// 取得購物車列表 API
const apiGetCartList = () => baseRequest.get(`/customer/${API_PATH}/carts`)
// 加入購物車產品 API
const apiAddOneProduct = payload => baseRequest.post(`/customer/${API_PATH}/carts`, payload)
// 刪除購物車產品 API
const apideleteOneProduct = productId => baseRequest.delete(`/customer/${API_PATH}/carts/${productId}`)
// 刪除全部購物車產品 API
const apideleteAllProduct = () => baseRequest.delete(`/customer/${API_PATH}/carts`)