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
                label="aid"
                width="120">
            <template slot-scope="scope">{{ scope.row.aid }}</template>
        </el-table-column>
        <el-table-column
                prop="aname"
                label="姓名"
                width="120">
        </el-table-column>
        <el-table-column
                prop="header"
                label="头像"
                show-overflow-tooltip>
            <template slot-scope="scope">
                <img :src="'http://localhost:8888/'+scope.row.header" alt="" width="70px">
            </template>
        </el-table-column>
        <el-table-column
                prop="lname"
                label="权限"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                label="操作"
        >
            <template slot-scope="scope">
                <el-button @click="editPass(scope.row)" type="info" plain>修改密码</el-button>

                <el-button
                        size="mini"
                        @click="Edit(scope.row)" v-show="isEditShow">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
        <div style="margin-top: 20px" v-show="isDelShow" class="toggleSel">
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
                loading2: true,
                imgUrl:'',
                aid:'',
                isEditShow:false,
                isDelShow:false,
                isQueryShow:false,
                isAddShow:false
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
            Reverse(){
                this.tableData3.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            toggleSelection(){
                this.$refs.multipleTable.clearSelection();
            },
            editPass(data){
                this.$router.push('/updataPass?aid='+data.aid)
            },
            Edit(row) {
                this.$store.commit('setLevelsInfo',row);
                this.$router.push('/updataAdmin?aid='+row.aid)
            },
            del() {
                let ids=this.multipleSelection.map(ele=>ele.aid);
                let aid=this.$store.state.aid
                this.$confirm('此操作将永久删除'+ids.length+'条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    fetch('/ddhome/delAdmin?ids='+ids+'&aid='+aid).then(function (e) {
                        return e.text()
                    }).then((e)=>{
                        if(e == 'ok'){
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type:'success'
                            });
                            this.tableData3 =  this.tableData3.filter(ele=>ids.indexOf(ele.aid) == -1);
                        }else if(e == 'no'){
                            this.$message({
                                showClose: true,
                                message: '权限不足',
                                type: 'warning'
                            });
                        } else{
                            this.$message({
                                showClose: true,
                                message: '删除失败',
                                type:'warning'
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
        mounted(){
            let rid=this.$store.state.rid;
            let aid=this.$store.state.aid;
            fetch('/ddhome/adminQuery?rid='+rid+'&aid='+aid).then((e)=>{
                return e.json()
            }).then((e)=>{
//                console.log(e)
              var num;
                for(var i=0;i<e.length;i++){
                   if(e[i].rid == 4){
                       num=e[i].lnum
                   }else{
                       num=e[0].lnum
                   }
                }
                this.isDelShow=num.indexOf(2)>-1?true:false;
                this.isEditShow=num.indexOf(4)>-1?true:false;
                this.isQueryShow=num.indexOf(3)>-1?true:false;
                this.isAddShow=num.indexOf(1)>-1?true:false;
                this.$store.commit('setAddShow',this.isAddShow)
                this.$store.commit('setDelShow',this.isDelShow)
                this.$store.commit('setEditShow',this.isEditShow)
                this.$store.commit('setQueryShow',this.isQueryShow)
                this.tableData3=e;
                this.loading2=false

            })
//            var user=sessionStorage.getItem('name')
//            console.log(user)
//            fetch('/ddhome/UpAdminCon?name='+user).then(function (e) {
//                return e.json()
//            }).then((e)=>{
//                console.log(e)
//                this.aid=e[0].aid
//            })
        }
    }
</script>