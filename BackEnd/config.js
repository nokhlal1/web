require('dotenv').config()
var config={}
config.MONGO_DB_URL=process.env.MONGO_DB_URL
config.SECRET_KEY=process.env.SECRET_KEY
module.exports=config