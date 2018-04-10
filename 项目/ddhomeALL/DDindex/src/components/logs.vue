<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">日志</h1>
            <router-link to="/wirte" tag="a" class="mui-action-back mui-icon mui-icon-compose" style="float: right">

            </router-link>

        </header>
        <div style="height:50px"></div>
<!--查看日志，你给别人写的，别人给你写的  写日志  谁 部门   给谁发不能给谁发-->
        <router-link to="/index"  class="mui-btn mui-btn-primary mui-btn-outlined" >
            返回首页</router-link>
        <router-view>

        </router-view>

        <nav class="mui-bar mui-bar-tab">
            <router-link to="/logs" tag="a" class="mui-tab-item " >
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">已发送</span>
            </router-link>
            <router-link to="/logAccept" tag="a" class="mui-tab-item">
                <span class="mui-icon mui-icon-phone"></span>
                <span class="mui-tab-label">已接受</span>
            </router-link>
        </nav>
        <div style="height: 55px;"></div>

    </div>
</template>

<script>
    export default {
        name: 'telPhone',
        data() {
            return {

            }
        },
        methods: {
            back() {
                this.$router.back()
            }
        },
    }
</script>

<style>
.mui-media-body,.mui-card-content{
    text-align: left;
}
    .mui-card-content{
      padding: 5px;
    }
    h3{
        font-size: 20px;
    }
</style>
