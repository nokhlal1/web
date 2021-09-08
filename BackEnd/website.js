var mongoose= require("mongoose");
const Schema=mongoose.Schema;

const webSchema = new Schema({
    url : {
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    accountIds :{
        type: [String],
        required:true
    }
});

const Website= mongoose.model('Website',webSchema);
module.exports=Website;