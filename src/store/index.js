import Vuex from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalCartList = () => {
  if (JSON.parse(localStorage.cartList === undefined)) {
    return {}
  } else {
    return JSON.parse(localStorage.cartList)
  }
}
export default Vuex.createStore({
  state: {
    cartList: getLocalCartList()
  },
  mutations: {
    addItemToCart(state, payload) {
      const { shopId, productId, productInfo, num } = payload
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += num
      if (num > 0) {
        product.checked = true
      }
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemCheck(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.checked = !product.checked
      setLocalCartList(state)
    },
    clearCartProduct(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    setCartChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (let key in products) {
          const product = products[key]
          product.checked = true
        }
      }
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    clearCartData(state, shopId) {
      console.log(1)
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
