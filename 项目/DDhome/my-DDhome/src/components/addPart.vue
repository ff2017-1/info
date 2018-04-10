<template>
    <div v-show="isAddShow" class="Root">
        <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="部门名称" style="text-align: left">
                <el-cascader
                        :options="options"
                        change-on-select
                        v-model="form.selectedOptions"
                        @change="handleChange">
                </el-cascader>
                </el-form-item>
            <el-form-item label="部门名称">
                <el-input v-model="form.pname"></el-input>
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
                options: [
                    //       value       pid
                    //        label     pname
                ],
                selectedOptions: [],
                form:{},
                optiong:[],
                pname:'',
                isAddShow:false,
            }
        },
        methods: {
            subimt(form) {
//                console.log(this.form)
//                console.log(this.form.pname)
//                console.log(this.form.selectedOptions)
                if(this.form.selectedOptions==undefined||this.form.selectedOptions==1){
                    this.form.selectedOptions=0
                }
                var str='pname='+this.form.pname+'&parentid='+this.form.selectedOptions;
                fetch('/ddhome/addPart?'+str).then(function (e) {
                    return e.text()
                }).then((e)=>{
                    console.log(typeof(e))
                    if(e =='ok'){
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        this.form.selectedOptions='';
                        this.form.pname='';
                        this.$router.push('/showPart')
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
            }
        },
        mounted(){
            this.isAddShow=this.$store.state.isAddShow
            fetch('/ddhome/showPart').then(function (e) {
                return e.text()
            }).then((e)=>{
//                console.log(e)
                var h=e.replace(/pname/g,"label").replace(/pid/g,"value").replace(/\,\"children\"\:\[\]/g,"")
                this.options=JSON.parse(h).arr
            })
        }

    }
</script>
<style>
.block{
    float: left;
}
</style>