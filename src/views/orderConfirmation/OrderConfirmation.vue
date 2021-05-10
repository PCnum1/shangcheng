<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Orders/>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '../../effects/commonCartEffect'
import TopArea from './TopArea.vue'
import ProductList from './ProductLists.vue'
import Orders from './Orders.vue'
export default {
  components: {
    TopArea, ProductList, Orders
  },
  name: 'OrderConfirmation',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName, calculations } = useCommonCartEffect(shopId)
    const handleBackClick = () => { router.back() }
    return { productList, shopName, calculations, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables';
@import '../../style/mixins';
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #eee;
  overflow-y: scroll;
}
</style>
