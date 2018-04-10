<template>
    <div class="box-wirte container1">
           <div class="from-group">
               <label>标题:</label>
               <input type="text" placeholder="请输入标题" v-model="title">
           </div>
           <div class="from-group">
               <label>内容:</label>
               <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
           </div>
           <div  @click="save()" class="from-group ">
               <label>联系人:</label>
               <router-link to="/logsUser" class=" mui-btn btn-sub">
                   {{message}}
                   <div class=" mui-icon mui-icon-arrowright" style="line-height:20px;float: right"></div>
               </router-link>

           </div>
           <button type="button"  class="mui-btn mui-btn-primary" @click="submit()">提交</button>


    </div>
</template>
<script>
    export default {
        name: 'wirte',
        data() {
            return {
                message:'',
                uid:'',
                title:'',
                content:''
            }
        },
        methods:{
            save(){
                var title=this.title;
                var con=this.content;
                console.log(title)
                console.log(con)
                this.$store.commit('setTitle',title);
                this.$store.commit('setContent',con);
            },
            submit(){
                    var str='uid1='+this.$store.state.uid+'&uid2='+this.$route.params.uid+'&title='+this.title+'&content='+this.content
            fetch('/ddhome/logsSubmit?'+str).then(function (e) {
                return e.text()
            }).then((e)=>{
                if (e == 'ok') {
                    alert('发送成功')
                    this.title=''
                    this.content=''
                } else {
                    alert('发送失败')
                }
            })
            }
        },
        created(){
            this.title=this.$store.state.title
            this.content=this.$store.state.content
            this.uid=this.$route.params.uid;
            this.message=this.$route.params.uname?this.$route.params.uname:'请选择'
        }
    }
</script>
<style>
    .btn-sub1{
        width:100%;
        margin-top: 10px;
    }
    .btn-sub{
        width:90%;
        height:35px;
        margin-top: 10px;
    }
    .container1{
        width:100%;
        margin-top: 20px;
    }
    .from-group{
        width:100%;
        display: flex;
        padding: 0 10px;
    }
    .from-group>label{
        width:20%;
        line-height: 44px;
        font-size: 16px;
    }
    .from-group>input,.from-group>textarea{
        width:90%;
        font-size: 16px;

    }
    .from-group>input{
        height:44px;
    }
    .from-group>textarea{
        padding: 10px;
    }
.mui-btn-primary{
    width:95%;
    height:35px;
    margin-top: 20px;
}

</style>