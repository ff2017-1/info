import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import adminQuery from '@/components/adminQuery'    //查看管理员
import addAdmin from '@/components/addAdmin'        //添加管理员
import login from '@/components/login'              //登陆
import addLevel from '@/components/addLevel'        //添加角色
import addRot from '@/components/addRot'            //添加权限
import showLevel from '@/components/showLevel'      //查看角色
import updataAdmin from '@/components/updataAdmin'  //更新管理员信息
import showRoot from '@/components/showRoot'        //查看权限
import updataRoot from '@/components/updataRoot'    //更新权限信息
import updataLevel from '@/components/updataLevel'  //更新角色信息
import updataPass from '@/components/updataPass'    //修改密码
import showPart from '@/components/showPart'        //查看部门
import addPart from '@/components/addPart'        //添加部门
import updataPart from '@/components/updataPart'        //更改部门信息
import showUser from '@/components/showUser'        //查看用户信息
import addUser from '@/components/addUser'        //添加用户信息
import updataUser from '@/components/updataUser'        //更改用户信息
import addUserOne from '@/components/addUserOne'        //添加用户信息小组件


Vue.use(Router)


var obj=new Router({
  routes: [
    {
      path: '/',
      // name: '首页',
      component: index,
        children:[
            {
                path: '/',
                name: '查看管理员',
                component: adminQuery,
            },
            {
                path: '/addAdmin',
                name: '添加管理员',
                component: addAdmin,
            },
            {
                path: '/addLevel',
                name: '添加角色',
                component: addLevel,
            },
            {
                path: '/addRot',
                name: '添加权限',
                component: addRot,
            },
            {
                path: '/showLevel',
                name: '查看角色信息',
                component: showLevel,
            },
            {
                path: '/updataAdmin',
                name: '更新管理员信息',
                component: updataAdmin,
            },
            {
              path: '/showRoot',
              name: '查看权限',
              component: showRoot,
            },
            {
                path: '/updataRoot',
                name: '更新权限',
                component: updataRoot,
            },
            {
                path: '/updataLevel',
                name: '更新角色信息',
                component: updataLevel,
            },
            {
                path:'/updataPass',
                name:'修改密码',
                component:updataPass,
            },
            {
                path:'/showPart',
                name:'查看部门',
                component:showPart,
            },
            {
                path:'/addPart',
                name:'添加部门',
                component:addPart,
            },
            {
                path:'/updataPart',
                name:'更改部门',
                component:updataPart,
            },
            {
                path:'/showUser',
                name:'查看用户',
                component:showUser,
            },
            {
                path:'addUser',
                name:'添加用户',
                component:addUser,
                children:[
                    {path:'',component:addUserOne},
                    {path:'/addUserOne/:pid',component:addUserOne}
                ]
            },
            {
                path:'updataUser',
                name:'更改用户',
                component:updataUser,
            }

        ]
    },
      {
          path:'/login',
          name:'登录',
          component:login,
      }
  ]
})
obj.beforeEach((to, from, next) => {
    if(to.path == '/login'){
        next()
    }else{
        // if(obj.app.$store&&obj.app.$store.state.login){
        //     next()
        // }else{
        //     next('/login')
        // }
        if(sessionStorage.getItem('login')){
            next()
        }else{
            next('/login')
        }
    }
})
export default obj

