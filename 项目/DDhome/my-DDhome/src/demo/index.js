import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import One from '@/demo/One'
import Two from '@/demo/Two'
import Three from '@/demo/Three'



Vue.use(Router)
Vue.use(Vuex)


var obj=new Router({
  routes: [
      {path:'/one',component:'One'},
      {path:'/two',component:'Two'},
      {path:'/three',component:'Three'}
  ]
})
export default obj

