<template>
  <div class="content">
    <div class="category">
      <div :class="{'category__item': true, 'category__item--active': currentTab === item.tab}" @click="()=>handleTabClick(item.tab)" v-for="item in categories" :key="item.name">
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" src="../../assets/near.png">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont" @click="() => {changeCartItem(shopId, item._id, item, -1, shopName)}">&#xe627;</span>
          {{getProductCartCount(shopId, item._id)}}
          <span class="product__number__plus iconfont" @click="() => {changeCartItem(shopId, item._id, item, 1, shopName)}">&#xe691;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { get } from '../../untils/request'
import { useCommonCartEffect } from '../../effects/commonCartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}
const useCartEffect = () => {
  const store = useStore()
  const { addItemToCart, cartList } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', {
      shopId, shopName
    })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    addItemToCart(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { changeCartItem, cartList, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { changeCartItem, cartList, getProductCartCount } = useCartEffect()
    return { categories, currentTab, handleTabClick, list, shopId, changeCartItem, cartList, getProductCartCount }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content{
  display: flex;
  position: absolute;
  left:0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category{
  width: .76rem;
  background: $search-bgColor;
  height: 100%;
  overflow-y: scroll;
  &__item{
    line-height: .4rem;
    text-align: center;
    color: $content-fontcolor;
    &--active{
      background: $bgColor;
    }
  }
}
.product{
  flex: 1;
  overflow-y: scroll;
  &__item{
    display: flex;
    position: relative;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img{
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &__title{
      line-height: .2rem;
      font-size: .14rem;
      color:$content-fontcolor;
      margin: 0;
      @include ellipse;
    }
    &__sales{
      margin: .06rem 0;
      color: $content-fontcolor;
      font-size: .12rem;
    }
    &__price{
      margin: 0;
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
      line-height: .18rem;
      &__minus{
        position: relative;
        top: .02rem;
        margin-right: .05rem;
        color: $light-Color;
      }
      &__plus{
        position: relative;
        top: .02rem;
        margin-left: .05rem;
        color: $button-color;
      }
    }
  }
}
</style>
