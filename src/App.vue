<!--
 * @FilePath: \wxprogrom-back-web\src\App.vue
 * @Author: Solitude-DDD
 * @Date: 2022-07-15 00:26:17
 * @Description: 
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
