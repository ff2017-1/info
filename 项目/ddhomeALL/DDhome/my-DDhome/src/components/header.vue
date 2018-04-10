<template>
    <div class="head">
        <div class="head-left">
            <span class="adminName">后台管理系统</span>

            <!--<div style="position: relative">-->
                <!--<el-input-->
                        <!--placeholder="请输入内容"-->
                        <!--v-model="input10"-->
                        <!--clearable-->
                        <!--class="input-group">-->
                <!--</el-input>-->
                <!--<i class="el-icon-search"></i>-->
            <!--</div>-->

            <div class="block">
                <el-date-picker
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1"
                class="input-date">
                </el-date-picker>
            </div>
        </div>
        <div class="head-right">
            <div class="set1" style="width:200px;"></div>
            <div class="set">
                <i class="el-icon-setting" ></i>
               <span @click="Display()">设置</span>
                <div class="block pickers" style="position: absolute;top: 60px;right: 220px; display: none;z-index: 9999">
                    <el-color-picker v-model="color1" @active-change="change"></el-color-picker>
                </div>
            </div>
            <div class="screen">
                <i class='el-icon-goods'></i>
                <span @click="outTo" class="adminName" >退出</span>
                <!--<span>锁屏</span>-->
            </div>
            <div class="user">
                <div class="user-img">
                    <img :src="'http://localhost:8888/'+header" alt="">
                </div>
                <div class="user-text">
                {{aname}}
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                aname:'',
                header:'',
                input10: '',
                color1: '#23262F',
                display:false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value2: '',
            }
        },
        methods:{
            change(){
                var color=document.querySelector('.el-color-svpanel').style.backgroundColor;
                document.querySelector('.el-header').style.backgroundColor=color;
            },
            outTo(){
                sessionStorage.removeItem('login');
                sessionStorage.removeItem('name');
                this.$router.push({ path: '/login' })
            },
            Display(){
                if(!this.display){
                    document.querySelector('.pickers').style.display='block';
                    this.display=true;
                }else{
                    document.querySelector('.pickers').style.display='none';
                    this.display=false;


//
                }

            }
        },
        mounted(){
            this.aname=this.$store.state.aname;
            this.header=this.$store.state.header;
            var myDate=new Date();
            var year=myDate.getFullYear();
            var Month=myDate.getMonth()+1;
            var date=myDate.getDate();
            this.value2=year+'-'+Month+'-'+date;
            document.querySelector('.el-color-svpanel').style.backgroundColor='#23262F'
        }
    }
</script>
<style>
    *{
        box-sizing: border-box;
    }
.head{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-between;
}
    .head-left{
        width:50%;
        height:100%;
        display: flex;
        justify-content: flex-start;

    }
    .adminName{
        width:180px;
        color: #fff;
        font-size:23px;
        text-align: center;
        line-height: 60px;
    }
    .input-group>input,.el-input__inner{
        height:35px;
    }
.input-group>input{
    width:230px;
}
.el-icon-search{
    color: #B4C4C4;
    font-size:20px;
    position: absolute;
    top:20px;
    left:200px;
}
.block{
    width:180px;
    margin-left: 50px;
}
.head-right{
    width:40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
    .el-icon-setting,.screen,.set>span,.screen>span{
        color: #B4C4C4;
        font-size:15px;
    }
.set>span,.screen>span{
    font-family: "Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
    .user{
        width:200px;
        height:100%;
        display: flex;
        justify-content: flex-end;
    }
    .user-img{
        width:40px;
        height:40px;
        border-radius: 50%;
        margin-top: 10px;
        margin-right: 15px;
    }
.user-img>img{
    display: block;
    width:100%;
    height:100%;
    border-radius: 50%;
}
    .user-text{
        color: #B4C4C4;
        font-size:15px;

    }
</style>

