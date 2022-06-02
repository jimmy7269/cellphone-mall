<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
      // 组件对象需要返回一个对象，而不是直接写default: []
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
}

.recommend-item a {
  display: inline-block;
}
</style>
