<template>
  <div class="products">
    <div class="products__title">{{shopName}}</div>
    <div class="products__list">
      <div class="products__item" v-for="item in productList" :key="item._id">
        <img class="products__item__img" src="../../assets/near.png">
        <div class="products__item__detail">
          <h4 class="products__item__title">{{item.name}}</h4>
          <div class="products__item__price">
            <span class="products__item__single">
              <span class="products__item__yen">&yen;</span>{{item.price}} x {{item.count}}
            </span>
            <span class="products__item__total">
              <span class="products__item__yen">&yen;{{(item.price * item.count).toFixed(2)}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/commonCartEffect'
export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables';
@import '../../style/mixins';
.products {
  margin: .16rem .18rem .55rem .18rem;
  background: $bgColor;
  &__title{
    padding: .16rem;
    font-size: .16rem;
    color: #333;
  }
  &__list{
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.4rem;
    overflow-y: scroll;
    background: $bgColor;
    margin: .18rem;
  }
  &__item{
    display: flex;
    position: relative;
    padding: .16rem .16rem 0 .16rem;
    &__img{
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title{
      line-height: .2rem;
      font-size: .14rem;
      color:$content-fontcolor;
      margin: 0;
      @include ellipse;
    }
    &__price{
      display: flex;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      margin: .06rem 0 0 0;
      justify-content: space-between;
    }
    &__single{
    }
    &__total{
      flex: 1;
      text-align: right;
      color: $dark-fontColor;
    }
    &__yen{
      font-size: .12rem;
    }
  }
}
</style>
