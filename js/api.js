const customerRequest = axios.create({
  baseURL: `https://livejs-api.hexschool.io/api/livejs/v1/customer/${API_PATH}`
})

// 取得產品列表 API
const apiGetProductList = () => customerRequest.get(`/products`)
// 取得購物車列表 API
const apiGetCartList = () => customerRequest.get(`/carts`)
// 加入購物車產品 API
const apiAddOneProduct = payload => customerRequest.post(`/carts`, payload)
// 刪除購物車產品 API
const apideleteOneProduct = productId => customerRequest.delete(`/carts/${productId}`)
// 刪除全部購物車產品 API
const apideleteAllProduct = () => customerRequest.delete(`/carts`)
// 送出訂單 API
const apiSubmitOrder = payload => customerRequest.post(`/orders`, payload)