<template>

    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
        <el-breadcrumb-item v-for="item in table1" :to="{ path: '/' }" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

</template>
<script>
    export default {
        data() {
            return {
                table: [],
            }


        },
        created() {

//            let matched = this.$route.matched.filter(item => item.name)
//            const first = matched[0];
//            if (first && (first.name !== '首页' || first.path !== '')) {
//                matched = [{ name: '首页', path: '/index' }].concat(matched)
//            }
//            for (var i = 0; i < matched.length; i++) {
//                this.table.push(matched[i].name)
//            }

    },
        computed:{
            table1: function () {
                this.table=[];
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0];
                if (first && (first.name !== '首页' || first.path !== '')) {
                    matched = [{ name: '首页', path: '/index' }].concat(matched)
                }
                for (var i = 0; i < matched.length; i++) {
                    this.table.push(matched[i].name)
                }
                return this.table
            }
        }
    }
</script>
<style>

</style>


