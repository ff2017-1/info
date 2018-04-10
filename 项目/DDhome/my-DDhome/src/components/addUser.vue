<template>
    <div v-show="isAddShow" class="Root">
        <el-upload
                class="upload-demo"
                action="/ddhome/upPostUser"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleAvatarSuccess"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
                        clearable
                        @change="handleChange">
                </el-cascader>
            </el-form-item>
            <!--<router-view>-->

            <!--</router-view>-->

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
                    uphone:'',
                    pid:''
                },
                isAddShow:false,
                fileList: [],
                data:[]
            };
        },
        methods: {
            submitForm(formName) {
//                console.log(this.ruleForm2.uname);
//                console.log(this.ruleForm2.uphone);
//                console.log(this.ruleForm2.uphoto);
                this.ruleForm2.selectedOptions=this.ruleForm2.selectedOptions.slice(-1);
//                console.log(this.ruleForm2.selectedOptions)
                var str='uname='+this.ruleForm2.uname+'&uphone='+this.ruleForm2.uphone+'&pid='+this.ruleForm2.selectedOptions
                fetch('/ddhome/addUser?'+str).then(function (e) {
                    return e.text()
                }).then((e)=>{
                    if(e=='ok'){
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        this.ruleForm2.uname=''
                        this.ruleForm2.uphone=''
                        this.ruleForm2.uphoto=''
                        this.ruleForm2.selectedOptions=[]
                        this.ruleForm2.uphoto=''
                        this.$router.push('/showUser')
                    }else if(e=='repeat'){
                        this.$message({
                            showClose: true,
                            message: '该用户名已存在',
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '添加失败',
                            type: 'warning'
                        });
                    }
                })
            },
            handleChange(value) {
                this.parentid=value
//                console.log(value);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                console.log(files, fileList)
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                console.log(file, fileList)
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleAvatarSuccess(req,res, file) {
                console.log(req)
                if(req=='ok'){
                    this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                }else if(req.length){
                    console.log(res)
                    this.$message({
                            showClose: true,
                            message: '添加失败1',
                            type: 'warning'
                        });
                }else{
                    this.$message({
                            showClose: true,
                            message: '添加失败',
                            type: 'warning'
                        });
                }
//                var data=this.data
//                var arr=[]
//                for(var i=1;i<res.length;i++){
//                    var obj={}
//                        obj.uname=res[i][0]
//                        obj.uphone=res[i][1]
//                    for(var j=0;j<data.length;j++){
//                        if(data[j].label==res[i][2]){
//                            obj.pid=data[j].value
//                            arr.push(obj)
//                        }
//                    }
//                }
//                arr=JSON.stringify(arr)
//                fetch('/ddhome/addUsersCons',{
//                    method:'post',
//                    headers:{'Content-Type':'application/x-www-form-urlencoded'},
//                    body:`arr=${arr}`
//                }).then(function (e) {
//                    return e.text()
//                }).then((e)=>{
//                    if(e=='ok'){
//                        this.$message({
//                            showClose: true,
//                            message: '添加成功',
//                            type: 'success'
//                        });
//                    }else{
//                        this.$message({
//                            showClose: true,
//                            message: '添加失败',
//                            type: 'warning'
//                        });
//                    }
//
//                })
            },
        },
        created(){
            this.isAddShow=this.$store.state.isAddShow;
            fetch('/ddhome/showPart').then(function (e) {
                return e.text()
            }).then((e)=>{
                var h=e.replace(/pname/g,"label").replace(/pid/g,"value").replace(/\,\"children\"\:\[\]/g,"")
                this.options=JSON.parse(h).arr
                this.data=JSON.parse(h).result
            })
        }

    }
</script>
<style>
    .avatar-uploader{
        display: flex;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        top:-30px;
        left: 85px;
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