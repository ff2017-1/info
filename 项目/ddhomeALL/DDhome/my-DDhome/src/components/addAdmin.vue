<template>
    <div v-show="isAddShow" class="Root">

    <el-form label-width="80px" :model="ruleForm2">
        <el-form-item label="管理名字">
            <el-input v-model="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
            <el-input v-model="ruleForm2.pass"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="rid">
            <el-radio-group v-model="ruleForm2.rid" >
                <el-radio :label="item.lid" v-for="item in table" :key="item.lid">{{item.lname}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="权限">-->
            <!--&lt;!&ndash;<el-input v-model="ruleForm2.rid"></el-input>&ndash;&gt;-->
        <!--<template>-->
            <!---->
            <!--<el-radio v-model="ruleForm2.rid" :label="item.lid" v-for="item in table">{{item.lname}}</el-radio>-->
        <!--</template>-->
            <!--</el-form-item>-->
        <input type="hidden" name="header" v-model="ruleForm2.header">
        <div style="position: relative;height:160px">
            <div style="text-align: left;margin-left: 15px;color: #606266;font-size: 14px">用户头像</div>
            <el-upload
                class="avatar-uploader"
                action="/ddhome/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </div>
        <span style="display:block;width:100%;text-align: left;margin-left: 85px;margin-top: 50px">只能上传jpg/png文件，且不超过2000kb</span>

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
                ruleForm2: {
                    name: '',
                    pass: '',
                    rid:'',
                    header:''
                },
                table:[],
                imageUrl: '',
                radio: '1',
                isAddShow:false,
            };
        },
        methods: {
            submitForm(formName) {
//                console.log(this.ruleForm2.name)
//                console.log(this.ruleForm2.pass)
//                console.log(this.ruleForm2.header)
//                console.log(this.ruleForm2.rid)
                        var str='name='+this.ruleForm2.name+'&pass='+this.ruleForm2.pass+'&header='+this.ruleForm2.header+'&rid='+this.ruleForm2.rid
                        fetch('/ddhome/addAdmin?'+str).then(function (e) {
                            return e.text()
                        }).then((e)=>{
                           if(e=='ok'){
                               this.$message({
                                   showClose: true,
                                   message: '添加成功',
                                   type: 'success'
                               });
                               this.ruleForm2.name=''
                               this.ruleForm2.pass=''
                               this.ruleForm2.header=''
                               this.ruleForm2.rid=''
                               this.$router.push('/')
                           }else{
                               this.$message({
                                   showClose: true,
                                   message: '添加失败',
                                   type: 'warning'
                               });
                           }
                        })
                    },
            handleAvatarSuccess(res, file) {
                this.ruleForm2.header=file.response
//                console.log(this.ruleForm2.header)
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' ||file.type === 'image/png' ;
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
            },
        created(){
            this.isAddShow=this.$store.state.isAddShow;
            fetch('/ddhome/showLevel').then(function (e) {
                return e.json()
            }).then((e)=>{
               this.table=e
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