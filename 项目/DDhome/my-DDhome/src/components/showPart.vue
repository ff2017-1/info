<template>
    <div v-show="isQueryShow" class="Root">
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
                    label="部门ID"
                    width="120">
                <template slot-scope="scope">{{ scope.row.pid }}</template>
            </el-table-column>
            <el-table-column
                    prop="pname"
                    label="部门名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="parentName"
                    label="所属部门"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="Edit(scope.row.parentid,scope.row.pid,scope.row.pname)" v-show="isEditShow">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px"   v-show="isDelShow" class="toggleSel">
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
                arr:[]
            }
        },
        methods: {
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
            Edit(row,a,b) {
                this.$router.push('/updataPart?parentid=' + row+'&pid='+a+'&pname='+b)
            },
            del() {
                var arr=this.arr;
                let ids = this.multipleSelection.map(ele => ele.pid);
                let aid=this.$store.state.aid
                if(ids.length>0){
                    this.$confirm('此操作将永久删除当前部门及其下属部门数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        fetch('/ddhome/delPart?ids=' + ids+'&aid='+aid).then(function (e) {
                            return e.json()
                        }).then((e) => {
                            console.log(e)
                            if (e.message == 'ok') {
                                this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'

                                });
                                var arr1=e.arr1
                                console.log(arr1)
                                this.tableData3 = this.tableData3.filter(ele => arr1.indexOf(ele.pid) == -1);
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
                }else{
                    this.$message({
                        showClose: true,
                        type: 'info',
                        message: '本次没有删除信息'
                    });
                }

            }
        },
        mounted() {
            this.isDelShow=this.$store.state.isDelShow;
            this.isEditShow=this.$store.state.isEditShow;
            this.isQueryShow=this.$store.state.isQueryShow;
            this.isAddShow=this.$store.state.isAddShow;
            var arr1=[]
            fetch('/ddhome/showPart').then((e) => {
                return e.json()
            }).then((e) => {
                console.log(e)
                var a=e.result
                for(var i=0;i<a.length;i++){
                    if(a[i].children.length>0){
                        arr1.push(a[i].pid)
                    }
                    for(var j=0;j<a.length;j++){
                        if(a[i].parentid==a[j].pid){
                            a[i].parentName=a[j].pname
                        }
                    }
                }
//                this.arr=arr1
//                console.log(a   )
                this.tableData3=a
                this.loading2=false
            })
        }
    }
</script>