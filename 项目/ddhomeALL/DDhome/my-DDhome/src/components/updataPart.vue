<template>
    <div class="Root">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="所属部门" style="text-align: left">
                <el-cascader
                        :options="options"
                        change-on-select
                        v-model="form.selectedOptions"
                        clearable
                        @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="部门名称">
                <el-input v-model="form.pname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="subimt(form)" style="text-align: left">更改</el-button>
            </el-form-item>
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
                form: {},
                optiong: [],
                pname: '',
                oldParentid:'',
                oldPname:'',
            }
        },
        methods: {
            subimt(form) {

                if(this.oldParentid==this.form.selectedOptions && !this.oldPname==this.form.pname ||this.oldParentid==this.form.selectedOptions){
                    this.$message({
                        showClose: true,
                        message: '信息未发生改变',
                        type: 'warning'
                    });
                }else{
                    if (this.form.selectedOptions == undefined ) {
                        this.form.selectedOptions = 0
                    }
                    console.log(this.form.selectedOptions)
                    var pid = parseInt(this.$route.query.pid)
                    var str = 'pname=' + this.form.pname + '&parentid=' + this.form.selectedOptions + '&pid=' + pid;
                    fetch('/ddhome/updataPart?' + str).then(function (e) {
                        return e.text()
                    }).then((e) => {
                        if (e == 'ok') {
                            this.$message({
                                showClose: true,
                                message: '更改成功',
                                type: 'success'
                            });

                        this.$router.push('/showPart')
                        } else {
                            this.$message({
                                showClose: true,
                                message: '更改失败',
                                type: 'warning'
                            });
                        }
                    })
                }

            },
            handleChange(value) {
                console.log(value);
            }
        },
        mounted() {
            var parentid = this.$route.query.parentid
            var pname = this.$route.query.pname
            var pid = parseInt(this.$route.query.pid)
            this.form.pname = pname
            this.oldPname=pname
            fetch('/ddhome/showPart').then(function (e) {
                return e.text()
            }).then((e) => {

//                console.log(e)
                var h=e.replace(/pname/g,"label").replace(/pid/g,"value").replace(/\,\"children\"\:\[\]/g,"")
                this.options=JSON.parse(h).arr
//                不能删除与只能删除底层
                var arr = []
                var data = JSON.parse(h).result
//                console.log(data)
                function tree(data, num, nump, arr) {
                    arr.push(num)
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].value == nump) {
                            tree(data, data[i].value, data[i].parentid, arr);
                        }
                    }
                    return arr
                }
//
                var d = tree(data, pid, parentid, arr)
                this.form.selectedOptions = d.reverse()
                this.oldParentid=this.form.selectedOptions
            })
        }

    }
</script>
<style>
    .block {
        float: left;
    }
</style>