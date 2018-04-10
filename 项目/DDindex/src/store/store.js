import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        pid:"",
        uid:'',
        uname:'',
        uphone:'',
        uphoto:''
    },
    mutations: {
        setPid(state,val) {
            state.pid=val
        },
        setUid(state,val) {
            state.uid=val
        },
        setUname(state,val) {
            state.uname=val
        },
        setUphone(state,val) {
            state.uphone=val
        },
        setUphoto(state,val) {
            state.uphoto=val
        },
        setUpass(state,val) {
            state.upass=val
        },
        setTitle(state,val) {
            state.title=val
        },
        setContent(state,val) {
            state.content=val
        },




    },
});
export default store;


