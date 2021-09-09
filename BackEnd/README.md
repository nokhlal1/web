# BackEnd
## Project setup
```
npm install
```
## Create config.js
```
put MongoDB URL with credential
var config={}
config.MONGO_DB_URL=<mongoDB URL>
config.SECRET_KEY=<secret key for JWT>
module.exports=config
```
### Compiles and run
```
node index.js
```
