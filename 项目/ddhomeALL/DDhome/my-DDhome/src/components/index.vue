<template>
  <div class="hello">

    <el-container>
      <el-header>
          <header1></header1>
      </el-header>
      <el-container>
          <el-aside width="200px" >
             <Menu></Menu>
          </el-aside>
        <el-container>
            <Breadcrumb></Breadcrumb>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>


  </div>
</template>

<script>
    import Menu from "./menu.vue"
    import Breadcrumb  from "./Breadcrumb.vue"
    import header1  from "./header.vue"
  export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',

    }
  },
      components:{Menu,Breadcrumb,header1},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-main{
        /*background: url("../assets/img/21312.jpg") no-repeat center/cover;*/
    }
    .el-container>.el-header {
    height:90vh;
    background-color: #23262F;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
    ::-webkit-scrollbar {
        width: 0;
    }
  .el-aside {
    background-color: #393D49;
    color: #333;
    text-align: center;
    line-height: 200px;
    height:100vh;
    overflow-x:visible;
    overflow: auto;
  }

    .el-breadcrumb{
        position: absolute;
        top:70px;
        left:210px;
        z-index: 999;
    }
  .el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
      overflow: hidden;
  }
.el-menu{

}
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
