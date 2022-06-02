<template>
  <div id="home">
    <nav-bar class="home-tint">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"/>
    <home-feature/>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
    <!-- 用中括号的形式，因为以后还会修改的 最好用一下计算属性 -->
    <goods-list :goods-list="showGoods" />
  </div>
</template>

<script>
// 公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goodsList/GoodsList";
// 页面子组件 按照页面顺序
import HomeSwiper from "@/views/home/homeChild/HomeSwiper";
import HomeRecommend from "@/views/home/homeChild/HomeRecommend";
import HomeFeature from "@/views/home/homeChild/HomeFeature";


import { requestHomeData, requestHomeGoods } from "@/network/home"; /* 导入获取首页数据的方法 */

export default {
  name: "Home",
  data() {
    return {
      // 获取横幅，也就是swiper的图片
      banner: null,
      recommend: null,
      // 首页商品 ---> 流行，新款，精选
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      selectTab: 'pop' // tab-control ['流行', '新款', '精选']中选中的tab
    }
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,

    HomeSwiper,
    HomeRecommend,
    HomeFeature
  },
  created() {
    // 加一层封装，created函数中最好只有基本的逻辑
    this.getHomeData();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  methods: {
    /*
    * 网络请求相关
    */
    getHomeData() {
      requestHomeData().then(res => {
        // 由于箭头函数的this指向上一级，也就是created，而created的this指向component，所以可以赋值给banner和recommend，
        // 数据有没有获取到可以使用浏览器插件vuejs.devtools查看
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; // 每次请求的时候，都是请求的下一页的数据
      requestHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    },

    /*
    * 事件监听相关
    * */
    tabClick(index) {
      switch (index) {
        case 0:
          this.selectTab = 'pop';
          break;
        case 1:
          this.selectTab = 'new';
          break;
        case 2:
          this.selectTab = 'sell';
          break;
      }
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.selectTab].list
    }
  }

}
</script>

<style scoped>
#home {
  /* 由于navbar需要固定在顶部，所以使用了position:fixed使其脱离了标准文档流，因此需要空出44px保证navbar不会遮挡swiper*/
  padding-top: 44px;
}
.home-tint {
  background-color: pink;
  color: #ffffff;
}
.tab-control {
  background-color: #fff;
  position: sticky;
  top: 44px;
}
</style>
