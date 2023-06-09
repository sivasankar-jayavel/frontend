import axios from "axios";

import {
   clearError,
   forgotPasswordFail,
   forgotPasswordRequest,
   forgotPasswordSuccess,
   loadUserFail,
   loadUserRequest,
   loadUserSuccess,
   loginFail, 
   loginRequest, 
   loginSuccess, 
   logoutFail, 
   logoutSuccess, 
   registerFail, 
   registerRequest,
    registerSuccess, 
    resetPasswordFail, 
    resetPasswordRequest, 
    resetPasswordSuccess, 
    updatePasswordFail, 
    updatePasswordRequest, 
    updatePasswordSuccess, 
    updateProfileFail, 
    updateProfileRequest,
    updateProfileSuccess} from "../slices/authSlice";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/login`, { email, password }); //this axios values return some data so we declared data variable for the destructuring method
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
}


export const clearAuthError = dispatch => {
    dispatch(clearError())
};


export const register = (userData) => async (dispatch) => {
  try {

    dispatch(registerRequest());

    const config = {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    }

    const { data } = await axios.post(`/api/v1/register`, userData ,config); //this axios values return some data so we declared data variable for the destructuring method
    
    dispatch(registerSuccess(data));
    
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
}


export const loadUser = async (dispatch) => {
  try {

    dispatch(loadUserRequest());

    const { data } = await axios.get(`/api/v1/myprofile`); //this axios values return some data so we declared data variable for the destructuring method
    
    dispatch(loadUserSuccess(data));
    
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
}


export const logout = async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`); //this axios values return some data so we declared data variable for the destructuring method  
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail);
  }
}


export const updateProfile = (userData) => async (dispatch) => {
  try {

    dispatch(updateProfileRequest());
      const config = {
        headers:{
             "Content-Type": "multipart/form-data"   //it contains images and text format so we called multipart/form-data
                }
         }

    const { data } = await axios.put(`/api/v1/update`, userData ,config); //this axios values return some data so we declared data variable for the destructuring method
    
    dispatch(updateProfileSuccess(data));
    
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
}


export const updatePassword = (formData) => async (dispatch) => {
  try {

    dispatch(updatePasswordRequest());

    const config = {
      headers:{
           "Content-Type": "application/json"   //it contains images and text format so we called multipart/form-data
              }
       }
  
    const { data } = await axios.put(`/api/v1/password/change`,formData,config); //this axios values return some data so we declared data variable for the destructuring method
    
    dispatch(updatePasswordSuccess(data));
    
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
}


export const forgotPassword = (formData) => async (dispatch) => {
  try {

    dispatch(forgotPasswordRequest());

    const config = {
      headers:{
           "Content-Type": "application/json"   //it contains images and text format so we called multipart/form-data
              }
       }
  
    const { data } = await axios.post(`/api/v1/password/forgot`,formData,config); //this axios values return some data so we declared data variable for the destructuring method
    
    dispatch(forgotPasswordSuccess(data));
    
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
}


 export const resetPassword = (formData,token) => async (dispatch) => {

  try {

    dispatch(resetPasswordRequest());

    const config = {
      headers:{
               " Content-Type " : " application/json "  //it contains images and text format so we called multipart/form-data
              }  
            }

    const { data } = await axios.post(`/api/v1/password/reset/${token}`,formData,config); //this axios values return some data so we declared data variable for the destructuring method
    
    dispatch(resetPasswordSuccess(data));
    
    } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
    }  
    
}


