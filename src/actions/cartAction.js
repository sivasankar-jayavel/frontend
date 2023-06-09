import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice"
import axios from 'axios';

export const addCartItem = (id,quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const {data} = await axios.get( `/api/v1/product/${id} `)
        dispatch(addCartItemSuccess({
           product : data.product._id,
           name:data.product.name,
           image:data.product.images[0].image,
           price:data.product.price,
           stock:data.product.stock,
           quantity
        }))
    } catch (error) {
        
    }
}