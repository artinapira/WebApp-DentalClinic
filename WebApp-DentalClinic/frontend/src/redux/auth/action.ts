import * as types from './types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store'; // Import your AppState type
import { AnyAction } from 'redux';

// Define interfaces for common payloads and responses
interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}
interface AuthResponseData {
  token: string; // Adjust this based on your actual response data
}

interface ErrorResponse {
  message: string;
}

type AppDispatch = Dispatch<any>;

type RegisterResponse = ApiResponse<any> | ErrorResponse;


// Admin Login
export const AdminLogin = (data: any) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });

    const res: AxiosResponse<ApiResponse<string>> = await axios.post(
      'https://localhost:7157/api/Admin/login',
      data
    );

    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        success: res.data.success,
        token1: res.data.data,
      },
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });

    return err.response?.data || { message: 'An unknown error occurred' };
  }
};

// Update Admin
export const UpdateAdmin = (data: any, id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_ADMIN_REQUEST });

    const res: AxiosResponse<ApiResponse<any>> = await axios.put(
      `https://localhost:7157/api/Admin/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: types.EDIT_ADMIN_SUCCESS, payload: res.data.data });
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    dispatch({
      type: types.EDIT_ADMIN_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });
  }
};

// Update Dentist
export const UpdateDentist = (data: any, id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_DENTIST_REQUEST });

    const res: AxiosResponse<ApiResponse<any>> = await axios.put(
      `https://localhost:7157/api/Dentist/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: types.EDIT_DENTIST_SUCCESS, payload: res.data });
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    dispatch({
      type: types.EDIT_DENTIST_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });
  }
};


export const AdminRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_ADMIN_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/User/Admin",
          data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_ADMIN_ERROR,
          payload: {
              message: error,
          },
      });
  }
};

// Get Admin
export const GetAdmin = (id: number, token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
  try {
    const res: AxiosResponse<ApiResponse<any>> = await axios.get(
      `https://localhost:7157/api/Admin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.GET_ADMIN_ERROR,
      payload: err.response?.data?.message || err.message,
    });

    return err.response?.data || { message: 'An unknown error occurred' };
  }
};

export const DentistLogin = (data: any) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
  try {
    dispatch({ type: types.LOGIN_DENTIST_REQUEST });

    const res: AxiosResponse<ApiResponse<string>> = await axios.post(
      'https://localhost:7157/api/Dentist/login',
      data
    );

    dispatch({
      type: types.LOGIN_DENTIST_SUCCESS,
      payload: {
        message: res.data.message,
        success: res.data.success,
        token1: res.data.data,
      },
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.LOGIN_DENTIST_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });

    return err.response?.data || { message: 'An unknown error occurred' };
  }
};

export const DentistRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_DENTIST_REQUEST });
      const res = await axios.post(
        "https://localhost:7157/api/User/Dentist",
        data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_DENTIST_ERROR,
          payload: {
              message: error,
          },
      });
  }
};


export const PatientRegister = (data: any, token: string) => async (dispatch: AppDispatch): Promise<ApiResponse<any> | undefined> => {
  try {
    dispatch({ type: types.REGISTER_PATIENT_REQUEST });
    const res = await axios.post(
      "https://localhost:7157/api/User/Patient",
      data,{
          headers: {
            Authorization: `Bearer ${token}`,
        }}
    );
    return res.data;

  } catch (error) {
    
    dispatch({
      type: types.REGISTER_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }

};

export const authLogout = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    ;
  }
};

// Update Dentist
export const UpdatePatient = (data: any, id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_PATIENT_REQUEST });

    const res: AxiosResponse<ApiResponse<any>> = await axios.put(
      `https://localhost:7157/api/Patient/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: types.EDIT_PATIENT_SUCCESS, payload: res.data });
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    dispatch({
      type: types.GET_PATIENT_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });
  }
};

export const GetDentist = (id: number, token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
  try {
    const res: AxiosResponse<ApiResponse<any>> = await axios.get(
      `https://localhost:7157/api/Dentist/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.GET_DENTIST_ERROR,
      payload: err.response?.data?.message || err.message,
    });

    return err.response?.data || { message: 'An unknown error occurred' };
  }
};

export const GetPatient = (id: number, token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
  try {
    const res: AxiosResponse<ApiResponse<any>> = await axios.get(
      `https://localhost:7157/api/Patient/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: types.GET_PATIENT_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.GET_PATIENT_ERROR,
      payload: err.response?.data?.message || err.message,
    });

    return err.response?.data || { message: 'An unknown error occurred' };
  }
};


export const GetPatientProfile = (token: string) => async (dispatch: AppDispatch): Promise<RegisterResponse> => {
  try{
    dispatch({type:types.GET_PATIENT_PROFILE_REQUEST});
    const res: AxiosResponse<ApiResponse<any>> = await axios.get(
      `https://localhost:7157/patientProfile`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }}
    );
    
    dispatch({
      type: types.GET_PATIENT_PROFILE_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch (error) {
    const err = error as AxiosError<ErrorResponse>;
  
    dispatch({
      type: types.GET_PATIENT_PROFILE_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });
    return err.response?.data || { message: 'An unknown error occurred' };
  }
};

export const GetDentistProfile = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{
    dispatch({type:types.GET_DENTIST_PROFILE_REQUEST});
    const res = await axios.get(
      `https://localhost:7157/DentistProfile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
    
    dispatch({
      type: types.GET_DENTIST_PROFILE_SUCCESS,
      payload: {data:res.data},
    });
    return res.data;
  }
  catch (error) {
    const err = error as AxiosError<ErrorResponse>;
  
    dispatch({
      type: types.GET_DENTIST_PROFILE_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });
  }
};

export const GetAdminProfile = (token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{
    dispatch({type:types.GET_ADMIN_PROFILE_REQUEST});
    const res = await axios.get(
      `https://localhost:7157/AdminProfile`,
     
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
    
    dispatch({
      type: types.GET_ADMIN_PROFILE_SUCCESS,
      payload: {data:res.data},
    });
    return res.data;
  }
  catch (error) {
    const err = error as AxiosError<ErrorResponse>;
  
    dispatch({
      type: types.GET_DENTIST_PROFILE_ERROR,
      payload: {
        message: err.response?.data?.message || err.message,
      },
    });
  }
};

export const authLogin = (data: { email: string; password: string }): ThunkAction<Promise<ApiResponse<AuthResponseData>>, AppState, unknown, AnyAction> => async (dispatch: AppDispatch): Promise<ApiResponse<AuthResponseData>> => {
  try {
    dispatch({ type: 'LOGIN_USER_REQUEST' });

    const res = await axios.post<ApiResponse<AuthResponseData>>(
      'https://localhost:7157/api/Patient/login',
      data
    );

    dispatch({
      type: 'LOGIN_USER_SUCCESS',
      payload: res.data,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<ErrorResponse>>;

    dispatch({
      type: 'LOGIN_USER_ERROR',
      payload: {
        message: err.response?.data.message || err.message,
      },
    });

    throw err; // Re-throw the error to be caught in handleClick
  }
};


export const GetAnkesa = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const res = await axios.get(
      `https://localhost:7157/api/Ankesat/get-ankesat-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.GET_ANKESAT_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const UpdateAnkesa = (data: any, id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_ANKESAT_REQUEST });

    const res: AxiosResponse<ApiResponse<any>> = await axios.put(
      `https://localhost:7157/api/Ankesat/update-ankesat-by-id/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: types.EDIT_ANKESAT_SUCCESS, payload: res.data });
  } catch (error) {
    ;
  }
};

export const GetDepartment = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const res = await axios.get(
      `https://localhost:7157/api/Department/get-Department-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    dispatch({
      type: types.GET_DEPARTMENT_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const UpdateDepartment = (data: any, id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_DEPARTMENT_REQUEST });

    const res: AxiosResponse<ApiResponse<any>> = await axios.put(
      `https://localhost:7157/api/Department/update-department-by-id/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: types.EDIT_DEPARTMENT_SUCCESS, payload: res.data });
  } catch (error) {
    ;
  }
};


export const DepartmentRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_DEPARTMENT_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/Department/add-department",
          data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_DEPARTMENT_ERROR,
          payload: {
              message: error,
          },
      });
  }

};

export const UpdateInventary= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_INVENTARY_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Department/update-item-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_INVENTARY_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const InventaryRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_INVENTARY_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/Inventary/add-inventari",
          data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_INVENTARY_ERROR,
          payload: {
              message: error,
          },
      });
  }

};

export const UpdateKnowledge= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_KNOWLEDGE_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Knowledge/update-knowledge-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_KNOWLEDGE_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const KnowledgeRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_KNOWLEDGE_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/Knowledge/add-knowledge",
          data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_KNOWLEDGE_ERROR,
          payload: {
              message: error,
          },
      });
  }

};

export const UpdateMarketing= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_MARKETING_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Marketing/update-marketing-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_MARKETING_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const MarketingRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_MARKETING_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/Marketing/add-marketing",
          data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_MARKETING_ERROR,
          payload: {
              message: error,
          },
      });
  }

};

export const UpdatePartner= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_PARTNER_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Partner/update-partner-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_PARTNER_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const PartnerRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_PARTNER_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/Partner/add-partner",
          data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_PARTNER_ERROR,
          payload: {
              message: error,
          },
      });
  }

};

export const UpdateSherbimeShtese= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_SHERBIMESHTESE_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/SherbimeShtese/update-sherbimeShtese-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_SHERBIMESHTESE_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const SherbimeShteseRegister = (data: any) => async (dispatch: AppDispatch): Promise<void> => {
  try {
      dispatch({ type: types.REGISTER_SHERBIMESHTESE_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/SherbimeShtese/add-sherbimeShtese",
          data
      );
      return res.data;

  } catch (error) {

      dispatch({
          type: types.REGISTER_SHERBIMESHTESE_ERROR,
          payload: {
              message: error,
          },
      });
  }

};

export const GetMedicalRecord = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/MedicalRecord/get-medicalRecord-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );

    return res.data;
  }catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_MEDICALRECORD_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}
};

export const UpdateMedicalRecord= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_MEDICALRECORD_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/MedicalRecord/update-medicalRecord-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_MEDICALRECORD_SUCCESS, payload: res.data.data });
  return res.data.data;
}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_MEDICALRECORD_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}
};

export const GetPatientNote = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/PatientNote/get-patientNote-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );

    return res.data;
}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_PATIENTNOTE_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}};

export const UpdatePatientNote= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_PATIENTNOTE_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/PatientNote/update-patientNote-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_PATIENTNOTE_SUCCESS, payload: res.data.data });
  return res.data.data;

}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_PATIENTNOTE_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}

};

export const GetPrescription = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Prescription/get-prescriptions-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );

    return res.data;
 
}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_PRESCRIPTION_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}
};

export const UpdatePrescription= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_PRESCRIPTION_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Prescription/update-prescription-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_PRESCRIPTION_SUCCESS, payload: res.data.data });
  return res.data.data;

}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_PRESCRIPTION_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}
};

export const GetTerapia = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Terapia/get-terapia-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );

    return res.data;
 
  }catch (error) {
    const err = error as AxiosError<ErrorResponse>;
  
    dispatch({
      type: types.GET_TERAPIA_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const UpdateTerapia= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_TERAPIA_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Terapia/update-terapia-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_TERAPIA_SUCCESS, payload: res.data.data });
  return res.data.data;

}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_TERAPIA_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}
};

export const GetTerminet = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Terminet/get-terminet-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );

    return res.data;
  }catch (error) {
    const err = error as AxiosError<ErrorResponse>;
  
    dispatch({
      type: types.GET_TERMINET_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const UpdateTerminet= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_TERMINET_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Terminet/update-terminet-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_TERMINET_SUCCESS, payload: res.data.data });
  return res.data.data;

}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_TERMINET_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}
};

export const GetVlersimet = (id: number, token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Vlersimet/get-vlersimet-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );

    return res.data;
  }catch (error) {
    const err = error as AxiosError<ErrorResponse>;
  
    dispatch({
      type: types.GET_VLERSIMET_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const UpdateVlersimet= (data: any, id: number,token: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch({ type: types.EDIT_VLERSIMET_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Vlersimet/update-vlersimet-by-id/${id}`,
      data,{
        headers: {
          Authorization: `Bearer ${token}`,
      }}
    );
          
  dispatch({ type: types.EDIT_VLERSIMET_SUCCESS, payload: res.data.data });
  return res.data.data;
}catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  dispatch({
    type: types.GET_VLERSIMET_ERROR,
    payload: err.response?.data?.message || err.message,
  });
}};
