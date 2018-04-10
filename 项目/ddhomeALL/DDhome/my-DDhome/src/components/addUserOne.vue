<template>
    <el-card class="box-card" style="text-align: left">
    <div slot="header" class="clearfix">
    <span>选择部门</span>
    <el-button style="float: right; padding: 3px 0" type="text"><</el-button>
    </div>
    <div v-for="item in data" :key="item.pid" class="text item">
    <router-link :to="'/addUserOne/'+item.pid">
        {{item.pname}}
    </router-link>
    </div>
    </el-card>
</template>
<script>
    export default {
        data() {
            return {
                data:[],
                pid:''
            }
        },
        created(){
            this.pid=this.$route.params.pid ||0
            console.log(this.pid)
            fetch('/ddhome/addUserOne?pid='+this.pid).then(function (e) {
                return e.json()
            }).then((e)=>{
                this.data=e
            })

        },
        watch:{
            $route(){
                this.pid=this.$route.params.pid ||0
                fetch('/ddhome/addUserOne?pid='+this.pid).then(function (e) {
                    return e.json()
                }).then((e)=>{
                    this.data=e
                    console.log(this.data)
                })
            }
        }
    }
</script>