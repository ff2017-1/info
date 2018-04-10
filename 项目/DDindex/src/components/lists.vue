<template>
    <div class="hello">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">标题</h1>
        </header>
        <div style="height: 55px;"></div>
        <h2>{{title}}</h2>
        <div class="content">{{content}}</div>
        <Nav></Nav>
        <div style="height: 55px;"></div>

    </div>

</template>

<script>
    import Nav from "./Nav.vue";

    export default {
        name: 'lists',
        data () {
            return {
title:'',
                content:''
            }
        },
        components: {Nav},

        methods:{
            back(){
                this.$router.back()
            }
        },
        mounted(){
            var id = this.$route.params.id;
            fetch('/ddhome/newsListCon?id='+id).then(function (e) {
                return e.json()
            }).then((e)=>{
                console.log(e)
                this.title=e[0].title
                this.content=e[0].content
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h2{
        font-size: 15px;
        margin-bottom: 10px;
    }
    .content{
        font-size:13px;
        padding: 15px;
        text-align: justify;
        line-height: 20px;
        text-shadow: rgb(192px,192px,192px) 1px 1px 1px;
    }
</style>
