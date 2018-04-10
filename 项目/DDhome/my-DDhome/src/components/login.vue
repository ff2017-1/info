<template>
    <div class="body">
        <div class="container">
            <h1>后台管理页面</h1>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="用户名:" prop="name">
                    <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    <el-button @click="resetForm('ruleForm2')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    name: '',
                    pass: '',
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    name: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        fetch('/ddhome/login?name=' + this.ruleForm2.name + '&pass=' + this.ruleForm2.pass).then(function (e) {
                            return e.json()
                        }).then((e) => {
//                            console.log(e)
                            if (e.message == 'ok') {
                                sessionStorage.setItem('login', 'yes');
//                                var name=this.ruleForm2.name
//                                sessionStorage.setItem('name',name);
                                this.$store.commit('setAid', e.aid);
                                this.$store.commit('setAname', e.aname);
                                this.$store.commit('setRid', e.rid)
                                this.$store.commit('setHeader', e.header)
                                this.$message({
                                    showClose: true,
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.$router.push('/')
                            } else if (e.message == 'err') {
                                this.$message({
                                    showClose: true,
                                    message: '登录失败',
                                    type: 'warning'
                                });
                            }
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '登录失败',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

    }
</script>
<style>
    * {
        box-sizing: border-box;
    }

    .body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url("../assets/img/loginBody.jpg") no-repeat center/cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        width: 530px;
        height: 330px;
        padding: 40px;
        border-radius: 15px;
        background: rgba(144, 145, 143, 0.2)
    }

    h1 {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 27px;
        color: #DDDAD7;
    }

    .demo-ruleForm {
        margin-top: 30px;
    }

</style>