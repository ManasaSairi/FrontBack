//create express app
const exp=require('express')
const app=exp();
const path=require("path")
require('dotenv').config()

//connect frontend and backend
app.use(exp.static(path.join(__dirname,'./build/')))

//imports apis
const userApi=require("./APIS/user-api") //user Api
const productApi=require("./APIS/product-api") //Product Api
const adminApi=require("./APIS/admin-api") //admin Api

//evaluate path to execute specific api based on path
app.use("/user",userApi)
app.use("/product",productApi)
app.use("/admin",adminApi)


//get mongo client
const mc=require("mongodb").MongoClient;

//database Url
//const databaseUrl="mongodb://manasa2208:manasa2208@mycluster-shard-00-00.cadfs.mongodb.net:27017,mycluster-shard-00-01.cadfs.mongodb.net:27017,mycluster-shard-00-02.cadfs.mongodb.net:27017/myfirstdb?ssl=true&replicaSet=atlas-zb621d-shard-0&authSource=admin&retryWrites=true&w=majority"
//const databaseUrl="mongodb+srv://manasa2208:manasa2208@mycluster.cadfs.mongodb.net/myfirstdb?retryWrites=true&w=majority"

//db connection url
const databaseUrl=process.env.DATABASE_URL;

//connect to db
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("Error in the db connection",err)
    }
    else{
        //create database  object
        let databaseObj=client.db("myfirstdb")

        //create collection obj
        let userCollectionObj=databaseObj.collection("collections")
        let adminCollectionObj=databaseObj.collection("admincollection")
        let productCollectionObj=databaseObj.collection("productcollection")
        let userCartCollectionObj=databaseObj.collection("userCartCollection")

        //sharing collection object to Apis
        app.set("userCollectionObj",userCollectionObj)
        app.set("adminCollectionObj",  adminCollectionObj)
        app.set("productCollectionObj", productCollectionObj)
        app.set("userCartCollectionObj", userCartCollectionObj)

        
        console.log("Database connected....")
    }
})




//for page reload  error 
app.get('/*', (req, res)=> {
    
    res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

  
//handling unavailble paths
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is not matched`})
})

//error handling middleware(for syntax errors)
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})

//assign port number
const port=process.env.PORT ||8080;
app.listen(port,()=>console.log(`Server running on port ${port}...`))
