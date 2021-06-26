import React from 'react'
import{
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddProduct from './AddProduct'
import ViewProduct from './ViewProduct'

function AdminProfile(){
    return(
       
            <BrowserRouter>
    <ul class="nav nav-pills nav-fill">
         <li class="nav-item">
        <Link to="/add-products" class="nav-link">Add Product</Link>
        </li>

         <li class="nav-item">
        <Link to="/view-products" class="nav-link">View Products</Link>
        </li>
    </ul>

    {/*switch */}
    <Switch>
        <Route path="/add-products">
          <AddProduct />
        </Route>

        <Route path="/view-products">
          <ViewProduct/>
        </Route>
        </Switch>
            </BrowserRouter>
       
    )
}

export default AdminProfile;