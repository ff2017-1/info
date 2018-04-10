<template>
    <div class="hello">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">联系方式</h1>
        </header>

        <div style="height:55px"></div>
        <div class="mui-input-row mui-search  mui-input-search" style=" position: relative">
            <input type="search" v-model="search" class="mui-input-clear " placeholder="" @focus="iconSearchFocus"
                   @blur="iconSearchBlur" @change="iconSearchChange">
            <span class="mui-icon mui-icon-search icon-search-z" ref="mui-icon-search" @focus="iconSearchFocus"
                  @blur="iconSearchBlur"></span>
        </div>


        <div class="mui-card">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="item in datas">
                    <a :href="'tel:'+item.uphone" :ref="item.pin" class="call">
                        <img :src="'http://localhost:8888/'+item.uphoto" alt="">
                        <span>{{item.uname}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="aside">
            <li class="lis" v-for="item in data" @click="scroll(item)">{{item}}</li>
        </div>
        <Nav></Nav>
        <div style="height: 55px;"></div>
    </div>

</template>

<script>
    import Nav from "./Nav.vue";

    export default {
        name: 'telPhone',
        data() {
            return {
                datas: [],
                data: [],
                search: '',
            }

        },
        components: {Nav},
        methods: {
            back() {
                this.$router.back()
            },
            scroll(pin) {
//                var s = 'pinLi' + pin
                window.scrollTo(0, this.$refs[pin][0].getBoundingClientRect().top - 44);
//                this.$refs[s][0].style.color = 'red'
                var lis = document.querySelectorAll('.lis')
                console.log(lis)
                for (var i = 0; i < lis.length; i++) {
                    if (lis[i].innerHTML == pin) {
                        lis[i].style.color = 'red'
                    } else {
                        lis[i].style.color = '#000'
                    }
                }
            },
            iconSearchFocus() {
                this.$refs['mui-icon-search'].style.left = -300 + 'px'

            },
            iconSearchBlur() {
                if (this.search == '') {
                    this.$refs['mui-icon-search'].style.left = '0'
                } else {
                    this.$refs['mui-icon-search'].style.left = -300 + 'px'

                }
            },
            iconSearchChange() {
                var str = 'str=' + this.search
                fetch('/ddhome/telSearchChange?' + str).then(function (e) {
                    return e.json()
                }).then((e) => {
                    console.log(e)
                    this.datas = e
                })
            }
        },
        mounted() {
            fetch('/ddhome/showUser').then(function (e) {
                return e.json()
            }).then((e) => {
                console.log(e)
                var e = e;
                for (var i = 0; i < e.length; i++) {
                    e[i].pin = pinyinUtil.getFirstLetter(e[i].uname).substr(0, 1)
                }
                this.datas = sortUser(e);
                this.data = sort(e);
                console.log(this.data)

                function sort(arr) {
                    var arr1 = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr1.includes(arr[i].pin) == false) {
                            arr1.push(arr[i].pin)
                        }
                    }
                    return arr1.sort();
                }

                function sortUser(arr) {
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = i + 1; j < arr.length; j++) {
                            if (arr[i].pin.charCodeAt(0) > arr[j].pin.charCodeAt(0)) {
                                var temp = arr[i];
                                arr[i] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                    return arr;
                }
            })
        }
    }
</script>

<style>
    * {
        list-style: none;
    }

    .mui-input-search > input {
        width: 90%;
    }

    div.aside {
        position: fixed;
        right: 0;
        top: 120px;
        width: 40px;
        height: auto;
    }

    div.aside > li {
        line-height: 20px;
        color: #000;
    }

    input[type='search'] {
        margin-bottom: 0;
    }

    .call > img {
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        float: left;
    }

    .call > span {
        width: 80%;
        float: left;
        padding: 0 10px;
        text-align: left;
        line-height: 35px;
    }

    .icon-search-z {
        display: block;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 5px;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>
