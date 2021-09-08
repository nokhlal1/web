var mongoose= require("mongoose");
const express= require("express");
var bcrypt=require("bcryptjs");
const jwt =require("jsonwebtoken");
const path=require("path");
const cors = require('cors');
const parsers = require("body-parser").json();
const User =require('./user');
const Website=require('./website')
const Account=require('./Account')
const config =require('./config')
const app=express()
const SECRET_KEY="jnjkrgnjanjknujhnuh5454545153 ###klsdmlk"
app.use(cors());
app.options('*', cors());
mongoose.connect(config.mongoDBURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  },(error)=>{
    if(error){
        console.log("ERROR",error)
    }
    else{
        console.log("connected")
        app.listen(3000);
    }
})
//signUp of user
app.post('/signup',parsers,(req,res)=>{
    let exist=false
    req.body.password=bcrypt.hashSync(req.body.password,6)
    const login=new User(req.body)
    User.find({ user: req.body.user})
        .then(result=>{
            if(result.length){
            exist=true
            res.status(400).send("already exist")}
        })
        .catch(err=>{
            console.log(err)
        })
    if(!exist)
        login.save()
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            console.log(err)
        })
        })
//Login
app.post('/login',parsers,async(req,res)=>{
    const {user,password}=req.body
    if(user && password)
        User.findOne({ user: req.body.user})
            .then(async(result)=>{
            let pass
                if(result){
                    pass =  await bcrypt.compare(req.body.password,result.password)
                    if(pass){
                        return res.send({token:jwt.sign({user:result.user,_id:result._id},SECRET_KEY)})
                    }
                    else return res.status(403).send({message:"User/Password Incorrect"})
                }
                else return res.status(400).send({message:"Bad Request"})
            })
            .catch(err=>{
                console.log(err)
            })
    else return res.status(403).send({message:"User/Password Incorrect"})
})

//website
app.post('/website',parsers,(req,res)=>{
    try{
        let token=req.headers.authorization
        var userAccess=jwt.verify(token.replace("Bearer ",""),SECRET_KEY)
    }catch(err){
        console.log(err)
    }
    if(userAccess!=undefined && userAccess){
        const website=new Website(req.body)
            website.save()
            .then(result=>{
                return res.send(result)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    else return res.status(403).send({message:"unauthorized"})
})
//update website
app.post('/website/:id',parsers,(req,res)=>{
    try{
        let token=req.headers.authorization
        var userAccess=jwt.verify(token.replace("Bearer ",""),SECRET_KEY)
    }catch(err){
        console.log(err)
    }
    if(userAccess){
        var query = {_id: req.params.id};
        let updateData={
            url:req.body.url,
            title:req.body.title,
            accountIds:req.body.accountIds
        }
        Website.findOneAndUpdate(query,updateData, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send({doc,message:'Succesfully saved.'});
        });
    }
    else return res.status(403).send({message:"unauthorized"})
})
//delete website
app.delete('/website/:id',parsers,(req,res)=>{
    try{
        let token=req.headers.authorization
        var userAccess=jwt.verify(token.replace("Bearer ",""),SECRET_KEY)
    }catch(err){
        console.log(err)
    }
    if(userAccess){
        var query = {_id: req.params.id};
        Website.findOneAndDelete(query, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send({doc,message:'Succesfully deleted.'});
        });
    }
    else return res.status(403).send({message:"unauthorized"})
})
//get all website
app.get('/website',parsers,async(req,res)=>{
    try{let token=req.headers.authorization
            var userAccess=jwt.verify(token.replace("Bearer ",""),SECRET_KEY)
        }catch(err){
            console.log(err)
        }
        if(userAccess && userAccess!=undefined){        
            Website.find()
                .then(result=>{
                   return res.send(result)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        else{
           return res.status(403).send({message:"unauthorized"})
        }
    
})


app.get('/account',parsers,(req,res)=>{
    try{let token=req.headers.authorization
            var userAccess=jwt.verify(token.replace("Bearer ",""),SECRET_KEY)
        }catch(err){
            console.log(err)
        }
    if(userAccess && userAccess!=undefined){        
        Account.find()
            .then(result=>{
               return res.send(result)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    else{
       return res.status(403).send({message:"unauthorized"})
    }
})

