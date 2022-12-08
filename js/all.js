
const productList = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
const cartList = document.querySelector('.shoppingCart-tableList')
const discardAllBtn = document.querySelector('.discardAllBtn')

const init = () => {
  getProjectList()
  getCartList()
}

// 數字逗號分隔
const separator = (num) => {
  let str = num.toString().split('.')
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return str.join('.')
}

// ---------- 產品列表 ---------- //
let productData = []
// 產品元件
const productInfo = (item) => {
  return `
  <li class="productCard">
    <h4 class="productType">新品</h4>
    <img
      src="${item.images}"
      alt="">
    <a href="#" class="addCardBtn" data-id="${item.id}">加入購物車</a>
    <h3>${item.title}</h3>
    <del class="originPrice">NT$${separator(item.origin_price)}</del>
    <p class="nowPrice">NT$${separator(item.price)}</p>
  </li>
  `
}
// 產品清單
const renderProductList = (data) => {
  productList.innerHTML = data.map(item => productInfo(item)).join('')
}
// 選擇選單產品
const changeSelectProduct = (e) => {
  const category = e.target.value
  if (category == '全部') {
    return renderProductList(productData)
  }
  let newData = productData.filter(item => item.category == category)
  renderProductList(newData)
}
// 取得產品清單列表
const getProjectList = async() => {
  try {
    const res = await apiGetProductList()
    productData = res.data.products
    renderProductList(productData)
  } catch (error) {
    console.log('取得產品清單列表失敗', error)
  }
}
productSelect.addEventListener('change', (e) => changeSelectProduct(e))

// ---------- 購物車 ---------- //
let cartData = []
// 購物車產品元件
const productCartInfo = (item) => {
  return `
  <tr>
    <td>
      <div class="cardItem-title">
        <img src="${item.product.images}" alt="">
        <p>${item.product.title}</p>
      </div>
    </td>
    <td>NT$${separator(item.product.price)}</td>
    <td>${item.quantity}</td>
    <td>NT$${separator(item.product.price * item.quantity)}</td>
    <td class="discardBtn">
      <a href="#" class="material-icons deleteBtn" data-id="${item.id}">
        clear
      </a>
    </td>
  </tr>
  `
}
// 購物車產品清單
const renderCartList = () => {
  cartList.innerHTML = cartData.map(item => productCartInfo(item)).join('')
}
// 取得購物車列表
const getCartList = async() => {
  try {
    const res = await apiGetCartList()
    cartData = res.data.carts
    renderCartList()
  } catch (error) {
    console.log('取得購物車列表失敗', error)
  }
}
// 加入購物車產品
const addProductCart = async(e) => {
  try {
    e.preventDefault()
    const addCardBtn = e.target.closest('.addCardBtn')
    if (!addCardBtn) return
    
    const productId = e.target.getAttribute('data-id')
    let quantity = 1
    cartData.forEach(item => {
      if (item.product.id == productId) {
        quantity = item.quantity += 1
      }
    })
    
    const res = await apiAddOneProduct({ data: {productId, quantity} })
    if (!res.data.status) return
    alert('加入購物車成功')
    getCartList()
  } catch (error) {
    console.log('加入購物車失敗', error)
    alert('加入購物車失敗，請稍後再試')
  }
}
// 刪除購物車產品
const deleteOneProductCart = async(e) => {
  try {
    e.preventDefault()
    const deleteBtn = e.target.closest('.deleteBtn')
    if (!deleteBtn) return

    const productId = e.target.getAttribute('data-id')
    const res = await apideleteOneProduct(productId)

    if (!res.data.status) return
    alert('刪除一筆購物車產品成功')
    getCartList()
    cartList.innerHTML = `
    <tr>
      <td>目前無產品資料</td>
    </tr>
    `
  } catch (error) {
    console.log('刪除一筆購物車產品失敗', error)
    alert('刪除一筆購物車產品失敗，請稍後再試')
  }
}
// 刪除全部購物車產品
const deleteAllProductCart = async() => {
  try {
    e.preventDefault()
    const res = await apideleteAllProduct()

    if (!res.data.status) return
    alert('刪除全部購物車產品成功')
    getCartList()
  } catch (error) {
    console.log('刪除全部購物車產品失敗', error)
    alert('刪除全部購物車產品失敗，請稍後再試')
  }
}
productList.addEventListener('click', (e) => addProductCart(e))
cartList.addEventListener('click', (e) => deleteOneProductCart(e))
discardAllBtn.addEventListener('click', (e) => deleteAllProductCart(e))
init()