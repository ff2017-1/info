<template>
    <div v-show="isQueryShow" class="Root">
<div style="display: flex">
    <div style="line-height: 40px;color: #909399;    font-size: 14px;font-weight: 700;margin-right: 10px">部门搜索</div>
    <el-cascader
            :options="options"
            :change-on-select="false"
            :filterable="true"
            v-model="selectedOptions"
            clearable
            @change="handleChange">
    </el-cascader>
</div>


        <el-table
                v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                height="400"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="员工ID"
                    width="120">
                <template slot-scope="scope">{{ scope.row.uid }}</template>
            </el-table-column>
            <el-table-column
                    prop="uname"
                    label="员工名"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="uphone"
                    label="员工电话"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="header"
                    label="头像"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <img :src="'../../../'+scope.row.uphoto" alt="" width="70px">
                </template>
            </el-table-column>
            <el-table-column
                    prop="pid"
                    label="所属部门"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="Edit(scope.row.uid,scope.row.pid,scope.row.uphoto,scope.row.uname,scope.row.uphone)" v-show="isEditShow">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toggleSel" style="margin-top: 20px"   v-show="isDelShow" >
            <el-button @click="Reverse()">反选</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button @click="del()">删除</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [],
                multipleSelection: [],
                loading2: true,
                isEditShow:false,
                isDelShow:false,
                isQueryShow:false,
                isAddShow:false,
                options: [
                    //       value       pid
                    //        label     pname
                ],
                selectedOptions: [],

            }
        },
        methods: {
            handleChange(value) {
                var pid=value.slice(value.lastIndexOf(','))
                fetch('/ddhome/showUser?pid='+pid).then(function (e) {
                    return e.json()
                }).then((e)=>{
                    this.tableData3=e
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            Reverse() {
                this.tableData3.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            toggleSelection() {
                this.$refs.multipleTable.clearSelection();
            },
            Edit(uid,pid,uphoto,uname,uphone) {
                this.$router.push('/updataUser?uid=' + uid+'&pid='+pid+'&uphoto='+uphoto+'&uname='+uname+'&uphone='+uphone)
            },
            del() {
                let ids = this.multipleSelection.map(ele => ele.uid);
                let aid=this.$store.state.aid
                this.$confirm('此操作将永久删除'+ids.length+'条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    fetch('/ddhome/delUser?ids=' + ids+'&aid='+aid).then(function (e) {
                        return e.text()
                    }).then((e) => {
                        if (e == 'ok') {
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'

                            });
                            this.tableData3 = this.tableData3.filter(ele => ids.indexOf(ele.uid) == -1);
                        }else if(e == 'no'){
                            this.$message({
                                showClose: true,
                                message: '权限不足',
                                type: 'warning'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: '删除失败',
                                type: 'warning'

                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }


        },
        mounted() {
            this.isDelShow=this.$store.state.isDelShow;
            this.isEditShow=this.$store.state.isEditShow;
            this.isQueryShow=this.$store.state.isQueryShow;
            this.isAddShow=this.$store.state.isAddShow;
            fetch('/ddhome/showUser').then((e) => {
                return e.json()
            }).then((e) => {
                console.log(e)
                this.tableData3 = e
                this.loading2=false
            })
            fetch('/ddhome/showPart').then(function (e) {
                return e.text()
            }).then((e)=>{
                var h=e.replace(/pname/g,"label").replace(/pid/g,"value").replace(/\,\"children\"\:\[\]/g,"")
                this.options=JSON.parse(h).arr
//
            })
        }
    }
</script>
<style>
    .toggleSel{
        text-align: left;
    }
</style>