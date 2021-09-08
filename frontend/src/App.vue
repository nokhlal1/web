<template>
  <div id="app">
    <NavBar/>
    <login v-if="!loggedIn" @login="loggedIn=true" msg="Welcome to Your Vue.js App"/>
    <component v-if="loggedIn" :is="currentComp"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import NavBar from './components/NavBar.vue'
import Website from './components/Website.vue'
import Dashboard from './components/Dashboard.vue'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    Login,NavBar,Website,Dashboard
  },
  created(){
    if(localStorage.getItem('token'))
    this.setLoginStatus(localStorage.getItem('token'))
  },
  computed:{
    ...mapState({
      loggedIn: state => state.loggedIn,
      currentComp:state=> state.currentComp
    })
  },
  methods:{
    ...mapActions(['setLoginStatus'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container{
    margin-top:50px;
}
.gradient-custom-2 {
  background: #fccb90;
  background: -webkit-linear-gradient(to right, #3824ee, #d8363a, #dd3675, #b44593);
  background: linear-gradient(to right, #3824ee, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}
@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
}
.btn{
  padding: 5px;
  min-width: 120px;
  border-radius: 1.5rem !important;
}
input{
  border-radius: 1rem !important;
}
</style>
