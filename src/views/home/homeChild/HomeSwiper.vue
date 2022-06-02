<template>
  <!--
     自身属性:
       showIndicator: 展示指示器indicator，默认true
     向子组件传递:
       slide-count: swiper的图片数目
   -->
  <div>
    <!-- 不能如下直接绑定 :slide-count=banner.length, 因为有可能你在渲染这个页面的时候，banner数据还没请求到，所以会报错 -->
    <!--<swiper :slide-count="banner.length">-->
    <swiper>
      <!-- 将图片插入swiper插槽中 -->
      <template v-slot:swiper>
        <slide v-for="item in banner">
          <template v-slot:slide>
            <!-- 跳不跳转根据业务来， 所以Slide.vue中不需要直接封装一个a标签 -->
            <a :href="item.link" class="slide-link">
              <img :src="item.image" alt="">
            </a>
          </template>
        </slide>
      </template>

      <!-- 将指示器indicator插入对应插槽中 -->
      <!--<template v-slot:indicator >-->
      <!--</template>-->
    </swiper>
  </div>
</template>

<script>
import Slide from "@/components/common/swiper/Slide";
import Swiper from "@/components/common/swiper/Swiper";

export default {
  name: "HomeSwiper",
  components: {
    Slide,
    Swiper
  },
  props: {
    banner: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.slide-link {
  /* 给a标签设置为行内元素，让子元素把他撑开 */
  display: inline-block;
}
</style>
