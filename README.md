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

# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
