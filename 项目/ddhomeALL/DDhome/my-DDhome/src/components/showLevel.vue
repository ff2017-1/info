<template>
    <div  v-show="isQueryShow" class="Root">
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
                    label="角色ID"
                    width="120">
                <template slot-scope="scope">{{ scope.row.lid }}</template>
            </el-table-column>
            <el-table-column
                    prop="lname"
                    label="角色名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="rname"
                    label="角色权限"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                <span v-for="item in scope.row.lnum">{{item.rname+'&nbsp'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="Edit(scope.row)" v-show="isEditShow">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px"  v-show="isDelShow" class="toggleSel">
            <el-button @click="Reverse()">反选</el-button>
            <el-button  @click="toggleSelection()">取消选择</el-button>
            <el-button  @click="del()">删除</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [],
                multipleSelection: [],
                table:[],
                loading2: true,
                isEditShow:false,
                isDelShow:false,
                isQueryShow:false,
                isAddShow:false
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            Reverse(){
                this.tableData3.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            toggleSelection(){
                this.$refs.multipleTable.clearSelection();
            },
            Edit(row) {
                this.$store.commit('setRoleInfo',row);
                this.$router.push('/updataLevel?lid='+row.lid)
            },
            del(data){
                let ids=this.multipleSelection.map(ele=>ele.lid);
                let aid=this.$store.state.aid
                this.$confirm('此操作将永久删除'+ids.length+'条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    fetch('/ddhome/delLevel?ids='+ids+'&aid='+aid).then(function (e) {
                        return e.text()
                    }).then((e)=>{
                        if(e == 'ok'){
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            });
                            this.tableData3 =  this.tableData3.filter(ele=>ids.indexOf(ele.lid) == -1);
                        }else if(e == 'no'){
                            this.$message({
                                showClose: true,
                                message: '权限不足',
                                type: 'warning'
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: '删除失败',
                                type: 'warning'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            }
            },


        created(){
            this.isDelShow=this.$store.state.isDelShow;
            this.isEditShow=this.$store.state.isEditShow;
            this.isQueryShow=this.$store.state.isQueryShow;
            this.isAddShow=this.$store.state.isAddShow;
            fetch('/ddhome/showLevel').then((e)=>{
                return e.json()
            }).then((e)=>{
//                console.log(e)
                this.tableData3=e
                this.loading2=false

            })
        }
    }
</script>