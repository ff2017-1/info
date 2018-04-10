<template>
    <div>
        <div class="menu-user" style="">
            <div class="muser-img">
                <img :src="'../../../'+header" alt="">
            </div>
            <span style="position: absolute;top: 120px;left: 48px;">你好！{{aname}},欢迎登陆</span>
        </div>
        <el-row class="tac" style="margin-top: 150px">
            <el-col :span="24">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#393D49"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>管理员管理</span>
                        </template>

                        <router-link to="/">
                            <el-menu-item index="1-3">
                                查看管理员
                            </el-menu-item>
                        </router-link>
                        <router-link to="/addAdmin">
                            <el-menu-item index="1-2">
                                添加管理员
                            </el-menu-item>
                        </router-link>


                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-loading"></i>
                            <span>角色管理</span>
                        </template>

                        <router-link to="/showLevel">
                            <el-menu-item index="2-3" id="ss">
                                查看角色
                            </el-menu-item>
                        </router-link>
                        <router-link to="/addLevel">
                            <el-menu-item index="2-2">
                                添加角色
                            </el-menu-item>
                        </router-link>

                    </el-submenu>


                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>权限设置</span>
                        </template>

                        <router-link to="/showRoot">
                            <el-menu-item index="3-3">
                                查看权限
                            </el-menu-item>
                        </router-link>
                        <router-link to="/addRot">
                            <el-menu-item index="3-2">
                                添加权限
                            </el-menu-item>
                        </router-link>

                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>部门管理</span>
                        </template>

                        <router-link to="/showPart">
                            <el-menu-item index="4-3">
                                查看部门
                            </el-menu-item>
                        </router-link>
                        <router-link to="/addPart">
                            <el-menu-item index="4-2">
                                添加部门
                            </el-menu-item>
                        </router-link>

                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>用户管理</span>
                        </template>

                        <router-link to="/showUser">
                            <el-menu-item index="5-3">
                                查看用户
                            </el-menu-item>
                        </router-link>
                        <router-link to="/addUser">
                            <el-menu-item index="5-2">
                                添加用户
                            </el-menu-item>
                        </router-link>

                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                header: '',
                aname: ''
            }
        },
        methods: {
            handleOpen(key, keyPath) {
//                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
//                console.log(key, keyPath);
            }
        },
        created() {
            this.aname = this.$store.state.aname;
            this.header = this.$store.state.header
        }
    }
</script>
<style>
    * {
    }

    .el-menu {
        width: 100%;
        height: 100%;
    }

    a {
        text-decoration: none;
    }

    .el-menu-item {
        border-bottom: 1px solid #fff;
        width: 200px;
    }

    .el-menu-item:last-of-type {
        border-bottom: 0
    }

    .el-submenu__title {

    }

    .el-submenu {
        border-top: 1px solid #fff;
    }

    .el-submenu:first-of-type {
        border: 0;
    }

    .el-submenu, .el-submenu__title {
        width: 200px;
        font-size: 15px;
        text-align: left;
    }

    .el-menu > .el-submenu > .el-menu-item {
        font-size: 13px;
        width: 200px;
    }

    .menu-user {
        padding: 20px;
        width: 200px;
        height: 150px;
        padding-bottom: 0;
        border-top: 1px solid #fff;
        left: 0;
        position: fixed;
        top: 60px;
        z-index: 99999;
        background: #393D49;
        border-bottom: 1px solid #fff;
    }

    .muser-img {
        width: 100px;
        height: 100px;
        margin-left: 30px;
    }

    .muser-img > img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .menu-user > span {
        color: #F5FFFF;
        font-size: 10px;
        line-height: 27px;
    }
</style>
