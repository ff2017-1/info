import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Index from '@/components/index'
import lists from '@/components/lists'
import telPhone from '@/components/telPhone.vue'
import logs from '@/components/logs.vue'
import showLogs from '@/components/showLogs.vue'
import wirte from '@/components/wirte.vue'
// import logAccept from '@/components/logAccept.vue'
import logsUser from '@/components/logsUser.vue'
import login from '@/components/login.vue'
import setPerson from '@/components/setPerson.vue'
import updataPass from '@/components/updataPass.vue'



Vue.use(Router)
Vue.use(Vuex)

export default new Router({
    linkExactActiveClass:'mui-active',
  routes: [
      {
          path: '/',
          name: 'login',
          component: login
      },
    {
      path: '/index',
      name: '首页',
      component: Index
    },
      {path:'/lists/:id',component:lists},
      {path:'/telPhone',component:telPhone},
      {path:'/logs',component:logs,children:[
          {path:'',component:showLogs,children:[
              {path:'',component:showLogs},
              {path:'/logAccept',component:showLogs},

          ]},
          {path:'/wirte',name:'wirte',component:wirte},
          {path:'/logsUser',component:logsUser},
          {path:'/logsUser/:pid',component:logsUser},

      ]},
      {path:'/setPerson',component:setPerson},
      {path:'/updataPass',component:updataPass},

  ]
})
