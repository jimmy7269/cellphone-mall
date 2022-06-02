<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="itemImg"></slot>
    </div>
    <div v-else>
      <slot name="itemIngActive"></slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="itemContent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      if (this.isActive) return {color: this.activeColor}
    }
  },
  methods: {
    itemClick() {
      // console.log(this.$route.path);
      // console.log(this.path)
      // if (this.$route.path !== this.path) {
      //   this.$router.push(this.path)
      // }
      this.$route.path !== this.path ? this.$router.push(this.path) : ''
    }
  }
}
</script>

<style scoped>
.tabbar-item {
  flex: 1;
  cursor: pointer;
}
</style>
