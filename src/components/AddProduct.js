import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'

export default function AddProduct(){
    const {register,handleSubmit,formState:{errors}}=useForm();

    const[file,setFile]=useState(null)

    //when form is submitted
    const onFormSubmit=(productObj)=>{

        //create FormData Object
        let formData=new FormData();
        //add image to formdata obj
        formData.append('photo',file,file.name)
        //add userobj to formdata obj
        formData.append("productObj",JSON.stringify(productObj))


        //pass it to userApi  by making http post request
        axios.post('/product/createproduct',formData)
        .then(res=>{
            console.log(res.data)
            alert(res.data.message)

        })
        
    }

    const onFileSelect=(event)=>{
        setFile(event.target.files[0])
    }

    return(
        <div>
            <h1 className="text-center text-warning mt-4">Add Products to your Cart</h1>
            <form className="w-50 mx-auto mb-5" onSubmit={handleSubmit(onFormSubmit)}>
                    {/* product-name */}
                    <label htmlFor="un" className="mt-5">Product-Name</label>
                    <input type="text" id="pn" {...register('productname',{required:true,minLength:2})} className="form-control mb-3" />
                    {/*productname validation */}
                    {errors.username?.type=== 'required' && <p className="text-danger">*Productname is required</p>}
                    {errors.username?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 2</p>}


                    {/* price */}
                    <label htmlFor="pw">Price</label>
                    <input type="number" id="pr" {...register('price',{required:true})} className="form-control mb-3" />
                    {/*price validation */}
                    {errors.password && <p className="text-danger">*Please enter the price</p>}

                    {/* brand */}
                    <label htmlFor="e">Brand</label>
                    <input type="text" id="b" {...register('brand',{required:true})} className="form-control mb-3" />
                    {/*brand validation */}
                    {errors.mail && <p className="text-danger">*please enter brand</p>}


                    {/* PHOTO */}
                    <label htmlFor="">Product Image</label>
                    <input type="file" name="photo" className="form-control mb-3" onChange={(e=>(onFileSelect(e)))}/>


                    <button type="submit" className="btn btn-success">Add to cart</button>
            </form>
        </div>
    )
}

