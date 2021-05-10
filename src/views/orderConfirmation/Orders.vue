<template>
  <div class="order" >
      <div class="order__price">
        实付金额 ￥{{calculations.price}}
      </div>
      <div class="order__btn" @click="()=>handleSubmitOrder(true)">
        提交订单
      </div>
    </div>
    <div class="mask" v-show="showConfirm" @click="()=>handleSubmitOrder(false)">
      <div class="mask__content" @click.stop>
        <h3 class="mask__content__title">确认离开收银台么？</h3>
        <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
        <div class="mask__content__btns">
          <div class="mask__content__btn mask__content__btn--first" @click="()=>handleConfirmOrder(true)">取消订单</div>
          <div class="mask__content__btn mask__content__btn--last" @click="()=>handleConfirmOrder(false)">确认支付</div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/commonCartEffect'
import { post } from '../../untils/request'

const useMakeOrderEffect = (productList, shopName, shopId) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (let i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product.__id, 10), num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {

    }
  }
  return { handleConfirmOrder }
}
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitOrder = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleSubmitOrder }
}
export default {
  name: 'Orders',
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(productList, shopName, shopId)
    const { showConfirm, handleSubmitOrder } = useShowMaskEffect()
    return { handleSubmitOrder, showConfirm, calculations, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
.order{
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: #FFF ;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  &__price{
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: #333;
  }
  &__btn{
    width: .98rem;
    background: #4FB0F9;
    color: #FFF;
    text-align: center;
  }
}
.mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0,0,0,0.50);
  &__content{
    position: absolute;
    width: 3rem;
    height: 1.56rem;
    background: #FFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: .04rem;
    text-align: center;
    &__title{
      margin: .24rem 0 0 0;
      font-size: .18rem;
      color: #333;
    }
    &__desc{
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: #666;
    }
    &__btns{
      margin: .24rem .58rem;
      display: flex;
    }
    &__btn{
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border: .01rem solid #4FB0F9;
      border-radius: .16rem;
      &--first{
        margin-right: .24rem;
        border: .01rem solid #4FB0F9;
        color: #4FB0F9;
      }
      &--last{
        background: #4FB0F9;
        color: #fff;
      }
    }
  }
}
</style>
