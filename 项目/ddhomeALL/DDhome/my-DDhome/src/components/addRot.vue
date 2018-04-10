<template>
    <div v-show="isAddShow" class="Root">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="权限名称">
                <el-input v-model="form.rname"></el-input>
            </el-form-item>
            <el-form-item label="权限值">
                <el-input v-model="form.lid"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="subimt(form)">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                form:{
                },
                optiong:[

                ],
                rname:'',
                lid:'',
                isAddShow:false,
            }
        },
        methods: {
            subimt(form) {
                var str = 'rname=' + this.form.rname + '&lid=' + this.form.lid
                console.log(str)
                fetch('/ddhome/addRoot?'+str).then(function (e) {
                    return e.text()
                }).then((e) => {
                    if (e == 'ok') {
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        this.form.rname = '';
                        this.form.lid = '';
                    } else {
                        this.$message({
                            showClose: true,
                            message: '添加失败',
                            type: 'warning'
                        });
                        this.form.rname = '';
                        this.form.lid = '';
                    }
                })
            }
        },
        created(){
            this.isAddShow=this.$store.state.isAddShow
        }

    }
</script>
<style>

</style>