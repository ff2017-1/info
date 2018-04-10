<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">个人中心</h1>
        </header>
        <div class="mui-table-view-cell1"></div>
        <div class="mui-card-header  mui-card-media">
            <img :src="'../../../'+uphoto" class="user-img-header">
            <div class="mui-media-body">
                <span>姓名:{{uname}}</span>
                <p>部门:{{part}}</p>
                <p>电话:{{uphone}}</p>
            </div>
        </div>

        <div class="mui-button-row">
            <button type="button" class="mui-btn mui-btn-primary aas" @click="outTo"><router-link to="/">退出登录</router-link></button>
            <button type="button" class="mui-btn mui-btn-danger  "><router-link to="/updataPass">修改密码</router-link></button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'set',
        data() {
            return {
                datas: [],
                uname:'',
                uphone:'',
                uphoto:'',
                part:''
            }
        },
        methods: {
            back() {
                this.$router.push('/index')
            },
            outTo(){
                this.$router.push('/')

            }
        },
        mounted() {
            this.uname = this.$store.state.uname;
            this.uphone = this.$store.state.uphone;
            this.uphoto = this.$store.state.uphoto;
            this.uid = this.$store.state.uid;
            var str='uid='+this.uid
            fetch('/ddhome/personPart?'+str).then(function (e) {
                return e.json()
            }).then((e) => {
               this.part=e[0].pname
            })
        }
    }
</script>
<style  scope>
    .user-img-header{
        width:100px;
        height:100px;
    }
    .aas{
        width:82px;
        height:33px;
        margin-right: 5px;
    }
</style>
<style>
    .mui-table-view {
        margin-top: 30px;
    }

    .mui-table-view-cell1 {
        height: 70px;
    }

    .mui-card-header {
        height: 120px;
    }

    .mui-card-header > img:first-child {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .mui-card-header.mui-card-media .mui-media-body {
        margin-top: 20px;
        margin-left: 130px;
    }

    .mui-card-header.mui-card-media .mui-media-body > span, .mui-card-header.mui-card-media .mui-media-body > p {
        display: block;
        width: 100%;
        font-size: 18px;
        line-height: 22px;
        text-align: left;
    }

    .mui-button-row {
        margin-top: 10px;
    }
</style>