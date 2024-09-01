import * as types from './types';
import axios from "axios";


export const AdminLogin = (data) => async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_ADMIN_REQUEST });
      const res = await axios.post(
        "https://localhost:7227/recepsionisti/login",
        data
      );
      
      dispatch({
        type: types.LOGIN_ADMIN_SUCCESS,
        payload: {
          message: res.data.message,
          success:res.data.success,
          token1: res.data.data,
        },
      });
      return res.data;
    } catch (error) { 

      dispatch({
      
        type: types.LOGIN_ADMIN_ERROR,
        payload: {
          message: error.response.data.message,
        
        },
      });
      return error.response.data
    }
};