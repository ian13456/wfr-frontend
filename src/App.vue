<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
html {
  color: white;
  width: 100%;
  height: 100%;

  .btn {
    border: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }
  body {
    width: 100%;
    height: 100%;
    font-family: 'Roboto', 'Lato', sans-serif;
    #app {
      width: 100%;
      height: 100%;
      #wrapper {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
