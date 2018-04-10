<template>
    <div v-show="isAddShow" class="Root">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="lname">
            <el-input v-model="ruleForm.lname"></el-input>
        </el-form-item>

        <el-form-item label="权限" prop="lid">
            <el-checkbox-group
                    v-model="checkedlevels"
                    :min="1"
            >
                <el-checkbox v-for="item in levels" :label="item.rid" :key="item.rid">{{item.rname}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
    </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    lname: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                    ],
                },
                checkedlevels: [],
                levels: [],
                isAddShow:false,

            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
//                        var checkedlevels=this.checkedlevels;
//                        var lname=this.ruleForm.lname;
                        var str='checkedlevels='+this.checkedlevels+'&lname='+this.ruleForm.lname
                        fetch('/ddhome/addLevel?'+str).then(function (e) {
                            return e.text()
                        }).then((e)=> {
                            if(e=='ok'){
                                this.$message({
                                    showClose: true,
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.checkedlevels=[];
                                this.ruleForm.lname='';
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '添加失败',
                                    type: 'warning'
                                });
                                this.checkedlevels=[];
                                this.ruleForm.lname='';
                            }
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '添加失败',
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

        created(){
            this.isAddShow=this.$store.state.isAddShow
            fetch('/ddhome/showRoot').then(function (e) {
//                    console.log(e);
                    return e.json()
                }).then((e)=>{
                    this.levels=e;
//                    console.log(this.levels)
                })
        }
    }
</script>