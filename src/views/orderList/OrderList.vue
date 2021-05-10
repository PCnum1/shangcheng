<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in list" :key="index">
        <div class="order__title">
          {{item.shopName}}
          <span class="order__status">
            {{item.isCanceled ? '已取消' : '已下单'}}
          </span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
              <img v-if="innerIndex <= 3" :src="innerItem.product.img" class="order__content__img">
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__info__price">￥{{item.total}}</div>
            <div class="order__content__info__count">共{{item.num}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../untils/request'
import Docker from '../../components/Docker.vue'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach(i => {
        const products = i.products || []
        let total = 0
        let num = 0
        products.forEach((t) => {
          total += ((t?.product?.price * t?.orderSales) || 0)
          num += t?.orderSales || 0
        })
        i.total = total
        i.num = num
      })
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: {
    Docker
  },
  setup() {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  overflow-y: auto;
  position: absolute;
  bottom: .5rem;
  left: 0;
  top: 0;
  right: 0;
  background: rgb(248, 248, 248);
}
.title{
  line-height: .44rem;
  background: $bgColor;
  color: $content-fontcolor;
  font-size: .16rem;
  text-align: center;
}
.orders{

}
.order{
  margin: .16rem .18rem;
  padding: .16rem;
  background: $bgColor;
  &__title{
    margin-bottom: .16rem;
    font-size: .16rem;
    color:$content-fontcolor;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  &__status{
    font-size: .14rem;
    color: $light-Color;
  }
  &__content{
    display: flex;
    &__imgs{
      flex: 1;
    }
    &__img{
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info{
      width: .7rem;
      &__price{
        margin-bottom: .04rem;
        font-size: .14rem;
        color: $hightlight-fontColor;
        text-align: right;
        line-height: .2rem;
      }
      &__count{
        font-size: .12rem;
        color: $content-fontcolor;
        text-align: right;
        line-height: .14rem;
      }
    }
  }
}

</style>
