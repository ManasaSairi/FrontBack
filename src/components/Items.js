//import imgOne from "./images/EM.jpg"

export default function Items(props){
    let productObj=props.productObj;
    return(
        <div class="card shadow">
            <div class="card-body">
                {/* <img src={imgOne} class="w-25" /> */}
                <img src={productObj.productImage} className="w-50" />
                <h4>Name : {productObj.productname}</h4>
                <h4>Price : {productObj.price}</h4>
                <h4>Brand :{productObj.brand}</h4>
                <div class="d-flex float-end">
                    <button type="button" class="btn btn-sm btn-success onClick={()=>props.addProductTocart(product)}">Add to Cart</button>
                </div>
            </div>

        </div>
    )
}

