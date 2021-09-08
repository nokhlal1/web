<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-5">
        <div class="card rounded-4 text-black">
              <div class="card-body p-md-3 mx-md-4">  
                <form>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example11" :class="{'form-control':true, 'is-invalid':!userName & error}" placeholder="Username" v-model="userName"/>
                    
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example22" :class="{'form-control':true, 'is-invalid':!password & error}" placeholder="password" v-model="password"/>
                    
                  </div>
                  <div v-if="error" class="alert alert-danger" role="alert">
                     Username/password Incorrect.
                  </div>
                  <div class="text-center pt-1 mb-4 pb-1">
                    <button class="btn btn-primary btn fa-lg gradient-custom-2 mb-3" type="button" @click="login" :disabled="!password || !userName">Log in</button>
                    
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-1">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button type="button" class="btn btn-outline-danger" @click="showSignup=true">Create new</button>
                  </div>

                </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Signup @close="showSignup=false" v-if="showSignup"/>
</section>
    
  
</template>

<script>
import { mapActions } from 'vuex'
import {apiService} from '../service' 
import Signup from './Signup.vue'
export default {
  name: 'Login',
  components:{Signup},
  data(){
    return {
      showSignup:false,
      userName:'',
      password:'',
      error:false
      }
  },
  methods: {
      ...mapActions([
      'setLoginStatus'
    ]),
      login(event) {
        event.preventDefault()
        let data={
          user:this.userName,
          password:this.password
        }
        console.log(data)
        let callBack=(response)=>{
          console.log(response)
          this.setLoginStatus(response.data.token)
          localStorage.setItem("token", response.data.token);
        }
        const err = error => {console.log(error)
                this.error = true
                this.errorMessage = error.message
            }
        apiService("post",'/login',callBack,data,err)
      },
      
    }
}
</script>
<style scoped>
.text-danger{
  font: 0.8em sans-serif;
}
</style>

