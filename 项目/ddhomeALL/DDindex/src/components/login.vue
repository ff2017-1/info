<template>
    <div class="body">
        <form class=" form">
            <div class="formHeader">登录</div>
            <div class="mui-input-row">
                <label>用户名</label>
                <input type="text" v-model="name" class="mui-input-clear" placeholder="请输入用户名">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" v-model="pass" class="mui-input-password" placeholder="请输入密码">
            </div>
            <div class="mui-button-row button-box">
                <button type="button" class="button-button mui-btn mui-btn-primary" @click="submit" >登录</button>
                <button type="button" class="button-button mui-btn mui-btn-danger" >注册</button>
            </div>

        </form>
    </div>
       
</template>
<script>
    export default {
        data() {
            return {
                    name: '',
                    pass: '',
            };
        },
        methods: {
            submit() {
                console.log(this.name)
                console.log(this.pass)
                fetch('/ddhome/indexLogin?name='+this.name+'&pass='+this.pass).then(function (e) {
                    return e.json()
                }).then((e)=>{

                    if(e.message=='ok'){
                        alert('登录成功')
                        this.$store.commit('setUid',e.uid);
                        this.$store.commit('setUname',e.uname);
                        this.$store.commit('setUpass',e.upass);
                        this.$store.commit('setUphone',e.uphone)
                        this.$store.commit('setUphoto',e.uphoto)
                        this.$router.push('/index')
                    }else{
                        alert('登陆失败')
                    }
                })
            }
        }

    }
</script>
<style>
    input{
       outline: none;
    }
    .button-button{
        width: 54px;
        height:33px;
    }
    .body{
        width:100%;
        height:100%;
        overflow: hidden;
        position: relative;
        background: url("../assets/img/bg.png") no-repeat center/cover;
    }
    .form{
        width:300px;
        height:200px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right:0;
        margin: auto;
        border-radius: 10px;
        border: none;
        background: #ffffff;
    }
    .mui-input-row input:-webkit-autofill{
        background-color: #ffffff;
    }
    .formHeader{
        width:100%;
        height:40px;
        background: #74A4FF;
        line-height: 40px;
        border-radius:10px 10px 0 0;
        margin-bottom: 20px;
    }
    .mui-input-row{
        border-bottom: 1px solid #dddddd;
    }
    .button-box{
        padding-top: 15px;
    }
    .mui-btn-primary{
        margin-top: 0;
    }
</style>