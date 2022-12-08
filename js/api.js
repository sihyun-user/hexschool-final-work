const baseRequest = axios.create({
  baseURL: 'https://livejs-api.hexschool.io/api/livejs/v1/'
})

// 取得產品列表 API
const apiGetProjectList = () => baseRequest.get(`/customer/${API_PATH}/products`)
// 取得購物車列表 API
const apiGetCartList = () => baseRequest.get(`/customer/${API_PATH}/carts`)