<template>
    <div class="list">
        <div class="listMessage" >
            <span>{{message}}</span>
        </div>
        <div  ref="container" @touchstart="start($event)"class="mui-card">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'list',
        template:'<list></list>',
        props: ['fn'],
        data() {
            return {

                datas:[],
                startY:'',
                moveY:'',
                container:'',
                message:'',
                flag:true,
            }
        },
        methods:{
            start(e){
                this.message='下拉刷新'
                this.container.style.transition="none"
                this.startY=e.touches[0].pageY;
                this.container.addEventListener('touchmove',this.move)
                this.container.addEventListener("touchend",this.end)
            },
            move(e) {
                this.moveY = e.touches[0].pageY;
                if(this.moveY-this.startY>44) {
                    this.container.style.marginTop = this.moveY - this.startY + 'px'
                }
            },
            end(e) {
                this.message='正在刷新'
                this.container.removeEventListener("touchmove", this.move)
                this.container.removeEventListener("touchend", this.end)
                this.container.style.marginTop = 44 + 'px'
                this.container.style.transition="margin 1s ease";

                if(this.moveY-this.startY>44) {
                    this.fn(this)
                    this.container.style.marginTop = 0 + 'px'

                }

            },
//            over(){
//
//            }

        },
        mounted(){
            this.container=this.$refs['container'];


        }

    }
</script>
<style>
    .list{
        overflow: hidden;
    }
</style>