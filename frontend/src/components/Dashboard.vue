<template>
  <div class="container">
      <table class="table table-bordered table-hover">
            <tbody>
                <tr >
                    <td > Top Website Title  </td>
                    <td>{{topWebsite.title}}</td>
                </tr>
                <tr >
                    <td >Top Website URL </td>
                    <td>{{topWebsite.url}}</td>
                </tr>
                <tr >
                    <td >Number of Website  </td>
                    <td>{{websites.length}}</td>
                </tr>
                <tr >
                    <td >Number of Account  </td>
                    <td>{{accountNo}}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import {apiService} from '../service'
export default {
name:'Dashboard',
data(){
    return{
        
            accountNo:null,
            websites:[],
           // topWebsite:{}        
    }
},
created(){
    this.fetchAccountData();
    this.fetchwebsiteData();
},
computed:{
topWebsite(){
    let count=0
    let top={}
    for(let i=0;i<this.websites.length;i++){
        if(count<this.websites[i].accountIds.length){
            count=this.websites[i].accountIds.length
            top= this.websites[i]
        }
    }
    return top;
}
},
methods:{
    fetchwebsiteData() {
        let callBack=(response)=>{
          this.websites=response.data
          
        }
        const err = error => {
               console.log(error)
            }
        apiService("get",'/website',callBack,{},err)
      },
      fetchAccountData() {
        let callBack=(response)=>{
          this.accountNo=response.data.length
        }
        const err = error => {
               console.log(error)
            }
        apiService("get",'/account',callBack,{},err)
      }
}
}
</script>

<style>

</style>