
var Main = Vue.component('Main', {
    template: `
        <div>
         <Nav></Nav>
        
        <div class="body">
         <div class="left">
            <router-view name="left"></router-view>
        </div>
        <div class="right">
             <router-view name="right"></router-view>
        </div>
        </div>
       
    </div>
    `
})
var Nav=Vue.component('Nav',{
    template:`
    <div>
    <nav>
        <router-link :to="{ path: '/' }" tag="div" exact active-class="aa">主页</router-link>
        <router-link :to="{ path: 'fast' }" tag="div" active-class="aa">快速上手</router-link>
        

    </nav>
</div>
    `
})
var Fast=Vue.component('Fast',{
    template:`
 
    <div>
    <Nav></Nav>
    <div style="position: absolute;top: 60px;width:100%;border: 1px solid red;padding: 10px"><span>快速上手</span><br>
    <span>快速上手</span><br>
    <span>快速上手</span><br>
    <span>快速上手</span><br>
    <span>快速上手</span><br>
    <span>快速上手</span><br>
    <span>快速上手</span><br>
    <span>快速上手</span><br><span>快速上手</span><br>
    
    
    </div></div>
    `
})

var Left=Vue.component('Left',{
    template:`

        <div>
           <ul v-for="item in child">
                <li style="font-size: 20px">
                <router-link :to="{path:'/#'+item.id}"  tag="div" exact active-class="aa">{{item.title}}</router-link></li>  
                <ul>
                <li v-for="item1 in item.child">
               <router-link :to="{path:'/#'+item1.id}" tag="div" exact active-class="aa" class="bb">{{item1.title}}</router-link></li>
                </ul> 
            </ul>
        </div>
    
    `,
    data(){
        return {
            data1:""
        }
    },
    mounted(){
        fetch('./demo.txt').then(function (e) {
            // console.log(e)
            return e.json()
        }).then((e)=>{
            this.data1=e
            // console.log(this.data1)
        })
    },
    computed:{
        child(){
            var arr =[];
            console.log(this.data1)
            for(var i in this.data1){
                if(this.data1[i].pid == 0){
                    var obj=this.data1[i]
                    arr.push(obj)
                }else{
                    for(var j in arr){

                        if(this.data1[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.data1[i])
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.data1[i])
                            }
                        }

                    }

                }
            }
            console.log(arr)
            return arr;
        }
    },
    watch:{
        $route(){
        var num=this.$route.hash.slice(1);
        var pos=document.querySelector('.a'+num).offsetTop;
            var vm = this
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
// console.log(document.querySelector('.right').scrollTop)
            new TWEEN.Tween({ number: document.querySelector('.right').scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.number.toFixed(0)
                })
                .start()

            animate()
        }
        }




})
var Right=Vue.component('Right',{
    template:`
   
         <div class="markdown-body">
         <div class="a1">
         <h2>全局配置</h2>
           
        </div>
            
        <div class="a2">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性： </code></p>
         <h2>devtool</h2> <pre><code class="lang-">hello[^hello] </code></pre> <p>见底部脚注 </p>
        </div>
       <div class="a3">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性： </code></p>
         <h2> errorHandler</h2> <pre><code class="lang-">hello[^hello] </code></pre>  <p>见底部脚注 </p> 
        </div>
         <div class="a4">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性： </code></p>
         <h2>API</h2> <pre><code class="lang-">hello[^hello] </code></pre>  <p>见底部脚注 </p>
        </div>
         <div class="a5">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性： <p>\` 代码块 \`</p> <pre><div class="hljs"><code class="lang-c++"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{ <span class="hljs-built_in">printf</span>(<span class="hljs-string">"hello world!"</span>); } </code></div></pre> <p><code>code</code></p></code></p>
         <h2> component</h2> <pre><code class="lang-">hello[^hello] </code></pre>  <p>见底部脚注 </p>
        </div>
         <div class="a6">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性： </code></p>
         <h2>filter</h2> <pre><code class="lang-">hello[^hello] </code></pre> <p>见底部脚注 <p>见底部脚注 </p>
        </div>
         <div class="a7">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性：<p>\` 代码块 \`</p> <pre><div class="hljs"><code class="lang-c++"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{ <span class="hljs-built_in">printf</span>(<span class="hljs-string">"hello world!"</span>); } </code></div></pre> <p><code>code</code></p> </code></p>
         <h2>option</h2> <pre><code class="lang-">hello[^hello] </code></pre> <p>见底部脚注 </p>
        </div> 
        <div class="a8">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性： </code></p>
         <h2>  data</h2> <pre><code class="lang-">hello[^hello] </code></pre> <p>见底部脚注 </p>
        </div>
        <div class="a9">
        <p><code class="lang-"> <mark>Vue.config</mark>是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性：<p>\` 代码块 \`</p> <pre><div class="hljs"><code class="lang-c++"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{ <span class="hljs-built_in">printf</span>(<span class="hljs-string">"hello world!"</span>); } </code></div></pre> <p><code>code</code></p> </code></p>
         <h2> methods</h2> <pre><code class="lang-">hello[^hello] </code></pre> <p>见底部脚注 </p> 
        </div>
        
        </div>
    `,

})