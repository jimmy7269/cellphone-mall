<template>
  <div class="good-list">
    <goods-list-item
      v-for="item in goodsList"
      :goods-list-item="item"
      :key="item.iid" />
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goodsList/GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
