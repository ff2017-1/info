<template>
    <div class="Root">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="更改权限名">
                <el-input v-model="form.rname"></el-input>
            </el-form-item>
            <el-form-item label="更改权限值">
                <el-input v-model="form.lid"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(form)">更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                form:{

                },
                rid:'',
                lid:'',
                rname:'',
                table:[]
            }
        },
        methods: {
            onSubmit(form) {
                    this.rid = this.$route.query.rid;
                    var rname=form.rname;
                    var lid=form.lid;
                    fetch('/ddhome/updataRoot?rname='+rname+'&lid='+lid+'&rid='+this.rid).then(function (e) {
                        return e.text();
                    }).then((e)=>{
                        if (e =='ok') {
                            this.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.push('/showRoot');
                        }else{
                            this.$message({
                                showClose: true,
                                message: '修改失败',
                                type: 'warning'
                            });
                        }
                    })



            }
        },
        mounted(){
            this.rid = this.$route.query.rid;
            fetch('/ddhome/UpRootCon?rid='+this.rid).then(function (e) {
                return e.json()
            }).then((e)=>{
                this.form=e[0];
            })
        }
    }
</script>
<style>
    .Root{
        margin-top: 20px;
    }
</style>