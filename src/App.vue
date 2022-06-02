<template>
  <div id="app">
    <router-view/>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar,
  },
  methods: {
  }
}
</script>

<style>
@import 'assets/css/base.css';
#app {
  width: 100%;
}
</style>
