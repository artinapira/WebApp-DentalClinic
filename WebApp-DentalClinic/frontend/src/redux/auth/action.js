import * as types from './types';
import axios from "../../utils/axios";


export const AdminLogin = (data) => async (dispatch) => {
  dispatch({ type: types.LOGIN_ADMIN_REQUEST });
  try {
    const res = await axios.post("https://localhost:7157/api/Admin/login", data);

    const { accessToken, refreshToken } = res.data.data;

    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        success: res.data.success,
        token1: accessToken,
      },
    });
    localStorage.setItem('accessToken', accessToken);

    localStorage.setItem('refreshToken', refreshToken);  // Store refresh token

    return { accessToken, refreshToken, message: res.data.message };
    } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
    return { message: error.response.data.message };
  }
};


export const UpdateAdmin = (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_ADMIN_REQUEST });
    const res = await axios.put(
      `https://localhost:7157/api/Admin/${id}`,data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    
    dispatch({ type: types.EDIT_ADMIN_SUCCESS, payload: res.data.data});
  } catch (error) {
    ;
  }
};

export const UpdateDentist = (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_DENTIST_REQUEST });
    const res = await axios.put(
      `https://localhost:7157/api/Dentist/${id}`,data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    
    dispatch({ type: types.EDIT_DENTIST_SUCCESS, payload: res.data});
  } catch (error) {
    ;
  }
};

export const AdminRegister = (data) => async (dispatch) => {
  try {
      dispatch({ type: types.REGISTER_ADMIN_REQUEST });
      const res = await axios.post(
          "https://localhost:7157/api/Admin",
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

export const GetAdmin = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Admin/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );

    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_ADMIN_ERROR,
      payload:error.message
    })
    ;
  }
};


export const DentistLogin = (data) => async (dispatch) => {
  dispatch({ type: types.LOGIN_DENTIST_REQUEST });
  try {
    const res = await axios.post("https://localhost:7157/api/Dentist/login", data);

    const { accessToken, refreshToken } = res.data.data;

    dispatch({
      type: types.LOGIN_DENTIST_SUCCESS,
      payload: {
        message: res.data.message,
        success: res.data.success,
        token1: accessToken,
      },
    });
    localStorage.setItem('accessToken', accessToken);

    localStorage.setItem('refreshToken', refreshToken);  // Store refresh token

    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_DENTIST_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
    return error.response.data;
  }
};



export const DentistRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_DENTIST_REQUEST });
    const res = await axios.post(
      "https://localhost:7157/api/Dentist",
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

export const PatientRegister = (data,token) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_PATIENT_REQUEST });
    const res = await axios.post(
      "https://localhost:7157/api/Patient/add-patient",
      data,{
          headers: {
            Authorization: "Bearer " + token
        }}
    );
    console.log('data res',res.data);
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

export const authLogout = () => async (dispatch) => {
  try {
    dispatch({ type: types.AUTH_LOGOUT });
    
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
  } catch (error) {
    console.error('Logout error:', error);
  }
};


export const UpdatePatient = (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_PATIENT_REQUEST });

    const res = await axios.put(
      `https://localhost:7157/api/Patient/PatientUpdate/${id}`,
      data, {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    

    dispatch({ type: types.EDIT_PATIENT_SUCCESS, payload: res.data });
    console.log('Updated p. data: ',res.data);
    return res.data;
  } catch (error) {
    ;
    dispatch({
      type: types.GET_PATIENT_ERROR,
      payload: error.message,
  });
  }
};

export const GetDentist = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DENTIST_REQUEST });
    const res = await axios.get(`https://localhost:7157/api/Dentist/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch({ type: types.GET_DENTIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.GET_DENTIST_ERROR,
      payload: error.message,
    });
  }
};


export const GetPatient = (id,token) => async (dispatch) => {
  try{
    dispatch({type:types.GET_PATIENT_REQUEST});
    const res = await axios.get(
      `https://localhost:7157/api/Patient/GetPatient/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    
    dispatch({
      type: types.GET_PATIENT_SUCCESS,
      payload: res.data,
    });
    console.log('Patient from get: ',res.data);
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_PATIENT_ERROR,
      payload:error.message
    })
    ;
  }
};

export const GetPatientProfile = (token) => async (dispatch) => {
  try{
    dispatch({type:types.GET_PATIENT_PROFILE_REQUEST});
    const res = await axios.get(
      `https://localhost:7157/patientProfile`,{
      headers: {
        Authorization: "Bearer " + token
    }}
    );
    
    dispatch({
      type: types.GET_PATIENT_PROFILE_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_PATIENT_PROFILE_ERROR,
      payload:error.message
    })
    ;
  }
};

export const GetDentistProfile = (token) => async (dispatch) => {
  try{
    dispatch({type:types.GET_DENTIST_PROFILE_REQUEST});
    const res = await axios.get(
      `https://localhost:7157/DentistProfile`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    
    dispatch({
      type: types.GET_DENTIST_PROFILE_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_DENTIST_PROFILE_ERROR,
      payload:error.message
    })
    ;
  }
};

export const GetAdminProfile = (token) => async (dispatch) => {
  try{
    dispatch({type:types.GET_ADMIN_PROFILE_REQUEST});
    const res = await axios.get(
      `https://localhost:7157/AdminProfile`,
     
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    
    dispatch({
      type: types.GET_ADMIN_PROFILE_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_ADMIN_PROFILE_ERROR,
      payload:error.message
    })
    ;
  }
};

export const authLogin = (data) => async (dispatch) => {
  dispatch({ type: types.LOGIN_USER_REQUEST });
  try {
    const res = await axios.post("https://localhost:7157/api/Patient/login", data);

    const { accessToken, refreshToken } = res.data.data;  // Expecting both tokens from the response

    // Store the access token in Redux (or React state)
    dispatch({
      type: types.LOGIN_USER_SUCCESS,
      payload: {
        message: res.data.message,
        success: res.data.success,
        token1: accessToken,  // Storing access token in Redux
      },
    });


    localStorage.setItem('accessToken', accessToken);
    // Store the refresh token in localStorage
    localStorage.setItem('refreshToken', refreshToken); // Storing refresh token in localStorage
    console.log("Login response:", res.data); // Check this log


    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_USER_ERROR,
      payload: {
        message: error.response ? error.response.data.message : "Unexpected error occurred",
      },
    });
    return error.response ? error.response.data : { message: "Unexpected error occurred" };
  }
};



export const GetAnkesa = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Ankesat/get-ankesat-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );

    dispatch({
      type: types.GET_ANKESAT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_ANKESAT_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdateAnkesa= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_ANKESAT_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Ankesat/update-ankesat-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_ANKESAT_SUCCESS, payload: res.data.data });
  return res.data.data;
} catch (error) {
  ;
  dispatch({
    type: types.GET_ANKESAT_ERROR,
    payload: error.message,
});
}
};

export const GetDepartment = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Department/get-Department-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );

    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_DEPARTMENT_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdateDepartment = (data, id, token) => async (dispatch) => {
  try {
      dispatch({ type: types.EDIT_DEPARTMENT_REQUEST });
      const res = await axios.put(
          `https://localhost:7157/api/Department/update-department-by-id/${id}`, data, {
          headers: {
              Authorization: "Bearer " + token
          }
      }
      );

      dispatch({ type: types.EDIT_DEPARTMENT_SUCCESS, payload: res.data });
  } catch (error) {
      ;
  }
};

export const DepartmentRegister = (data) => async (dispatch) => {
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

export const UpdateInventary= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_INVENTARY_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Department/update-department-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_INVENTARY_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const InventaryRegister = (data) => async (dispatch) => {
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

export const UpdateKnowledge= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_KNOWLEDGE_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Knowledge/update-knowledge-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_KNOWLEDGE_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const KnowledgeRegister = (data) => async (dispatch) => {
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

export const UpdateMarketing= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_MARKETING_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Marketing/update-marketing-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_MARKETING_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const MarketingRegister = (data) => async (dispatch) => {
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

export const UpdatePartner= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_PARTNER_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Partner/update-partner-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_PARTNER_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const PartnerRegister = (data) => async (dispatch) => {
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

export const UpdateSherbimeShtese= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_SHERBIMESHTESE_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/SherbimeShtese/update-sherbimeShtese-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_SHERBIMESHTESE_SUCCESS, payload: res.data.data });
} catch (error) {
  ;
}
};

export const SherbimeShteseRegister = (data) => async (dispatch) => {
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

export const GetMedicalRecord = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/MedicalRecord/get-medicalRecord-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );

    dispatch({
      type: types.GET_MEDICALRECORD_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_MEDICALRECORD_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdateMedicalRecord= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_MEDICALRECORD_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/MedicalRecord/update-medicalRecord-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_MEDICALRECORD_SUCCESS, payload: res.data });
  return res.data;
} catch (error) {
  ;
  dispatch({
    type: types.GET_MEDICALRECORD_ERROR,
    payload: error.message,
});
}
};

export const GetPatientNote = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/PatientNote/get-patientNote-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    dispatch({
      type: types.GET_PATIENTNOTE_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_PATIENTNOTE_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdatePatientNote= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_PATIENTNOTE_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/PatientNote/update-patientNote-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_PATIENTNOTE_SUCCESS, payload: res.data });
  return res.data;
} catch (error) {
  ;
  dispatch({
    type: types.GET_PATIENTNOTE_ERROR,
    payload: error.message,
});
}
};

export const GetPrescription = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Prescription/get-prescriptions-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    dispatch({
      type: types.GET_PRESCRIPTION_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_PRESCRIPTION_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdatePrescription= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_PRESCRIPTION_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Prescription/update-prescription-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_PRESCRIPTION_SUCCESS, payload: res.data });
  return res.data;
} catch (error) {
  ;
  dispatch({
    type: types.GET_PRESCRIPTION_ERROR,
    payload: error.message,
});
}
};

export const GetTerapia = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Terapia/get-terapia-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );

    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_TERAPIA_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdateTerapia= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TERAPIA_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Terapia/update-terapia-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_TERAPIA_SUCCESS, payload: res.data.data });
  return res.data.data;
} catch (error) {
  ;
  dispatch({
    type: types.GET_TERAPIA_ERROR,
    payload: error.message,
});
}
};

export const GetTerminet = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Terminet/get-terminet-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    dispatch({
      type: types.GET_TERMINET_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_TERMINET_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdateTerminet= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TERMINET_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Terminet/update-terminet-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_TERMINET_SUCCESS, payload: res.data });
  console.log('Terminei action: ',res.data);
  return res.data;
} catch (error) {
  ;
  dispatch({
    type: types.GET_TERMINET_ERROR,
    payload: error.message,
});
}
};

export const GetVlersimet = (id,token) => async (dispatch) => {
  try{

    const res = await axios.get(
      `https://localhost:7157/api/Vlersimet/get-vlersimet-by-id/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
      }}
    );
    dispatch({
      type: types.GET_VLERSIMET_SUCCESS,
      payload: res.data,
    });
    return res.data;
  }
  catch(error){
    dispatch({
      type:types.GET_VLERSIMET_ERROR,
      payload:error.message
    })
    ;
  }
};

export const UpdateVlersimet= (data, id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_VLERSIMET_REQUEST});

    const res = await axios.put(
      `https://localhost:7157/api/Vlersimet/update-vlersimet-by-id/${id}`,
      data,{
        headers: {
          Authorization: "Bearer " + token
      }}
    );
          
  dispatch({ type: types.EDIT_VLERSIMET_SUCCESS, payload: res.data.data });
  return res.data.data;
} catch (error) {
  ;
  dispatch({
    type: types.GET_VLERSIMET_ERROR,
    payload: error.message,
});
}
};