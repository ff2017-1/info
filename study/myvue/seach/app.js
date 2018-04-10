new Vue({
    el:'#root',
    data:{
        list:[
            {
                name:"eqwe",
                tel:12345678
            },
            {
                name:"zhangttrtsan",
                tel:12345678
            },
            {
                name:"zhangsan",
                tel:12345678
            },

        ],
        state:false,
        name:''
    },
    methods:{
        aa(){
            this.state=true;
        },
        bb(val){
            this.state=false;
            this.name=val;

        }
    }
})