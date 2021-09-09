<template>
<div >
  <div class="modal-backdrop"></div>
    <div class="modal show  " id="exampleModalLong" tabindex="4" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">{{currWebsite.url?'Update Website':'Create Website'}}</h5>
                <button type="button" class="close" data-dismiss="modal" @click="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="needs-validation" novalidate>

                  <div class="form-outline mb-4">
                    <input type="text" id="form2Example11" :class="{'form-control':true, 'is-invalid':!title & error}" v-model="title" placeholder="Title" required/>
                    <div class="invalid-feedback">
                      Please enter Title.
                    </div>                    
                  </div>
                  <div class="form-outline mb-4">
                    <input type="text" id="form2Example22" :class="{'form-control':true, 'is-invalid':!url & error}" v-model="url" placeholder="URL" required/>
                    <div class="invalid-feedback">
                      Please enter password.
                    </div>
                  </div>
                  <div class="mb-3">
                    <select class=" form-control  mb-3" aria-label="Default select example" v-model="accountId"  required>
                        <option value="" disabled>-select accountIds-</option>
                        <option v-for="account in accounts" :value="account._id" :key="account._id" :disabled="existingId(account._id)">{{account._id}}</option>                        
                    </select>
                  </div> 
                </form>
                <div class="text-center mb-1 pb-1 float-right">
                    <button class="btn btn-primary btn " type="button" :disabled="!accountId" @click="select">Add Account ID</button>                    
                </div>
                    <table v-if="accountIds.length" class="table table-bordered table-hover">
                        <thead >
                            <tr>
                                <th scope="col">AccountIds</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(id,index) in accountIds" :key="id+index">
                                <td>{{id}}</td>
                                <td><button type="button" class="btn btn-danger" data-dismiss="modal" @click="remove(id)">remove</button></td>
                            </tr>
                            
                        </tbody>
                    </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Cancel</button>
                <button class="btn btn-primary btn " type="button" @click="updateCreate">{{currWebsite.url?'Update Website':'Create Website'}}</button> 
            </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {apiService} from '../service'
export default {
  name: 'WebsiteCreateUpdate',
  props:['currWebsite'],

  data(){
    return{
        title:null,
      url:null,
      accountIds:null,
      error:false,
      accounts:null,
      accountId:''
    }
},
  created(){
      this.getAccount()
      this.title=this.currWebsite?this.currWebsite.title:'',
      this.url=this.currWebsite?this.currWebsite.url:'',
      this.accountIds=this.currWebsite.url?[...this.currWebsite.accountIds]:[],
      this.getAccount()
  },
  methods:{
      close(){
          this.$emit('close')
      },
      select(){
          this.accountIds.push(this.accountId)
          this.accountId=''          
      },
      remove(id){
          const index = this.accountIds.indexOf(id);
            if (index > -1) {
            this.accountIds.splice(index, 1);
            }
      },
      existingId(id){
        let count=0
        for(let i=0;i<this.accountIds.length;i++){
          if(id==this.accountIds[i]) count++
        }
        return count>0
      },
      updateCreate() {
        let callBack=()=>{
          this.$emit('close')
          this.$emit('refresh')
          this.accountId=''
        }
        const err = error => {
               console.log(error)
        }
        let data={
            url:this.url,
            title:this.title,
            accountIds:this.accountIds
        }
        if(this.currWebsite.url)  
        apiService("post",'/website/'+this.currWebsite._id,callBack,data,err)
        else apiService("post",'/website',callBack,data,err)
      },
        getAccount() {
        let callBack=(response)=>{
            this.accounts=response.data
        }
        const err = error => {
               console.log(error)
            }
          
        apiService("get",'/account',callBack,{},err)
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
  filter: blur(4px);
} 
.pre-scrollable{
  clear:both;
  display: block;
  max-height: 300px;
}
.modal-body{
  overflow-y: scroll;
  max-height: 450px;
}
</style>
