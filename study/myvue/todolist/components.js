Vue.component("custom-input",{
    props:["all"],
    template:`
    <input type="text" placeholder="请输入事项" v-model="val" @keyup.13="add(val)"  >
    `,
    data(){
        return {
            val:'',
        }
    },
    methods:{
        add(val){
            console.log(val)
            this.$emit("listenevt",val)
            this.val=''
        },

    },


})
Vue.component("custom-state",{
    props:["status"],
    template:`
    <ul class="state">
        <input type="submit" value="全部" @click="showlist('all')" :class="{check:status=='all'}">
        <input type="submit" value="已完成" @click="showlist('1')" :class="{check:status=='1'}">
        <input type="submit" value="未完成" @click="showlist('0')" :class="{check:status=='0'}">
    </ul>
    `,
    methods: {
        showlist(val) {
            this.$emit("listenevt1",val)
        }
    }
})
Vue.component("custom-list",{
    props:["datas","con","all"],
    template:`
     <ul class="list">

        <div>
            <li v-for="item in datas">
                <span class="opt"  @click="changeState(item)" :class="{red:item.state==1}"></span>
                <div v-if="item.edit" @dblclick="edit(item)">
                    <div>
                        {{item.title}}
                    </div>
                </div>
                <div v-else>
                    <input type="text"  v-model="item.title" @blur="edit(item)" >
                </div>
                <span class="del" @click="del(item.id)">删除</span>
            </li>
        </div>
        <div  v-show="all.length==0">没有数据</div>
    </ul>
    
    `,
    methods:{

        del(val){
            this.$emit("listenevt",val)
        },
        edit(val){
            this.$emit("listenevt1",val)
        },
        changeState(val){
            this.$emit("listenevt2",val)
        },


    },
})