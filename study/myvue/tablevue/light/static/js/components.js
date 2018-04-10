Vue.component("Wait",{
    template:`
    <div class="wait"></div>
    `
})
Vue.component("Info",{
    props:['message'],
    template:`
    <div class="info">{{message}}</div>
    `,
    data(){
        return {

        }
    }
})
const Head=Vue.component("Head",{
    template:`
    <div>
       <h1>
            增删改查表 [
            <router-link to="/" exact tag="div" class="link" event="click"  active-class="aa">首页</router-link>
            <router-link to="/add" tag="div" class="link" event="click" active-class="bb">添加</router-link>
            <div @click="outTo" style=" cursor: pointer;">退出</div>
            ]
        </h1>
        <router-view>
        
        </router-view>
</div>

`,
    methods:{
        outTo(){
           sessionStorage.removeItem('login');
            router.push({ path: '/login' })
        }
    }
})
const loginHead=Vue.component("loginHead",{
template:`
<div>
       <h1  style="width:100%;font-size:25px">
            增删改查表 [
            <router-link to="/login" exact tag="div" class="link" event="click"  active-class="aa">登录页</router-link>
            <router-link to="/Reg" tag="div" class="link" event="click" active-class="bb">注册页</router-link>
            ]
        </h1>
        <router-view>
        
        </router-view>
</div>

`
})
const Login=Vue.component("Login",{

    template:`
          <div>
           <form class="form-data">
          <loginHead></loginHead>
              <div class="form-group">
                <label for="uname">用户名</label>
                <input type="text" class="form-control" id="uname" placeholder="uname" name="uname" v-model="uname">
              </div>
               <div class="form-group">
                    <label for="pass">密码</label>
                    <input type="password" class="form-control" id="pass" placeholder="pass" name="pass" v-model="pass">
               </div>
              <button type="button" class="btn btn-default" @click="login">登录</button>
           </form>
             <Wait v-show="show"></Wait>
            <Info v-show="infoShow"  :message="message"></Info>
           </div>
    `,
    data(){
        return {
            uname:'',
            pass:'',
            show:false,
            infoShow:false,
            message:''
        }
    },
    methods:{
        login(){
                if(this.uname==''||this.pass==''){
                    this.message='密码或账号不为空';
                    this.infoShow=true;
                    return
                }
                var str = 'uname=' + this.uname + '&pass=' + this.pass;
                fetch("/loginCon?" + str).then(function (e) {
                    // console.log(e)
                    sessionStorage.login='yes';
                    return e.text();
                }).then( (e)=> {
                    // console.log(e)
                    if (e == 'ok') {
                        this.message='登陆成功';
                        this.show=false;
                        this.infoShow=true;
                        router.push({ path: '/' })
                    } else if(e=='0'){
                        // alert(2)
                        this.message='没有此用户名'
                        this.infoShow=true;

                    }
                    else if(e=='1'){
                        // alert(3)
                        this.message='密码错误'
                        this.infoShow=true;

                    }
                })
            }
        },
})
// 注册
const Reg=Vue.component("Reg",{

    template:`
          <div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto ">
           <form class="form-data">
           <loginHead></loginHead>
           {{mess}}
              <div class="form-group">
                <label for="uname">用户名</label>
                <input type="text" class="form-control" id="uname" placeholder="请输入用户名" name="uname" v-model="uname" @blur="name">
              </div>
               <div class="form-group">
                    <label for="pass">密码</label>
                    <input type="password" class="form-control" id="pass" placeholder="请输入密码" name="pass" v-model="pass" @blur="pass2">
               </div>
               <div class="form-group">
                    <label for="pass1">确认密码</label>
                    <input type="password" class="form-control" id="pass1" placeholder="确认密码" name="pass1" v-model="pass1" @blur="pass3">
               </div>
              <button type="button" class="btn btn-default" @click="reg">注册</button>
           </form>
             <Wait v-show="show"></Wait>
            <Info v-show="infoShow"  :message="message"></Info>
           </div>
    `,
    data(){
        return {
            uname:'',
            pass:'',
            pass1:'',
            show:false,
            infoShow:false,
            message:'注册成功',
            mess:''
        }
    },
    methods:{
        reg(){
            // this.infoShow=true;
            var str = 'uname=' + this.uname + '&pass=' + this.pass;
            fetch("/regCon?" + str).then(function (e) {
                return e.text();
            }).then( (e)=> {
                // console.log(e)
                if (e == 'ok') {
                    // this.show=false;
                    this.message='注册成功';
                    this.infoShow=true;
                    this.uname='';
                    this.pass='';
                    this.pass1=''
                }else{
                    // this.infoShow=true;
                    this.message='注册失败';
                    this.uname='';
                    this.pass='';
                    this.pass1=''
                }
            })
        },
        name(){
            var aa=this.uname.length;

             if(this.uname==''){
                 this.mess='用户名不能为空'
                 return
             }else if(aa>10){
                 this.mess='用户名应该是5位到10位数'
                 return
             }
        },
         pass2(){
            var aa=this.pass.length;

            if(this.pass==''){
                this.mess='密码不能为空';
                return
            }else if(aa>=10||aa<3){
                this.mess='密码应该是3位到10位数';
                return
            }
        },
        pass3(){
            var aa1=this.pass1.length;
            if(this.pass1==''){
                this.mess='确认密码不能为空';
                return
            }else if(aa1>10||aa1<3){
                this.mess='密码应该是3位到10位数'
                return
            }
            if(this.pass!=this.pass1){
                this.mess='俩次密码不一致';
                return
            }
        }

   },

})
Vue.component("Table", {
    props:['header'],
    template: `
        <div>
        
           <table>
               <tr>
                   <th v-for="item in header">{{item}}</th>
                   
                </tr>
                <tr v-for="item in datas">
                    <td>{{item.name}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.sex}}</td>
                    
                    <td>
                       <button @click="del(item.id)">删除</button>
                       <a :href="'#/updatas/'+item.id">修改</a>
                   </td>
                </tr>
            </table>
            <Wait v-show="show"></Wait>
            <Info v-show="infoShow"  :message="message"></Info>
        </div>
    `,

    data() {
        return {
            datas: [],
            show:true,
            infoShow:false,
            message:'删除成功'
        }
    },
    methods: {

        del(id) {
            this.show=true;
            fetch("/del/" + id).then(function (e) {
                return e.text();
            }).then((e) => {
                if (e == 'ok') {
                    this.show=false;
                    this.message='删除成功'
                    this.infoShow=true;

                    this.datas = this.datas.filter(ele => {
                        return ele.id != id
                    })
                } else {
                    this.show=false;
                    this.message='删除失败'
                    this.infoShow=true;
                }
            })
        },

},
mounted()
{

    fetch('/fetch').then(function (e) {

        return e.json()
    }).then((e) => {
        console.log(e)
        this.show=false;
        this.datas = e;

    })

}

})
const Index = {
    template: `
        <Table :header="['名字','年龄','性别','操作']"></Table>
    `,
}
const Add = Vue.component("Add", {
    template: `
<div>
  <form>
          <div class="form-group">
            <label for="name">名字</label>
            <input type="text" class="form-control" id="name" placeholder="name" name="name" v-model="name">
          </div>
           <div class="form-group">
                <label for="age">年龄</label>
                <input type="text" class="form-control" id="age" placeholder="age" name="age" v-model="age">
           </div>
           <div class="form-group">
                <label for="sex">性别</label>
                <input type="text" class="form-control" id="sex" placeholder="sex" name="sex" v-model="sex">
           </div>
         
          <button type="button" class="btn btn-default"  @click="add()">添加</button>
    </form>
     <Wait class="wait" v-show="show"></Wait>
     <Info v-show="infoShow" :message="message"></Info>
           

</div>
    
    
    `,

    data() {
        return {
            name: '',
            age: '',
            sex: '',
            show:true,
            infoShow:false,
            message:''
        }

    },
    methods: {
        add() {
            this.show=true;
            var str = 'name=' + this.name + '&age=' + this.age + '&sex=' + this.sex;
            fetch("/addCon?" + str).then(function (e) {
                return e.text();
            }).then( (e)=> {
                if (e == 'ok') {
                    this.message='添加成功'
                    this.show=false;
                    this.infoShow=true;
                    this.name="";
                    this.age="";
                    this.sex="";


                } else {
                    this.message='添加失败'
                    this.show=false;
                    this.infoShow=true;
                }
            }).then(function () {
                // router.push({ path: '/index' })
            })
        }
    },
    mounted(){
        this.show=false;
    }

})


const updatas=Vue.component('upp',{
    template:`
<div>
  <form>
  <div class="form-group">
    <label for="name">姓名</label>
    <input type="text" class="form-control" id="name" placeholder="姓名" v-model="name">
  </div>
  <div class="form-group">
    <label for="age">年龄</label>
    <input type="text" class="form-control" id="age" placeholder="年龄" v-model="age">
  </div>
  <div class="form-group">
    <label for="sex">性别</label>
    <input type="text" class="form-control" id="sex" placeholder="性别" v-model="sex">
  </div>
  <button type="button" class="btn btn-default" @click="submit()">修改</button>
</form>
 <Wait class="wait" v-show="show"></Wait>
     <Info v-show="infoShow" :message="message"></Info>
</div>
    `,
    data(){
        return {
            name:'',
            age:'',
            sex:'',
            show:true,
            infoShow:false,
            message:'修改成功'
        }
    },
    methods:{
        submit(){
            this.show=true;
            var str="name="+this.name+"&age="+this.age+"&sex="+this.sex+"&id="+this.$route.params.id;
            // console.log(str)
            fetch("/updas?"+str).then(function (e) {

                return e.text();
            }).then((e)=> {
                if(e=="ok") {
                    this.message='修改成功'
                    this.show=false;
                    this.infoShow=true;

                }else{
                    this.message='修改失败'
                    this.show=false;
                    this.infoShow=true;
                }
            })
        }
    },
    mounted() {
        fetch("/up/"+this.$route.params.id).then(function (e) {
            return e.json();
        }).then((e) => {
            this.show=false;
            this.name = e[0].name;
            this.age = e[0].age;
            this.sex = e[0].sex;
        })
    }

})