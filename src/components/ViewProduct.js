// import { useEffect, useState } from "react";
// import Items from './Items';
// import axios from 'axios'

// export default function ViewProduct(){
//     let[product,setProduct]=useState([])
//     useEffect(()=>{
//         axios.get('/product/getproducts')
//         .then(res=>{
//             let productObj=res.data
//             setProduct([...productObj.message])
//         })
//     },[])

//     console.log(product)

//     return(
//         <div className="row m-2">
//             {
//                 product.map((productObj,ind)=>{
//                     return(
//                         <div className="col col md-4 col-lg-4 mt-2 w-25">
//                             <Items productObj={productObj} key={ind}/>
//                             {/*<button type="submit" className="btn btn-success" onClick={()=>props.addProductTocart(product)}>Add to cart</button>*/}
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }


import { useEffect, useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router";

export default function ViewProduct(){

    let history=useHistory();


    let[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
    },[])


    //for add to cart button 
    const addProductToCart=(productObj)=>{
        let username=localStorage.getItem("username")

        let newObj={username,productObj}
        console.log(newObj)

        axios.post("/user/addtocart",newObj)
        .then(res=>{
            let responseObj=res.data
            alert(responseObj.message)

            history.push("/UserCart")
        })
        .catch(err=>{
            console.log("Error in adding to cart",err)
            alert("Something went wrong")
        })
    }

    //this for button conditional rendering forn user and admin (if the card is in admin it should not show the button)
    let usertype=localStorage.getItem("username")

    console.log(product)

    return(
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {product &&
                product.map((productObj,index)=>{
                    return(
                        <div class="col" key={index}>
                            <div class="card w-75 mx-auto mt-5">
                                <img src={productObj.productImage} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                    <h5 class="test-start">Price : {productObj.price}</h5>
                                    <h5 class="text-start">Brand : {productObj.brand}</h5>
                                    <h5 class="card-text">Description : {productObj.productdescription}</h5>

                                    {usertype !="admin" && 
                                        <div class="d-flex float-end">
                                            <button className="btn btn-primary float-end" onClick={()=>addProductToCart(productObj)}>Add to cart</button> 
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}

