<template>
    <!--查看日志，你给别人写的，别人给你写的  写日志  谁 部门   给谁发不能给谁发-->
    <div>
        <div class="mui-card" v-for="item in datas"  v-if="type=='send'" >
            <div class="mui-card-header  mui-card-media">
                <img src="../assets/img/logo.png"/>
                <div class="mui-media-body">
                    发送至：<span>{{item.uname}}</span>
                    <p>{{item.jtime}}</p>
                </div>
            </div>
            <div class="mui-card-content">
                <h3>{{item.title}}</h3>
                <p>{{item.content}}</p>
            </div>
            <div class="mui-card-footer">
                发送人:<span>{{name}}</span>
            </div>

        </div>
        <span v-if="messageShowSend==true">您没有给对方发过邮件...</span>



        <div class="mui-card" v-for="item in datas"  v-if="type=='accept'" >
            <div class="mui-card-header  mui-card-media">
                <img src="../assets/img/logo.png"/>
                <div class="mui-media-body">
                    发送至：<span>{{name}}</span>
                    <p>{{item.jtime}}</p>
                </div>
            </div>
            <div class="mui-card-content">
                <h3>{{item.title}}</h3>
                <p>{{item.content}}</p>
            </div>
            <div class="mui-card-footer">
                发送人:<span>{{item.uname}}</span>
            </div>
        </div>
        <span v-if="messageShowAccept==true">没有给您发过邮件...</span>

    </div>

</template>

<script>
    export default {
        name: 'telPhone',
        data() {
            return {
                datas:[],
                type:'',
                name:'',
                messageShowAccept:false,
                messageShowSend:false
            }
        },
        mounted() {
            var str=this.$store.state.uid
            fetch('/ddhome/logsSend?uid='+str).then(function (e) {
                return e.json()
            }).then((e)=>{
                if(e.message=='ok'){
                    this.datas=e.result
                    this.type='send'
                    this.name=this.$store.state.uname
                    this.messageShowSend=false

                }else{
                    this.messageShowSend=true
                }

            })

        },
        watch:{
            $route(){
//                console.log(this.$route.path)
                if (this.$route.path == '/logs') {
                    var str=this.$store.state.uid
                    fetch('/ddhome/logsSend?uid='+str).then(function (e) {
                        return e.json()
                    }).then((e)=>{
                        if(e){
                            this.datas=e.result
                            this.type='send'
                            this.name=this.$store.state.uname
                            this.messageShowSend=true
                            this.messageShowAccept=false
                        }else{
                            this.messageShowSend=true
                            this.messageShowAccept=false

                        }

                    })
                }else if(this.$route.path == '/logAccept'){
                    var str1=this.$store.state.uid
                    fetch('/ddhome/logsAccept?uid='+str1).then(function (e) {
                        return e.json()
                    }).then((e)=>{
                        if(e){
                            this.datas=e.result
                            this.type='accept'
                            this.name=this.$store.state.uname
                            this.messageShowSend=false
                            this.messageShowAccept=true
                        }else{
                            this.messageShowSend=false
                            this.messageShowAccept=true
                        }
                    })
                }
            }
        }
    }
</script>

<style>
    .mui-media-body, .mui-card-content {
        text-align: left;
    }

    .mui-card-content {
        padding: 5px;
    }

    h3 {
        font-size: 20px;
    }
</style>
