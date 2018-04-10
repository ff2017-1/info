<template>
  <div class="hello">
    <ul  id="box" >
      <li v-for="(item,index) in msg" @click="alert(index,item)" ref="mybox" >{{item}} </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: [1,2,3,4,5,6,7,8]
    }
  },
    methods:{
      alert(m,n){
          alert(n)    //加效果
          console.log(this.$refs.mybox[m].innerText)
          this.$refs.mybox[m].style.background = 'red'
      },
        init() {
//            const self = this;
//            this.$refs.mybox.style.background = 'red';
//            setTimeout(() => {
//                self.$refs.mybox.style.background = 'blue';
//            },2000)
        }
    },
    mounted () {
        this.init();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
