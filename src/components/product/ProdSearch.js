import React, { Fragment, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import Pagination from 'react-js-pagination';
import { toast } from "react-toastify";
import MetaData from ".././layouts/MetaData";
import { getProducts } from "../../actions/productActions";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import { useParams } from "react-router-dom";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

function ProdSearch() { 
  
  const dispatch = useDispatch();
  //  By using useSelector hook we passing state is an argument and return productsState  
  // using destructuring method we get this two properties(products, loading,error)
  const {products, loading, error ,productsCount,resPerPage} = useSelector((state)=> state.productsState);
  
  const[currentPage,setCurrentPage] = useState(1);
  const[price,setPrice] = useState([1,100000]);
  const[priceChanged,setPriceChanged] = useState(price);
  const[catagory,setCatagory] = useState(null);
  const[rating,setRating] = useState(0);

  const {keyword} = useParams();    //URL to get parameter value means we use useParams Hook
   
  const catagories = [
    "Interiors spares",
    "Exteriors spares",
    "Liquids",
    "Service"
  ];

  const setCurrentPageNo = (pageNo)=>{
     setCurrentPage(pageNo);
  }

  
  useEffect(()=>{
    if(error){
    return toast.error(error,{
        position: toast.POSITION.BOTTOM_CENTER
        })
      }
        dispatch(getProducts(keyword,priceChanged,catagory,rating ,currentPage))  //whenever keyword will change this useEffect will be called and getProducts is updated then new keyword will entered on getProducts   
    },[error, dispatch, currentPage, keyword, priceChanged ,catagory,rating]) 

  return (
    <>
    {loading ? <Loader/> :
    <Fragment>
    <MetaData title={'Buy Best Products'}/>
      <h1 id="products_heading">Search Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">

          <div className="col-6 col-md-3 mb-5 mt-5">   
           {/* Price Filter */}
              <div className="px-5" onMouseUp={()=>setPriceChanged(price)}>    
                  <Slider         
                    range={true}
                    marks={
                      {
                        1 : "Rs.1",
                        100000 : "Rs.100000"
                      }
                    }
                    min={1}
                    max={100000}
                    defaultValue={price}
                    onChange={(price)=>{   //onAfterChange is deprecated so we use onChange Instead ,so we use onMouseUp callback function above
                      setPrice(price)
                    }}
                    handleRender={
                      renderProps => {
                        return (
                          <Tooltip overlay={`Rs.${renderProps.props['aria-valuenow']}`}>
                            <div {...renderProps.props} ></div>
                          </Tooltip>
                        )
                      }
                    }
                  />
              </div>
                     <hr className='my-5'/>
           {/* Catagory Filter */}
           <div className="mt-5">
            <h3 className="mb-3">Catagories</h3>
            <ul className="pl-0">
            {catagories.map(catagory =>
                    <li style={{cursor:"pointer",
                                listStyleType:"none"
                                }}
                         key={catagory}
                         onClick={()=>{
                          setCatagory(catagory)
                         }}
                         >{catagory}</li>
            )}
            </ul>
           </div>
           <hr className='my-5'/>
            {/* Ratings Filter */}
            <div className="mt-5">
              <h4 className="mb-3">Ratings</h4>
              <ul className="pl-0">
            {[5,4,3,2,1].map(star =>
                    <li style={{cursor:"pointer",
                                listStyleType:"none"
                                }}
                         key={star}
                         onClick={()=>{
                          setRating(star)
                         }}
                         >
                         <div className="rating-outer">
                          <div className="rating-inner" style={{width:`${star * 20}%`}}>
                          </div>
                         </div>
                         </li>
            )}
            </ul>
            </div>
          </div>

        <div className="col-6 col-md-9">
              <div className="row">
                 {products && products.map(product => (
                    <Product col={4} key={product._id} product={product}/>  //Here Product is a list Item . we are using key for the purpose to find which product is there...
                 ))}
              </div>
        </div>

        </div>
      </section>

      { productsCount > 0 && productsCount > resPerPage ?    
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

export default ProdSearch;
