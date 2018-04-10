<template>
    <div>
        <nav class="mui-bar mui-bar-tab">

            <router-link to="/index" tag="a" class="mui-tab-item" exact >
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/telPhone" tag="a" class="mui-tab-item">
                <span class="mui-icon mui-icon-phone"></span>
                <span class="mui-tab-label">电话</span>
            </router-link>
            <router-link to="/logs" tag="a" class="mui-tab-item">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">日志</span>
            </router-link>

            <router-link to="/setPerson" tag="a" class="mui-tab-item">

                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
    </div>

</template>
<script>
    export default {
        name: 'Nav',
        template: '<Nav></Nav>',
        data() {
            return {}
        },
    }
</script>
<style>
    .mui-bar-tab{
        position: fixed;
        bottom: 0;
        left:0;
    }
</style>