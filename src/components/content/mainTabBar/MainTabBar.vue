<template>
  <div class="main-tab-bar">
    <tab-bar>
      <tab-bar-item path="/home">
        <template v-slot:itemImg>
          <!-- dom中使用别名路径需要加上波浪号 -->
          <img src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:itemIngActive>
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template v-slot:itemContent>
          首页
        </template>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <template v-slot:itemImg>
          <img src="~assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:itemIngActive>
          <img src="~assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template v-slot:itemContent>
          分类
        </template>
      </tab-bar-item>

      <tab-bar-item path="/shopcart">
        <template v-slot:itemImg>
          <img src="~assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:itemIngActive>
          <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
        <template v-slot:itemContent>
          购物车
        </template>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <template v-slot:itemImg>
          <img src="~assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:itemIngActive>
          <img src="~assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template v-slot:itemContent>
          我的
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBarItem,
    TabBar
  }
}
</script>

<style scoped>
.main-tab-bar {
  position: fixed;
  height: 49px;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 10px rgba(0,0,0,.1);
  background-color: #fff;
}
.main-tab-bar img {
  width: 20px;
  margin-top: 3px;
  margin-bottom: 2px;
}

</style>
