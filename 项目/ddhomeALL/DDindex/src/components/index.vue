<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">标题</h1>
        </header>
        <div style="height: 50px;"></div>
        <slider>
            <div class="slider-list">
                <img src="../assets/img/g3.jpg" alt="">
            </div>
            <div class="slider-list"><img src="../assets/img/g2.jpg" alt=""></div>
            <div class="slider-list" ><img src="../assets/img/g1.jpg" alt=""></div>
        </slider>
        <list :fn="fn" >
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for=" item in datas">
                    <router-link tag="a" :to="'/lists/'+item.Iid">
                        <a class="mui-navigate-right">
                            {{item.title}}
                        </a>
                    </router-link>
                </li>
            </ul>
        </list>
        <Nav></Nav>
        <div style="height: 55px;"></div>

    </div>
</template>

<script>
    import slider from "./slider.vue";
    import list from "./list.vue";
    import Nav from "./Nav.vue";

    export default {
        name: 'index',
        data() {
            return {
                datas: [],
                page:0,
                num:10,
            }
        },
        components: {slider,list,Nav},
        methods: {
            back(){
              this.$router.push('/')
            },
            fn(s) {
                var str='page='+this.page+'&num='+this.num
                fetch('/ddhome/ListRef?'+str).then((e)=>{
                    return e.json()
                }).then((e)=>{
//                    console.log(e)
                    if(e.message='ok'){
                        console.log(this.datas)
                        this.datas=e.result
                        console.log(this.datas)
                        this.page++
                        s.message='刷新完毕'

                    }else if(e.message='no'){
                        s.message='没有数据了!!!'
                    }else{
                        alert('出错了')
                    }


                })
            }
        },
        mounted() {
            fetch('/ddhome/newsList').then((e) => {
                return e.json()
            }).then((e) => {
                this.datas = e
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .listMessage {
        width: 100%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        position: absolute;
    }
    .mui-bar-nav{
        background: #ffffff;
    }
</style>
