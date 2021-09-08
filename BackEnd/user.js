var mongoose= require("mongoose");
const Schema=mongoose.Schema;

const loginSchema = new Schema({
    user : {
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
});

const User= mongoose.model('Login',loginSchema);
module.exports=User;