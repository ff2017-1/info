<template>
    <div class="slider">
        <div class="slider-container" ref="container" @touchstart="start($event)">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'slider',
        template:'<slider></slider>',
        data() {
            return {
                num:2,
                container:null,
                current:'',
                startX:'',
                startY:'',
                moveX:'',
                moveY:'',
                direction:'',
                length:10,
                movenum:0
            }
        },
        methods:{
            start(e){
                this.container.style.transition="none"
                this.startX=e.touches[0].pageX;
                this.startY=e.touches[0].pageY;
                this.current=parseInt(getComputedStyle(this.container,null)["marginLeft"])?parseInt(getComputedStyle(this.container,null)["marginLeft"]):0;
                this.container.addEventListener('touchmove',this.move)
                this.container.addEventListener("touchend",this.end)
            },
            move(e){
                this.moveX=e.touches[0].pageX;
                this.moveY=e.touches[0].pageY;
                if(Math.abs(this.moveX-this.startX)>5){
                    if(this.moveX>this.startX){
                        this.direction="right";
                        this.container.style.marginLeft=this.current+this.moveX-this.startX+'px'
                    }else{
                        this.direction="left";
                        this.container.style.marginLeft=this.current+this.moveX-this.startX+'px'
                    }
                }


            },
            end(e){
                this.container.removeEventListener("touchmove",this.move)
                this.container.removeEventListener("touchend",this.end)
                var w=document.body.clientWidth
                if(this.direction=='right'){
                    if(Math.abs(this.moveX-this.startX)>this.length){
                        this.movenum++;
                        if(this.movenum>0){
                            this.movenum=0
                        }
                    }
                }else if(this.direction=='left'){
                    if(Math.abs(this.moveX-this.startX)>this.length){
                        this.movenum--;
                        if(this.movenum<-(this.num-1)){
                            this.movenum=-(this.num-1)
                        }
                    }
                }
                this.container.style.transition="margin 1s ease"
                this.container.style.marginLeft=this.movenum*w+'px';

            }
        },
        mounted(){
            var container=this.$refs['container'];
            this.container=container;
            var list=container.getElementsByClassName("slider-list");
            this.num=list.length;
            var num=this.num;
            container.style.width=100*num+'%';
            for(var i=0;i<list.length;i++){
                list[i].style.width=100/num+'%';
            }
            this.$refs['container'].getElementsByClassName("slider-list")
        }

    }
</script>
<style>
    .slider{
        width: 100%;
        height: 200px;
        overflow: hidden;
        border-radius: 5px;
    }
    .slider-container{
        width: 200%;
        height: 200px;
    }
    .slider .slider-list{
        width: 50%;
        height: 200px;
        float: left;
    }
    .slider .slider-list>img{
        width: 100%;
        height: 100%;
    }
</style>