import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productActions";
import {useDispatch, useSelector} from 'react-redux';
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination';


function Home() { 
  
  const dispatch = useDispatch();
  //  By using useSelector hook we passing state is an argument and return productsState  
  // using destructuring method we get this two properties(products, loading,error)
  const {products, loading, error ,productsCount,resPerPage} = useSelector((state)=> state.productsState);
  
  const[currentPage,setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo)=>{

     setCurrentPage(pageNo);

  }

  useEffect(()=>{
    if(error){
     return toast.error(error,{
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(getProducts(null,null,null,null,currentPage))   //Here first null is keyword and second is price,3rd is catagory,4th is rating so we changed null both for initial loading home page
  },[error,dispatch,currentPage]) 

  return (
    <>
    {loading ? <Loader/> :
    <Fragment>
    <MetaData title={'Buy Best Products'}/>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product => (
             <Product key={product._id} product={product}/>  //Here Product is a list Item . we are using key for the purpose to find which product is there...
          ))}
        </div>
      </section>

      {productsCount > 0 && productsCount > resPerPage ?    
      <div className="d-flex justify-content-center mt-5">
              <Pagination 
              activePage={currentPage} 
              onChange={setCurrentPageNo}
              totalItemsCount={productsCount}
              itemsCountPerPage={resPerPage}
              nextPageText={'Next'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass={"page-item"}  //here page-item is bootstrap framework class
              linkClass={"page-link"}  //here page-link is bootstrap framework class
               />
      </div> : null
      }

    </Fragment>
    }
    </>
  );
}

export default Home;
