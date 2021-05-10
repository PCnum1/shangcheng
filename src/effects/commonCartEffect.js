import { useStore } from 'vuex'
import { computed } from 'vue'
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const addItemToCart = (shopId, productId, productInfo, num) => {
    store.commit('addItemToCart', {
      shopId, productId, productInfo, num
    })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (let i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    let result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.checked) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.checked) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return { cartList, addItemToCart, productList, shopName, calculations }
}
