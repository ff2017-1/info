<template>
    <div class="Root">
        <el-form ref="form" :model="form" label-width="150px">

            <el-form-item label="更改管理员名称">
                <el-input v-model="form.aname"></el-input>
            </el-form-item>
            <el-form-item label="更改权限">
                <template style="float: left">
                    <el-radio v-model="rid" :label="item.lid" v-for="item in table" :key="item.lid">{{item.lname}}</el-radio>
                </template>
            </el-form-item>
                <input type="hidden" name="header" v-model="header">
            <div style="position: relative;height:160px;display: flex;">
                <div style="text-align: left;margin-left: 80px;color: #606266;font-size: 14px">用户头像</div>
                <img :src="this.imgOderUrl" alt="" width="178" height="178" class="imgOder">
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
                aid:'',
                aname:'',
                header:'',
                rid:'',
                table:[],
                imgOderUrl:'',
                imageUrl: '',
                radio: '1'
            }
        },
        methods: {
            onSubmit(form) {
                this.aid = this.$route.query.aid;
                var aname=form.aname;
                var header=this.header;
                var rid=this.rid;
//                console.log(aname)
//                console.log(header)
//                console.log(rid)
                fetch('/ddhome/updataAdmin?aname='+aname+'&header='+header+'&rid='+rid+'&aid='+this.aid).then(function (e) {
                    return e.text();
                }).then((e)=>{
                    if (e =='ok') {
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
            },
            handleAvatarSuccess(res, file) {
                this.header=res
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
        mounted(){
//            console.log(this.$store.state.levelsInfo)
            this.table=this.$store.state.levelsInfo.levels
            this.rid=this.$store.state.levelsInfo.rid
            this.form.aname=this.$store.state.levelsInfo.aname
            this.imgOderUrl='http://localhost:8888/'+this.$store.state.levelsInfo.header
//            console.log(this.table1)
//            this.aid = this.$route.query.aid;
//            fetch('/ddhome/UpAdminCon?aid='+this.aid).then(function (e) {
//                return e.json()
//            }).then((e)=>{
////                console.log(e)
//                this.form=e[0];
//            })
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