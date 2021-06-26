//create express app
const exp=require('express');
const adminApi=exp.Router();
const expressErrorHandler=require("express-async-handler");
const checkToken=require("./middlewares/verifyToken");
const jwt=require("jsonwebtoken");

adminApi.use(exp.json())

// //admin login
//     adminApi.post("/loginuser", expressErrorHandler( async(req,res,next)=>{
//     let adminCollectionObj=req.app.get("adminCollectionObj")
//     //get user  credentials
//     let credentials=req.body;

//     //check for username
//     let user=await adminCollectionObj.findOne({username:credentials.username})

//     //if user not found
//     if(user===null){
//         res.send({message:"Invalid user"})
//     }
//     else if(user.password!==credentials.password){
        
//             res.send({message:"Invalid Password"})
//         }
//         else{
//             //create and send token
//             let token= await jwt.sign({username:credentials.username},'abcdef',{expiresIn: 10 })
//             //send token to client
//             res.send({message:"Login success",token:token,username:credentials.username})
        
//     }
// }))

// //export
// module.exports=adminApi


adminApi.post("/login", expressErrorHandler( async(req,res,next)=>{
    let adminCollectionObj=req.app.get("adminCollectionObj")
    //get user  credentials
    let credentials=req.body;
console.log("data:",credentials)
    //check for username
    let user=await adminCollectionObj.findOne({username:credentials.username})

    //if user not found
    if(user===null){
        res.send({message:"Invalid username"})
    }
    else{
        //compare passwords for normal text
        if(credentials.password == user.password){
        //create and send token
        let token= await jwt.sign({username:credentials.username},'abcdef',{expiresIn: 10 })
        //send token to client
        res.send({message:"Login success",token:token,username:credentials.username})

        }
        else{
            res.send({message:"Invalid Password"})
        }
        
      
        
        
    }
}))
//export
module.exports=adminApi
