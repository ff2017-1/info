<template>
    <div v-show="isAddShow" class="Root">

        <el-form label-width="80px" :model="ruleForm2">
            <el-form-item label="员工名字">
                <el-input v-model="ruleForm2.uname"></el-input>
            </el-form-item>
            <el-form-item label="员工电话">
                <el-input v-model="ruleForm2.uphone"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" style="text-align: left">
                <el-cascader
                        :options="options"
                        :change-on-select="false"
                        :filterable="true"
                        v-model="ruleForm2.selectedOptions"
                        @change="handleChange">
                </el-cascader>
            </el-form-item>
            <div style="position: relative">
                <el-form-item style="position: absolute;top: 15px;">
                    <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
                </el-form-item>
            </div>

        </el-form>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                options: [
                    //       value       pid
                    //        label     pname
                ],
                selectedOptions: [],
                ruleForm2: {
                    uname: '',
                    upass: '',
                    uphone: '',
                    pid: ''
                },
                isAddShow: false,
                parentid: '',
            };
        },
        methods: {
            submitForm(formName) {
                var uid = this.$route.query.uid
                this.ruleForm2.selectedOptions = this.ruleForm2.selectedOptions.slice(-1);
                var str = 'uname=' + this.ruleForm2.uname + '&uphone=' + this.ruleForm2.uphone + '&pid=' + this.ruleForm2.selectedOptions+'&uid=' + uid
                fetch('/ddhome/updataUser?' + str).then(function (e) {
                    return e.text()
                }).then((e) => {
                    if (e == 'ok') {
                        this.$message({
                            showClose: true,
                            message: '更改成功',
                            type: 'success'
                        });
                        this.$router.push('/showUser')
                    } else {
                        this.$message({
                            showClose: true,
                            message: '更改失败',
                            type: 'warning'
                        });
                    }
                })
            },
            handleChange(value) {
                this.parentid = value
//                console.log(value);
            }
        },
        created() {
            var pid = parseInt(this.$route.query.pid)
//            console.log(typeof (pid))
            this.ruleForm2.uname = this.$route.query.uname
            this.ruleForm2.uphone = this.$route.query.uphone
            this.isAddShow = this.$store.state.isAddShow;
            fetch('/ddhome/showPart').then(function (e) {
                return e.text()
            }).then((e) => {
                var h = e.replace(/pname/g, "label").replace(/pid/g, "value").replace(/\,\"children\"\:\[\]/g, "")
                this.options = JSON.parse(h).arr
                var arr = []
                var data = JSON.parse(h).result
                var data1 = JSON.parse(h).arr
                for (var i = 0; i < data1.length; i++) {
                    if (data1[i].pid = pid) {
                        this.parentid = data[i].parentid
                    }
                }

                function tree(data, num, nump, arr) {
                    arr.push(num)
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].value == nump) {
                            tree(data, data[i].value, data[i].parentid, arr);
                        }
                    }
                    return arr
                }
//                console.log(pid)
                var parentid=parseInt(this.parentid)
                var d = tree(data, parentid, pid, arr)
                this.ruleForm2.selectedOptions = d.reverse()
//                console.log(this.ruleForm2.selectedOptions)
            });

        }

    }
</script>
<style>
    .el-form-item__content{
        text-align: left;
    }
    .avatar-uploader{
        margin-left: 20px;
    }
    .imgOder{
      position: absolute;
        top:-10px;
        left:320px;
        margin-left: 20px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        overflow: hidden;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>