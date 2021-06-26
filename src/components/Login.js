import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios';

export default function Login(props){
    let {register,handleSubmit,formState:{errors}}=useForm();

    let history=useHistory();  //to push the data to userprofile
    //console.log(history)

    const onFormSubmit=(userObj)=>{
        //pass it to userApi  by making http post request
    
        axios.post(`/${userObj.type}/login`,userObj)
        .then(res=>{

        
            let responseObj=res.data;
            
            //if login success
            if(responseObj.message==="Login success"){

                //save token to browser's local memory
                localStorage.setItem("token",responseObj.token)
                localStorage.setItem("user",JSON.stringify(responseObj.username))

                localStorage.setItem("username",responseObj.username)
                //localStorage.setItem("user",JSON.stringify(responseObj.userObj))
                alert(responseObj.message)

                //update state
                props.setUserStatus(true)

            if(userObj.type==='user'){
                //redirect to userprofile page
                history.push(`/userprofile/${responseObj.username}`) 
            }  
            if(userObj.type==='admin'){
                //redirect to userprofile page
                history.push(`/adminprofile/${responseObj.username}`) 
            }  

            }
            //if login failed
            else{
                alert(responseObj.message)
            }
        }) 
        .catch(err=>{
            console.log(err.message)
        })
    }

    return(
        <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
            {/*Radio buttons*/}
    <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio"  id="admin" value="admin" {...register("type")}/>
        <label className="form-check-label" for="admin">
         Admin
            </label>
   </div>
    <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio"  id="user" value="user" {...register("type")}/>
        <label className="form-check-label" for="user">
         User
        </label>
    </div>
  <br/>

            {/* username */}
            <label htmlFor="un" className="mt-5">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:5})} className="form-control mb-3" />
            {/*username validation */}
            {errors.username?.type=== 'required' && <p className="text-danger">*Username is required</p>}
            {errors.username?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}


            {/* password */}
            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.password && <p className="text-danger">*Password is required</p>}
                                                               

            <button type="submit" className="btn btn-warning">Login</button>
        </form>
    )
}