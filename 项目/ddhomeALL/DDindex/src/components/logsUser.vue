<template>
    <ul class="mui-table-view">

            <div v-for="item in datas"  v-if="type==true">
                <router-link :to="'/logsUser/'+item.pid" tag="li" class="mui-table-view-cell">
                    {{item.pname}}
                </router-link>
            </div>
        <div v-for="item in datas" v-if="type==false">
            <router-link :to="{ name: 'wirte', params: { uname: item.uname ,uid:item.uid}}" tag="li" class="mui-table-view-cell">
                {{item.uname}}
            </router-link>
        </div>
        <div  v-if="datas.length<=0">
           该部门未成立
        </div>

    </ul>
</template>
<script>
    export default {
        name: 'logsUser',
        data() {
            return {
                datas:[],
                type:''
            }
        },
        methods: {
            back() {
                this.$router.back()
            },
            child(pid){
                this.$store.commit('setPid',pid);
            }
        },
        mounted(){
            var pid=this.$route.params.pid||0;
            console.log(pid)
            fetch('/ddhome/addUserOne?pid='+pid).then(function (e) {
                return e.json()
            }).then((e)=>{
                console.log(e)
                    this.datas=e.arr
                this.type=e.type
            })
        },
        watch:{
            $route(){
                var pid=this.$route.params.pid||0;
                console.log(pid)
                fetch('/ddhome/addUserOne?pid='+pid).then(function (e) {
                    return e.json()
                }).then((e)=>{
                    console.log(e)
                    this.datas=e.arr
                    this.type=e.type
                })
            }
        }
    }
</script>
<style>

</style>