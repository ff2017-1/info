<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
  .Root{
    margin-top: 20px;
  }
  body,html{
    width:100%;
    height:100%;
    overflow: hidden;
  }
#app {
  width:100%;
  height:100%;
}
  a{
    text-decoration: none;
  }
</style>
