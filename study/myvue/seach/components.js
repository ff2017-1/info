Vue.component("custom-input",{
    props:["state","name"],
    template:`
     <div class="select-input">
            <input type="text" placeholder="请输入要查询字符" @focus="focus()" v-model="name" >
        </div>
    `,
    methods:{
        focus(){
            this.$emit("listenevt")
        }
    }
})
Vue.component("custom-list",{
    props:["state","listData"],
    template:`
      <ul class="select-list" v-show="state==true">
            <li v-for="item in listData" @click="click(item.name)"> {{item.name}}</li>
        </ul>
    `,
    methods:{
        click(val){
            this.$emit("listenevt",val)
        }
    }
})