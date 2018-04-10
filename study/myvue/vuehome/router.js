routes=[
    {
        path:'/',
        component:Main,
        children: [{
            path:'',
            components:{
                left: Left,
                right:Right
            }
        }]
    },
    {
        path:'/fast',
        component:Fast,
    }

]

var router = new VueRouter({
    // mode:history,
    routes: routes
});
