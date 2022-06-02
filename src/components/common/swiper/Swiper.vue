<template>
  <!-- 定义一个根组件 -->
  <div id="san-swiper">
    <!-- swiper的框架   不传参的时候默认传递的是window的event事件-->
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot name="swiper"></slot>
    </div>
    <!-- swiper的指示器 -->
    <div class="indicator" v-if="showIndicator && slideCount > 1">
      <!-- 添加默认小圆点 -->
      <slot name="indicator">
        <div class="indicator-item" v-for="(item,index) in slideCount" :class="{highlight: currentIndex === index + 1}">
        </div>
      </slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "Swiper",
  data() {
    return {
      slideCount: 0, // slide的数量
      swiperWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper的样式
      scrolling: false, // 正在滚动，默认否
      swiperTimer: null, // 设置一个定时器
      currentIndex: 1, // 当前所在位置
    }
  },
  props: {
    // 展示底部的指示器
    showIndicator: {
      type: Boolean,
      default: true
    },
    // 图片的动画速度 默认300ms
    animateSpeed: {
      type: Number,
      default: 300
    },
    // 间隔多少换一张图片 默认3000ms
    interval: {
      type: Number,
      default: 1000
    },
    // 移动多少程度，松开后就自动切换
    moveRatio: {
      type: Number,
      default: 0.25
    }
  },
  // 一定要挂载之后渲染，因为如果像HomeSwiper.vue文件中直接传banner.length给slide-count，
  // 由于banner是网络请求获取的，所以页面渲染之后可能请求的数据还没回来，会造成报错
  mounted() {
    setTimeout(() => {
      // 处理swiper的dom一些操作，添加底部指示器、前后添加slide等
      this.handleSwiperDom()

      // 开启定时器，开启循环
      this.startLoop();

    },200)

  },
  methods: {
    // 处理swiper的dom
    handleSwiperDom() {
      // 获取需要操作的元素 先获取SwiperEl，因为有可能别的地方也会有命名为slide的class
      const swiperEl = document.querySelector('.swiper');
      const slideEls = swiperEl.getElementsByClassName('slide');
      // 由于渲染太快可能会导致这部分没数据就渲染上去了，所以需要在外部添加一个延时器
      this.slideCount = slideEls.length;

      // 如果slideCount大于1个，那么就在前后分别添加一个slide
      if (this.slideCount > 1) {
        const cloneFirst = slideEls[0].cloneNode(true);
        const cloneLast = slideEls[this.slideCount - 1].cloneNode(true);
        // 添加两个节点
        swiperEl.insertBefore(cloneFirst, slideEls[0])
        swiperEl.appendChild(cloneLast);
        this.swiperWidth = swiperEl.offsetWidth; // 获取swiper的宽度
        this.swiperStyle = swiperEl.style; // 获取swiper的样式
      }
      // 相当于把图片往左移了一个swiper的宽度
      this.setTransform(-this.swiperWidth);

    },

    // 设置移动位置
    setTransform(position) {
      // ${}是ES6新增语法，用于字符串的拼接，一定要配合反单引号 ``
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      // 用于浏览器兼容问题 -webkit-transform用于safari浏览器，-ms-transform用于IE浏览器
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },

    // 开启定时器，开始循环
    startLoop() {
      this.swiperTimer = window.setInterval(() => {
        this.currentIndex++;
        // 向左滚动
        this.scrollSlide(-this.currentIndex * this.swiperWidth);
      }, this.interval);
    },

    // 清除定时器，关闭循环
    stopLoop() {
      window.clearInterval(this.swiperTimer)
    },

    // 滚动slide到正确的位置
    scrollSlide(currentPosition) {
      // 设置滚动状态为true
      this.scrolling = true;

      // 滚动slide
      this.setTransform(currentPosition);
      this.swiperStyle.transition = `${this.animateSpeed}ms`;

      // 判断滚动的位置
      this.checkPosition()

      // 滚动完成
      this.scrolling = false;
    },

    // 修正位置
    checkPosition() {
      window.setTimeout(() => {
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          // 1.校验正确的位置
          this.setTransform(-this.currentIndex * this.swiperWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.swiperWidth);
        }
        // 2.结束移动后的回调
        // this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animateSpeed)
    },

    /*
    * 拖动事件: 接收event事件
    * */
    touchStart(e) {
      if (this.scrolling) return;

      // 清除定时器，终止循环
      this.stopLoop();

      this.startX = e.touches[0].pageX;
    },

    touchMove(e) {
      // 获得当前页的X距离
      this.currentX = e.touches[0].pageX;

      // 获得移动的距离
      this.distance = this.currentX - this.startX;
      // 获得当前页的位置
      let currentPosition = -this.currentIndex * this.swiperWidth;
      let moveDistance = currentPosition + this.distance;

      this.setTransform(moveDistance)
    },

    touchEnd(e) {
      // 获取移动的距离 可能左移，可能右移
      let moveDistance = Math.abs(this.distance);

      if (this.distance === 0) {
        return;
      } else if (this.distance > 0 && moveDistance > this.swiperWidth  * this.moveRatio) {
        this.currentIndex --
      } else if (this.distance < 0 && moveDistance > this.swiperWidth  * this.moveRatio) {
        this.currentIndex ++
      }

      // 移动到正确位置
      this.scrollSlide(-this.currentIndex * this.swiperWidth);
      // 开启定时器，继续循环
      this.startLoop();
    },

  }
}
</script>

<style scoped>
#san-swiper {
  position: relative;
  overflow: hidden;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.swiper {
  display: flex;
}

.indicator-item {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.highlight {
  background-color: red;
}
</style>
