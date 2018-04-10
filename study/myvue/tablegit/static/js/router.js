'use strict';

var routes = [{
    path: '/',
    component: Head,
    children: [{
        path: '/',
        component: Index
    }, {
        path: '/add',
        component: Add
    }, {
        path: "/updatas/:id",
        component: updatas
    }]
}, {
    path: '/login',
    component: Login
}, {
    path: '/Reg',
    component: Reg
}];
var router = new VueRouter({
    routes: routes
});
// var token=window.sessionStorage.getItem('token');
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
//         console.log(1)
//         if (token=='200') {  // 判断当前的token是否存在
//             console.log(2)
//             next()
//         }else{
//             console.log(4)
//
//             next({
//                 path: '/',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//         }else {
//         console.log(5)
//         next();
//     }
// });
router.beforeEach(function (to, from, next) {
    if (to.path == "/login" || to.path == "/Reg") {
        // 判断是否登录如果不是这俩个页面
        next();
    } else {
        //登录检测
        //检测成功
        if (sessionStorage.login) {
            next();
        } else {
            router.push("/login");
        }
    }
});