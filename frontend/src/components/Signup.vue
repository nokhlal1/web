<template>
<div>
  <div class="modal-backdrop"></div>
    <div class="modal show  " id="exampleModalLong" tabindex="4" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Create User</h5>
                <button type="button" class="close" data-dismiss="modal" @click="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="needs-validation" novalidate>

                  <div class="form-outline mb-4">
                    <input type="text" id="form2Example11" :class="{'form-control':true, 'is-invalid':!user & error}" v-model="user" placeholder="Username" required/>
                    <div class="invalid-feedback">
                      Please enter Username.
                    </div> 
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example22" :class="{'form-control':true, 'is-invalid':!pass1 & error}" v-model="pass1" placeholder="password" required/>
                    <div class="invalid-feedback">
                      Please enter password.
                    </div>
                  </div>
                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example23" :class="{'form-control':true, 'is-invalid':!pass2 & error}" v-model="pass2" placeholder="confirm password" required/>
                    <div class="invalid-feedback">
                      Please enter password.
                    </div>
                  </div>

                  <div class="text-center pt-1 mb-1 pb-1">
                    <button class="btn btn-primary btn fa-lg gradient-custom-2 mb-3" type="button" @click="signup">Sign Up</button>
                    
                  </div>                

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Cancel</button>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {apiService} from '../service'
export default {
  name: 'Signup',
  data(){
    return {
      user:'',
      pass1:'',
      pass2:'',
      error:false
    }
  },
  created(){
      console.log('signup')
  },
  methods:{
      close(){
          this.$emit('close')
      },
      signup() {
        let callBack=()=>{
          alert("User Created")
          this.$emit('close')
        }
        let data={
          user:this.user,
          password:this.pass1
        }
        const err = error => {
               console.log(error)
            }
        if(!this.pass1 ||!this.pass2||!this.user) this.error=true
          
        else apiService("post",'/signup',callBack,data,err)
      }
  }
  
}
</script>
<style scoped>
.modal{
  display: block;
  opacity: 1;
}
.modal-backdrop{
  opacity: .75;
  filter: blur(2px);
} 
</style>
