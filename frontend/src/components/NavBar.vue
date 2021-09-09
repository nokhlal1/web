<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Website Management</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" v-if="loggedIn">
        <a :class='{"nav-link":true,active:isDashboard}' @click="changeComp('Dashboard')">Dashboard</a>
      </li>
      <li class="nav-item " v-if="loggedIn">
        <a :class='{"nav-link":true,active:isWebsite}' @click="changeComp('Website')">Website <span class="sr-only">(current)</span></a>
      </li>      
    </ul>
    <div class="form-inline my-2 my-lg-0" v-if="loggedIn">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="logout">Logout</button>
    </div>
  </div>
</nav>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'NavBar',
  data(){
    return{
      loggedI:false
    }
  },
  computed:{
    ...mapState({
      loggedIn: state => state.loggedIn,
      currentComp:state=> state.currentComp
    }),
    isDashboard(){
      return this.currentComp=="Dashboard"?true:false
    },
    isWebsite(){
      return this.currentComp=="Website"?true:false
    }
  },
  methods:{
    ...mapActions(['logout','changeComp'])
  }
}
</script>
<style scoped>
.navbar {
    position: static;
}
a:hover{
  cursor: pointer;
}
.active{
  text-decoration: underline;
}
</style>