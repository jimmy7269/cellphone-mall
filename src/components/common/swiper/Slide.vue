<template>
  <!-- 每一页的图片称之为slide -->
  <div class="slide">
    <slot name="slide">
    </slot>
  </div>
</template>

<script>
export default {
  name: "Slide"
}
</script>

<style scoped>
.slide {
  /* 让slide继承swiper宽度 */
  width: 100%;
  /* 假设ABCDE五个子元素宽度均为100px，父元素宽度为400px，flex-shrink分别为2:2:2:1:1,所以子元素超出父元素100px，那么这多的100px按照之前比例分配给每个子元素，
     也就是ABC分得12.5*2=25px，那么ABC宽度为100-25=75px，DE分的12.5*1=12.5px，DE宽度为100-12.5=87.5px。下面意思就是有四个slide，每个slide宽度是100%，
     并且第一个flex-shrink为0，也就是不减去任何宽度 */
  flex-shrink: 0;
}
.slide img {
  width: 100%;
}
</style>
