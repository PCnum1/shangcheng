<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange" />
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="()=>setCartChecked(shopId)">
          <span class="product__header__icon iconfont" v-html="calculations.allChecked ? '&#xe652;' : '&#xe66c;'">

          </span>
          全选
        </div>
        <div class="product__header__clear" ><span class="product__header__clear__btn" @click="() => clearCartProduct(shopId)">清空购物车</span></div>
      </div>
      <div v-for="item in productList" :key="item._id" class="product__item">
        <div @click="() => changeCartItemCheck(shopId, item._id )" class="product__item__checked iconfont" v-html="!item.checked ? '&#xe66c;': '&#xe652;'" />
        <img class="product__item__img" src="../../assets/near.png">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont" @click="() => {addItemToCart(shopId, item._id, item, -1)}">&#xe627;</span>
          {{item.count || 0}}
          <span class="product__number__plus iconfont" @click="() => {addItemToCart(shopId, item._id, item, 1)}">&#xe691;</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img @click="handleCartShowChange" class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png">
        <div class="check__icon__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{calculations.price}}</span>
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="`/orderConfirmation/${shopId}`">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/commonCartEffect'

const useCartEffect = (shopId) => {
  const store = useStore()
  const { calculations, productList, addItemToCart } = useCommonCartEffect(shopId)

  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemCheck', {
      shopId, productId
    })
  }
  const clearCartProduct = (shopId) => {
    store.commit('clearCartProduct', { shopId })
  }
  const setCartChecked = (shopId) => {
    store.commit('setCartChecked', { shopId })
  }
  return { calculations, productList, addItemToCart, changeCartItemCheck, clearCartProduct, setCartChecked }
}
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => { showCart.value = !showCart.value }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { calculations, addItemToCart, productList, changeCartItemCheck, clearCartProduct, setCartChecked } = useCartEffect(shopId)
    return { calculations, productList, shopId, addItemToCart, changeCartItemCheck, clearCartProduct, setCartChecked, showCart, handleCartShowChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;
}
.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bgColor;
  z-index: 2;
}
.product{
  flex: 1;
  overflow-y: scroll;
  background-color: $bgColor;
  &__header{
    line-height: .52rem;
    border-bottom: .01rem solid $content-bgColor;
    display: flex;
    font-size: .14rem;
    color: $content-fontcolor;
    &__clear{
      flex: 1;
      text-align: right;
      margin-right: .16rem;
      &__btn{
        display: inline-block;
      }
    }
    &__all{
      width: .64rem;
      margin-left: .18rem;
    }
    &__icon{
      display: inline-block;
      color: $button-color;
      font-size: .2rem;
    }
  }
  &__item{
    display: flex;
    background-color: $bgColor;
    position: relative;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &__checked{
      line-height: .5rem;
      color: $button-color;
      font-size: .2rem;
      margin-right: .2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img{
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__title{
      line-height: .2rem;
      font-size: .14rem;
      color:$content-fontcolor;
      margin: 0;
      @include ellipse;
    }
    &__price{
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &__yen{
      font-size: .12rem;
    }
    &__origin{
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-Color;
      text-decoration: line-through;
    }
    .product__number{
      position: absolute;
      right: 0;
      bottom: .12rem;
      &__minus{
        position: relative;
        top: .02rem;
        color: $medium-fontColor;
        margin-right: .05rem;
      }
      &__plus{
        position: relative;
        top: .02rem;
        color: $button-color;
        margin-left: .05rem;
      }
    }
  }
}
.check{
  display: flex;
  height: .49rem;
  line-height: .49rem;
  box-sizing: border-box;
  border-top: .01rem solid $content-bgColor;
  &__icon{
    position: relative;
    width: .84rem;
    &__img{
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag{
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      transform: scale(.7);
      transform-origin: left center;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      text-align: center;
      background: $hightlight-fontColor;
      border-radius: 1rem;
      font-size: .12rem;
    }
  }
  &__info{
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__price{
      color: $hightlight-fontColor;
      font-size: .18rem;
    }
  }
  &__btn{
    width: .98rem;
    background-color: $button-color;
    color: $bgColor;
    font-size: .14rem;
    text-align: center;
    a{
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
