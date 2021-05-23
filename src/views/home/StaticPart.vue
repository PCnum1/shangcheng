<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe61b;</span>
    河南省郑州市中原区万达广场
    <span class="iconfont position__notes">&#xe613;</span>
  </div>
  <div class="search">
    <div class="search__input">
      <span class="iconfont">&#xe6d6;</span>
      <input type="text" placeholder="请输入..." />
    </div>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="../../assets/banner.jpg"
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item in iconsList" :key="item.id">
      <img
        :src="item.img"
        class="icons__item__img"
      />
      <span class="icons__item__desc">{{item.name}}</span>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconsList = [
      {
        id: 1,
        img: require("../../assets/超市.png"),
        name: '超市便利'
      },
      {
        id: 2,
        img: require("../../assets/菜市场.png"),
        name: '菜市场'
      },
      {
        id: 3,
        img: require("../../assets/水果店.png"),
        name: '水果店'
      },
      {
        id: 4,
        img: require("../../assets/鲜花.png"),
        name: '鲜花绿植'
      },
      {
        id: 5,
        img: require("../../assets/医药健康.png"),
        name: '医药健康'
      },
      {
        id: 6,
        img: require("../../assets/家居.png"),
        name: '家居时尚'
      },
      {
        id: 7,
        img: require("../../assets/蛋糕.png"),
        name: '烘培蛋糕'
      },
      {
        id: 8,
        img: require("../../assets/签到.png"),
        name: '签到'
      },
      {
        id: 9,
        img: require("../../assets/大牌免运.png"),
        name: '大牌免运'
      },
      {
        id: 10,
        img: require("../../assets/红包.png"),
        name: '红包套餐'
      }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  @include ellipse;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notes {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: $search-bgColor;
  color:$search-fontColor;
  border-radius: 0.16rem;
  padding: 0 0.1rem;
  &__input {
    display: flex;
  }
  .iconfont {
    position: relative;
    bottom: -0.01rem;
  }
  input {
    border: none;
    outline: none;
    background: none;
    padding: 0.1rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: 0.1rem;
  background: $content-bgColor;
  margin: 0 -0.18rem;
}
</style>
