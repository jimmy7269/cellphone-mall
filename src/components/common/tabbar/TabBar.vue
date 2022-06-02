<template>
  <!-- 由于每个页面的tab-bar都一样，所以可以使用id，但是每个页面的导航栏nav-bar都不一定一样，所以最好使用class -->
  <div id="tab-bar">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  text-align: center;
}
</style>
