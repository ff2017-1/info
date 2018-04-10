<template>
  <div id="app">
    <transition name="slide-fade">
    <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

  width: 100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.container{
  margin-top:60px ;
}
.slide-fade-enter-active {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin: auto;
  transition: all .8s ease;
}
.slide-fade-leave-active {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin: auto;
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin: auto;
  transform: translateX(200px);
  opacity: 0;
}
</style>
