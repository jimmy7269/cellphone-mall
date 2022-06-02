<template>
  <div class="goods-list-item">
    <div>
      <img :src="goodsListItem.show.img" alt="">
    </div>
    <div class="title overflow">{{ goodsListItem.title }}</div>
    <div>
      <span class="price">{{ "￥" + goodsListItem.price }}</span>
      <span class="collect">{{ goodsListItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  width: 50%;
  font-size: 10px;
  text-align: center;
}

.goods-list-item:nth-child(2n) {
  padding: 10px 10px 10px 5px;
}
.goods-list-item:nth-child(2n-1) {
  padding: 10px 5px 10px 10px
}

img {
  width: 100%;
  border-radius: 4px;
}

.price {
  color: var(--color-high-text);
  margin-right: 5px;
}

.collect {
  margin-left: 15px;
  position:relative;
}

.collect::before {
  position: absolute;
  content: '';
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px  no-repeat;

}

</style>
