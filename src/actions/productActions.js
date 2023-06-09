import axios from 'axios';
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';
import { productFail, productRequest, productSuccess } from '../slices/productSlice';

export const getProducts = (keyword,price,catagory,rating,currentPage) => async (dispatch) => { 
        //here dispatch is a hook so we are creating this hook in home.js file then we pass here dispatch as a argument
    try {
        dispatch(productsRequest()); 
        //Here productRequest is action Creator
        let link = `/api/v1/products?page=${currentPage}`;
        
        if(keyword){
          link += `&keyword=${keyword}`
        }

        if(price){
          link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }

        if(catagory){
          link += `&catagory=${catagory}`
        }

        if(rating){
          link += `&ratings=${rating}`
        }

        const { data } = await axios.get(link);  
        dispatch(productsSuccess(data))
    } catch (error) {
        // Handle Error
        dispatch(productsFail(error.response.data.message))
    }
}



export const getProduct = id => async (dispatch) => { 
        //here dispatch is a hook so we are creating this hook in home.js file then we pass here dispatch as a argument
    try {
        dispatch(productRequest()); 
        //Here productRequest is action Creator
        const { data } = await axios.get(`/api/v1/product/${id}`);  
        dispatch(productSuccess(data))
    } catch (error) {
        // Handle Error
        dispatch(productFail(error.response.data.message))
    }
}