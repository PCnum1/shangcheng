<template>
<div class="wrapper">
  <div class="search">
    <div class="search__back iconfont" @click="handleBackClick">
      &#xe677;
    </div>
    <div class="search__content">
      <span class="search__content__icon iconfont">&#xe6d6;</span>
      <input class="search__content__input" placeholder="请输入商品名称" />
    </div>
  </div>
  <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
  <Content :shopName="item.name"/>
  <Cart />
</div>

</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../untils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}
const useBackRouteEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getItemData } = useShopInfoEffect()
    getItemData()
    const { handleBackClick } = useBackRouteEffect()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  padding: 0 .18rem;
  .search{
    display: flex;
    margin: .14rem 0 .04rem 0;
    line-height: .32rem;
    &__back{
      font-size: .24rem;
      color: #b6b6b6;
      width: .3rem;
    }
    &__content {
      display: flex;
      flex:1;
      line-height: .32rem;
      background: $search-bgColor;
      border-radius: .16rem;
      &__icon{
        width: .44rem;
        text-align: center;
        color: $search-fontColor;
      }
      &__input{
        width: 100%;
        display: block;
        padding-right: .2rem;
        height: .32rem;
        border: none;
        outline: none;
        background: none;
        color: $content-fontcolor;
        font-size: .14rem;
        &::placeholder{
          color: $content-fontcolor;
        }
      }
    }
  }
}
</style>
