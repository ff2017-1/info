new Vue({
    el: '#root',
    data: {
        all:localStorage.name?JSON.parse(localStorage.name):[],
        con:'',
        status:"all",
    },
    methods:{
        adds(val){
            if(val==''){
                alert('请输入内容');
                return ;
            }
            var obj={};
            obj.title=val;
            obj.state=1;
            obj.edit=true;
            obj.id=Math.random()+new Date().getTime();
            console.log(obj)
            this.all.push(obj);
            this.con='';
            console.log(this.all)
            localStorage.name = JSON.stringify(this.all)
        },
        showlist(val){
            console.log(val)
            console.log(1)
            this.status=val;
        },
        changeState(obj){
            if(obj.state==0){
                obj.state=1;
            }else{
                obj.state=0;
            }
            localStorage.name = JSON.stringify(this.all)

        },
        del(ids){
            this.all=this.all.filter(element=>element.id != ids)
            localStorage.name = JSON.stringify(this.all)
        },
        edit(obj){
            console.log(obj.edit);
            obj.edit=(!obj.edit);
            localStorage.name = JSON.stringify(this.all)
        }
    },
    computed:{
        datas(){
            return this.all.filter((a)=>{
                if(this.status=="all"){
                    return a;
                }else{
                    if(a.state==this.status){
                        return a;
                    }
                }
            })
        },
    },
       //
})