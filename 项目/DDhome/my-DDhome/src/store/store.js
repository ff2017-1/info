import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        login:"",
        aid:"",
        RoleInfo:"",
        levelsInfo:""
    },
    mutations: {
        // setLogin (state,val) {
        //     state.login+=val
        // },
        setAname(state,val) {
            state.aname=val
        },
        setHeader(state,val) {
            state.header=val
        },
        setAid(state,val) {
            state.aid=val
        },
        setRid(state,val) {
            state.rid=val
        },
        setRoleInfo(state,val) {
            state.RoleInfo=val
        },
        setLevelsInfo(state,val) {
            state.levelsInfo=val
        },
        setAddShow(state,val) {
            state.isAddShow=val
        },
        setDelShow(state,val) {
            state.isDelShow=val
        },
        setEditShow(state,val) {
            state.isEditShow=val
        },
        setQueryShow(state,val) {
            state.isQueryShow=val
        },

    },
    actions: {
        setLogin (context) {
            context.commit('setLogin')
        }
    }
});
export default store;


