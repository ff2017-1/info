<template>
  <div class="Root">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="初始密码" prop="oldpass">
              <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    oldpass: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var aid=this.$store.state.aid
                        var pass=this.ruleForm2.pass
                        console.log(aid,pass)
                       fetch('/ddhome/updataPass',{
                           method:'post',
                           headers:{'Content-Type':'application/x-www-form-urlencoded'},
                           body:`aid=${aid}&pass=${pass}`
                       }).then(function (e) {
                           return e.text()
                       }).then((e)=>{
                           if(e=='ok'){
                               this.$message({
                                   showClose: true,
                                   message: '修改成功',
                                   type: 'success'
                               });
                               this.$router.push('/');
                           }else{
                               this.$message({
                                   showClose: true,
                                   message: '修改失败',
                                   type: 'warning'
                               });
                           }
                       })
                    } else {
                        console.log('error submit!!');
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