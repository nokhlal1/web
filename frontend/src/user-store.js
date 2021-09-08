import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn:false,
    token:'',
    currentComp:'Dashboard'
  },
  mutations: {
    User_Info(state, Info) {
      state.loggedIn = Info.status
      state.token=Info.token
    },
    setComp(state,comp){
      state.currentComp=comp
    }
    
  },
  actions: {
    
    setLoginStatus({ commit }, token) {
      commit('User_Info', {status:true,token})
    },
    logout({commit}){
      sessionStorage.removeItem("token");
      commit('User_Info', {status:false,token:''})
    },
    changeComp({commit},comp){
      commit('setComp', comp)
    }
  },
  getters: {
    getToken: state => {
      return state.token
    }
  }
})
