<template>
    <div>
        <div style="height: 60px;"></div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">个人中心</h1>
        </header>
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>用户名</label>
                <input type="text" v-model="name" class="mui-input-clear" placeholder="请输入用户名">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" v-model="pass" class="mui-input-password" placeholder="请输入密码">
            </div>
            <div class="mui-input-row">
                <label>确认密码</label>
                <input type="password" v-model="aginPass" class="mui-input-password" placeholder="请确认输入密码">
            </div>
            <div class="mui-button-row">
                <button type="button" class=" btn-btn mui-btn mui-btn-primary" @click="submit">确认修改</button>
                <button type="button" class="btn-btn1 mui-btn mui-btn-danger">取消</button>
            </div>

        </form>
    </div>
</template>
<script>
    export default {
        name: 'updata',
        data() {
            return {
                name: '',
                pass: '',
                aginPass: ''
            }
        },
        methods: {
            back() {
                this.$router.back()
            },
            submit() {
                if(this.pass==this.aginPass){

                    var str='name='+this.name+'&pass='+this.pass+'&uid='+ this.$store.state.uid;
                    fetch('/ddhome/updataPass?'+str).then(function (e) {
                        return e.text()
                    }).then((e) => {
                        if (e == 'ok') {
                            alert('修改成功,请重新登录');
                            this.$router.push('/')
                        }else{
                            alert('修改失败')
                        }
                    })
                }else{
                    alert('俩次输入密码不一致，请重新输入');
                    this.name='';
                    this.pass='';
                    this.aginPass=''
                }

            }
        },
        mounted() {
            this.name = this.$store.state.uname;
            this.pass = this.$store.state.upass;
        }
    }
</script>
<style scoped>
    .mui-input-group {
        border-radius: 10px;
    }
    .btn-btn{
        width:82px;
    }
    .btn-btn1{
        width:54px;
    }
</style>