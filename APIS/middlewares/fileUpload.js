//import cloudinary based modules
const cloudinary=require("cloudinary").v2; 
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name:'dmbeibsm7',
    api_key:'398646599262424',
    api_secret:'gyxpF0hgTJEQ9kY-fo2BurpbTPQ'
})

//configure multer-storage-cloudinary(clStorage=CloudinaryStorage)
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"Training",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})

//configure multer
const multerObj=multer({storage:clStorage})

module.exports=multerObj;





