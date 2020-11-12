<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      console.log(this.$store.getters.token)
      if (this.$store.getters.token) {
        this.$store.dispatch('getPermissions')
      }
    }
  }
</script>

<style lang="scss">
  #app {
    height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
