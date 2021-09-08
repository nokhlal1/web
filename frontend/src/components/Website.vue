<template>
    <div class="container">
         <div class="text-center mb-1 pb-1 float-right">
            <button class="btn btn-primary btn " type="button" @click="showPopUp">Create Website</button>                    
        </div> 
        <table class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">URL</th>
                    <th scope="col">Title</th>
                    <th scope="col">No. of Linked Account</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="website in websites" :key="website._id">
                    <td scope="row">{{website.url}}</td>
                    <td>{{website.title}}</td>
                    <td>{{website.accountIds?website.accountIds.length:''}}</td>
                    <td> 
                        <button class="btn btn-primary btn fa-lg  mb-3" type="button" @click="showPopUp(website)" >Edit</button>
                        <button class="btn btn-danger btn fa-lg  mb-3" type="button" @click="delteWebsite(website._id)" >Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <WebsiteCreateUpdate v-if="show" @close="show=false" @refresh="fetchWebsite" :currWebsite="currWebsite"/>
    </div>  
</template>

<script>
import {apiService} from '../service'
import WebsiteCreateUpdate from './WebsiteCreateUpdate.vue'
export default {
name:'Website',
data(){
    return{
        websites:[],
        currWebsite:{},
        show:false
    }
},
components:{
   WebsiteCreateUpdate 
},
created(){
    this.fetchWebsite();
},
methods:{
    showPopUp(website){
        this.currWebsite = website?website:null
        this.show = true
    },
    fetchWebsite() {
        let callBack=(response)=>{
          this.websites=response.data
        }
        const err = error => {
               console.log(error)
            }
        apiService("get",'/website',callBack,{},err)
    },
    delteWebsite(id) {
        let callBack=()=>{
          this.fetchWebsite()
        }
        const err = error => {
               console.log(error)
            }
        apiService("delete",'/website/'+id,callBack,{},err)
    }
}
}
</script>

<style scoped>
button{
    margin-right:5px ;
}
</style>