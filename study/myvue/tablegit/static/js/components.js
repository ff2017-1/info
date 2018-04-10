"use strict";

Vue.component("Wait", {
    template: "\n    <div class=\"wait\"></div>\n    "
});
Vue.component("Info", {
    props: ['message'],
    template: "\n    <div class=\"info\">{{message}}</div>\n    ",
    data: function data() {
        return {};
    }
});
var Head = Vue.component("Head", {
    template: "\n    <div>\n       <h1 style='width: 800px;background: #CCC;margin:auto;'>\n            \u589E\u5220\u6539\u67E5\u8868 [\n            <router-link to=\"/\" exact tag=\"div\" class=\"link\" event=\"click\"  active-class=\"aa\">\u9996\u9875</router-link>\n            <router-link to=\"/add\" tag=\"div\" class=\"link\" event=\"click\" active-class=\"bb\">\u6DFB\u52A0</router-link>\n            <div @click=\"outTo\" style=\" cursor: pointer;\">\u9000\u51FA</div>\n            ]\n        </h1>\n        <router-view>\n        \n        </router-view>\n</div>\n\n",
    methods: {
        outTo: function outTo() {
            sessionStorage.removeItem('login');
            router.push({ path: '/login' });
        }
    }
});
var loginHead = Vue.component("loginHead", {
    template: "\n<div>\n       <h1  style=\"width:100%;font-size:25px\">\n            \u589E\u5220\u6539\u67E5\u8868 [\n            <router-link to=\"/login\" exact tag=\"div\" class=\"link\" event=\"click\"  active-class=\"aa\">\u767B\u5F55\u9875</router-link>\n            <router-link to=\"/Reg\" tag=\"div\" class=\"link\" event=\"click\" active-class=\"bb\">\u6CE8\u518C\u9875</router-link>\n            ]\n        </h1>\n        <router-view>\n        \n        </router-view>\n</div>\n\n"
});
var Login = Vue.component("Login", {

    template: "\n          <div>\n           <form class=\"form-data\">\n          <loginHead></loginHead>\n              <div class=\"form-group\">\n                <label for=\"uname\">\u7528\u6237\u540D</label>\n                <input type=\"text\" class=\"form-control\" id=\"uname\" placeholder=\"uname\" name=\"uname\" v-model=\"uname\">\n              </div>\n               <div class=\"form-group\">\n                    <label for=\"pass\">\u5BC6\u7801</label>\n                    <input type=\"password\" class=\"form-control\" id=\"pass\" placeholder=\"pass\" name=\"pass\" v-model=\"pass\">\n               </div>\n              <button type=\"button\" class=\"btn btn-default\" @click=\"login\">\u767B\u5F55</button>\n           </form>\n             <Wait v-show=\"show\"></Wait>\n            <Info v-show=\"infoShow\"  :message=\"message\"></Info>\n           </div>\n    ",
    data: function data() {
        return {
            uname: '',
            pass: '',
            show: false,
            infoShow: false,
            message: ''
        };
    },

    methods: {
        login: function login() {
            var _this = this;

            if (this.uname == '' || this.pass == '') {
                this.message = '密码或账号不为空';
                this.infoShow = true;
                return;
            }
            var str = 'uname=' + this.uname + '&pass=' + this.pass;
            fetch("/loginCon?" + str).then(function (e) {
                // console.log(e)
                sessionStorage.login = 'yes';
                return e.text();
            }).then(function (e) {
                // console.log(e)
                if (e == 'ok') {
                    _this.message = '登陆成功';
                    _this.show = false;
                    _this.infoShow = true;
                    router.push({ path: '/' });
                } else if (e == '0') {
                    // alert(2)
                    _this.message = '没有此用户名';
                    _this.infoShow = true;
                } else if (e == '1') {
                    // alert(3)
                    _this.message = '密码错误';
                    _this.infoShow = true;
                }
            });
        }
    }
});
// 注册
var Reg = Vue.component("Reg", {

    template: "\n          <div style=\"position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto \">\n           <form class=\"form-data\">\n           <loginHead></loginHead>\n           {{mess}}\n              <div class=\"form-group\">\n                <label for=\"uname\">\u7528\u6237\u540D</label>\n                <input type=\"text\" class=\"form-control\" id=\"uname\" placeholder=\"\u8BF7\u8F93\u5165\u7528\u6237\u540D\" name=\"uname\" v-model=\"uname\" @blur=\"name\">\n              </div>\n               <div class=\"form-group\">\n                    <label for=\"pass\">\u5BC6\u7801</label>\n                    <input type=\"password\" class=\"form-control\" id=\"pass\" placeholder=\"\u8BF7\u8F93\u5165\u5BC6\u7801\" name=\"pass\" v-model=\"pass\" @blur=\"pass2\">\n               </div>\n               <div class=\"form-group\">\n                    <label for=\"pass1\">\u786E\u8BA4\u5BC6\u7801</label>\n                    <input type=\"password\" class=\"form-control\" id=\"pass1\" placeholder=\"\u786E\u8BA4\u5BC6\u7801\" name=\"pass1\" v-model=\"pass1\" @blur=\"pass3\">\n               </div>\n              <button type=\"button\" class=\"btn btn-default\" @click=\"reg\">\u6CE8\u518C</button>\n           </form>\n             <Wait v-show=\"show\"></Wait>\n            <Info v-show=\"infoShow\"  :message=\"message\"></Info>\n           </div>\n    ",
    data: function data() {
        return {
            uname: '',
            pass: '',
            pass1: '',
            show: false,
            infoShow: false,
            message: '注册成功',
            mess: ''
        };
    },

    methods: {
        reg: function reg() {
            var _this2 = this;

            // this.infoShow=true;
            var str = 'uname=' + this.uname + '&pass=' + this.pass;
            fetch("/regCon?" + str).then(function (e) {
                return e.text();
            }).then(function (e) {
                // console.log(e)
                if (e == 'ok') {
                    // this.show=false;
                    _this2.message = '注册成功';
                    _this2.infoShow = true;
                    _this2.uname = '';
                    _this2.pass = '';
                    _this2.pass1 = '';
                } else {
                    // this.infoShow=true;
                    _this2.message = '注册失败';
                    _this2.uname = '';
                    _this2.pass = '';
                    _this2.pass1 = '';
                }
            });
        },
        name: function name() {
            var aa = this.uname.length;

            if (this.uname == '') {
                this.mess = '用户名不能为空';
                return;
            } else if (aa > 10) {
                this.mess = '用户名应该是5位到10位数';
                return;
            }
        },
        pass2: function pass2() {
            var aa = this.pass.length;

            if (this.pass == '') {
                this.mess = '密码不能为空';
                return;
            } else if (aa >= 10 || aa < 3) {
                this.mess = '密码应该是3位到10位数';
                return;
            }
        },
        pass3: function pass3() {
            var aa1 = this.pass1.length;
            if (this.pass1 == '') {
                this.mess = '确认密码不能为空';
                return;
            } else if (aa1 > 10 || aa1 < 3) {
                this.mess = '密码应该是3位到10位数';
                return;
            }
            if (this.pass != this.pass1) {
                this.mess = '俩次密码不一致';
                return;
            }
        }
    }
});
Vue.component("Table", {
    props: ['header'],
    template: "\n        <div>\n        \n           <table>\n               <tr>\n                   <th v-for=\"item in header\">{{item}}</th>\n                   \n                </tr>\n                <tr v-for=\"item in datas\">\n                    <td>{{item.name}}</td>\n                    <td>{{item.age}}</td>\n                    <td>{{item.sex}}</td>\n                    \n                    <td>\n                       <button @click=\"del(item.id)\">\u5220\u9664</button>\n                       <a :href=\"'#/updatas/'+item.id\">\u4FEE\u6539</a>\n                   </td>\n                </tr>\n            </table>\n            <Wait v-show=\"show\"></Wait>\n            <Info v-show=\"infoShow\"  :message=\"message\"></Info>\n        </div>\n    ",

    data: function data() {
        return {
            datas: [],
            show: true,
            infoShow: false,
            message: '删除成功'
        };
    },

    methods: {
        del: function del(id) {
            var _this3 = this;

            this.show = true;
            fetch("/del/" + id).then(function (e) {
                return e.text();
            }).then(function (e) {
                if (e == 'ok') {
                    _this3.show = false;
                    _this3.message = '删除成功';
                    _this3.infoShow = true;
                    _this3.datas = _this3.datas.filter(function (ele) {
                        return ele.id != id;
                    });
                } else {
                    _this3.show = false;
                    _this3.message = '删除失败';
                    _this3.infoShow = true;
                }
            });
        }
    },
    mounted: function mounted() {
        var _this4 = this;

        fetch('/fetch').then(function (e) {
            return e.json();
        }).then(function (e) {
            // console.log(e);
            _this4.show = false;
            _this4.datas = e;
        });
    }
});
var Index = {
    template: "\n        <Table :header=\"['\u540D\u5B57','\u5E74\u9F84','\u6027\u522B','\u64CD\u4F5C']\"></Table>\n    "
};
var Add = Vue.component("Add", {
    template: "\n<div>\n  <form>\n          <div class=\"form-group\">\n            <label for=\"name\">\u540D\u5B57</label>\n            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"name\" name=\"name\" v-model=\"name\">\n          </div>\n           <div class=\"form-group\">\n                <label for=\"age\">\u5E74\u9F84</label>\n                <input type=\"text\" class=\"form-control\" id=\"age\" placeholder=\"age\" name=\"age\" v-model=\"age\">\n           </div>\n           <div class=\"form-group\">\n                <label for=\"sex\">\u6027\u522B</label>\n                <input type=\"text\" class=\"form-control\" id=\"sex\" placeholder=\"sex\" name=\"sex\" v-model=\"sex\">\n           </div>\n         \n          <button type=\"button\" class=\"btn btn-default\"  @click=\"add()\">\u6DFB\u52A0</button>\n    </form>\n     <Wait class=\"wait\" v-show=\"show\"></Wait>\n     <Info v-show=\"infoShow\" :message=\"message\"></Info>\n           \n\n</div>\n    \n    \n    ",

    data: function data() {
        return {
            name: '',
            age: '',
            sex: '',
            show: true,
            infoShow: false,
            message: ''
        };
    },

    methods: {
        add: function add() {
            var _this5 = this;

            this.show = true;
            var str = 'name=' + this.name + '&age=' + this.age + '&sex=' + this.sex;
            fetch("/addCon?" + str).then(function (e) {
                return e.text();
            }).then(function (e) {
                if (e == 'ok') {
                    _this5.message = '添加成功';
                    _this5.show = false;
                    _this5.infoShow = true;
                    _this5.name = "";
                    _this5.age = "";
                    _this5.sex = "";
                } else {
                    _this5.message = '添加失败';
                    _this5.show = false;
                    _this5.infoShow = true;
                }
            }).then(function () {
                // router.push({ path: '/index' })
            });
        }
    },
    mounted: function mounted() {
        this.show = false;
    }
});

var updatas = Vue.component('upp', {
    template: "\n<div>\n  <form>\n  <div class=\"form-group\">\n    <label for=\"name\">\u59D3\u540D</label>\n    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"\u59D3\u540D\" v-model=\"name\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"age\">\u5E74\u9F84</label>\n    <input type=\"text\" class=\"form-control\" id=\"age\" placeholder=\"\u5E74\u9F84\" v-model=\"age\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"sex\">\u6027\u522B</label>\n    <input type=\"text\" class=\"form-control\" id=\"sex\" placeholder=\"\u6027\u522B\" v-model=\"sex\">\n  </div>\n  <button type=\"button\" class=\"btn btn-default\" @click=\"submit()\">\u4FEE\u6539</button>\n</form>\n <Wait class=\"wait\" v-show=\"show\"></Wait>\n     <Info v-show=\"infoShow\" :message=\"message\"></Info>\n</div>\n    ",
    data: function data() {
        return {
            name: '',
            age: '',
            sex: '',
            show: true,
            infoShow: false,
            message: '修改成功'
        };
    },

    methods: {
        submit: function submit() {
            var _this6 = this;
            this.show = true;
            var str = "name=" + this.name + "&age=" + this.age + "&sex=" + this.sex + "&id=" + this.$route.params.id;
            // console.log(str)
            fetch("/updas?" + str).then(function (e) {
                return e.json();
            }).then(function (e) {
                if (e == "ok") {
                    _this6.message = '修改成功';
                    _this6.show = false;
                    _this6.infoShow = true;
                } else {
                    _this6.message = '修改失败';
                    _this6.show = false;
                    _this6.infoShow = true;
                }
            });
        }
    },
    mounted: function mounted() {
        var _this7 = this;
        fetch("/up/" + this.$route.params.id).then(function (e) {
            return e.json();
        }).then(function (e) {
            _this7.show = false;
            _this7.name = e[0].name;
            _this7.age = e[0].age;
            _this7.sex = e[0].sex;
        });
    }
});