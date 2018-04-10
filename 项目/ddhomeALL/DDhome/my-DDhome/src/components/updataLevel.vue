<template>
    <div class="Root">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称" prop="lname">
                <el-input v-model="ruleForm.lname"></el-input>
            </el-form-item>

            <el-form-item label="角色权限" prop="lid">
                <el-checkbox-group
                        v-model="checkedlevels"
                >
                    <el-checkbox v-for="item in levels" :label="item.rid" :key="item.rid">{{item.rname}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
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
                levels: []
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
//                        console.log(this.checkedlevels)
                        this.lid=this.$route.query.lid
                        console.log(this.lid)
                        var str='checkedlevels='+this.checkedlevels+'&lname='+this.ruleForm.lname+'&lid='+this.lid;
                        fetch('/ddhome/updataLevel?'+str).then(function (e) {
                            return e.text()
                        }).then((e)=> {
                            if(e=='ok'){
                                this.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$router.push('/showLevel')
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '修改失败',
                                    type: 'warning'
                                });
                            }
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '修改失败',
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
            this.ruleForm.lname=this.$store.state.RoleInfo.lname
            this.levels=this.$store.state.RoleInfo.levels
            var arr=this.$store.state.RoleInfo.lnum;
            for(var i in arr){
                this.checkedlevels.push(parseInt(arr[i].lid))
            }


//            this.lid=this.$route.query.lid
//            fetch('/ddhome/showRoot').then(function (e) {
//                return e.json()
//            }).then((e)=>{
//                this.levels=e;
////                console.log(this.levels)
//            })
//            this.lid=this.$route.query.lid
//            fetch('/ddhome/updataLevelCon?lid='+this.lid).then(function (e) {
//                return e.json()
//            }).then((e)=>{
//                var ids=e[0].lnum;
//                fetch('/ddhome/udataLevelCons?ids='+ids).then(function (q) {
//                    return q.json()
//                }).then((q)=>{
//                    for(var i in q){
//                        this.checkedlevels.push(parseInt(q[i].lid))
//
//                    }
//                })
//                this.ruleForm.lname=e[0].lname
//            });
        },

    }
</script>